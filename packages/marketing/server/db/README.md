# API-Reference database (ADR 0001 — Ticket A)

PostgreSQL schema backing the marketing API Reference. Accessed through
[TypeORM](https://typeorm.io/) (client `pg`, pure JS — no native binary).

> Entities are declared with TypeORM's decorator-free `EntitySchema`: the
> migrations and the ingestion pipeline run as plain `.mjs` under `node` (no TS
> compiler), and Nitro's esbuild bundle does not emit the decorator metadata
> that decorator entities need. `EntitySchema` is the supported alternative —
> same repositories, migrations and `upsert`.

> At this stage the site still reads the static `app/consts/**.const.ts` files.
> Nothing is rebranched yet. This layer only provisions the database, the schema
> and the migration tooling. Ticket B fills it; ticket C reads from it.

## Layout

| File | Role |
|---|---|
| `db.const.mjs` | Single source of truth: table names, kinds, relation types, env var names. Shared by the migrations, the ingestion script (ticket B) and the Nitro runtime. |
| `connection.mjs` | Resolves the TypeORM pg connection options from the environment. No secret hardcoded. |
| `entities.mjs` | `EntitySchema` definitions for every table (snake_case columns). |
| `data-source.mjs` | The shared TypeORM `DataSource` (entities + migrations + connection). |
| `migrations/*.mjs` | Versioned TypeORM migrations (`up` + `down`). |
| `migrate.mjs` | Thin migration runner (`run` / `revert` / `show`) around the DataSource. |
| `../utils/db.ts` | Nitro-side lazy DataSource singleton (`useDb`, `pingDb`, `isDbConfigured`). |

## Environment variables

No credential is ever hardcoded — every value is read from the environment.

| Variable | Required | Default | Notes |
|---|---|---|---|
| `DATABASE_URL` | one of the two | — | Canonical form, e.g. `postgres://user:pass@host:5432/db`. Preferred (Coolify injects this). |
| `DB_HOST` | fallback | — | Discrete mode, used only when `DATABASE_URL` is unset. |
| `DB_PORT` | no | `5432` | |
| `DB_USER` | fallback | — | |
| `DB_PASSWORD` | fallback | — | |
| `DB_NAME` | fallback | — | |
| `DB_SSL` | no | off | `true` → TLS accepting the provider's self-signed chain (managed PG). |

Copy these into a local `.env` (git-ignored) for development; in stage/prod
Coolify provisions a PostgreSQL service (port `Y432`) and injects `DATABASE_URL`.

## Commands

```bash
# Apply all pending migrations (up)
pnpm -F @origam/marketing db:migrate

# Revert the last applied migration (down) — see "Rollback" below
pnpm -F @origam/marketing db:rollback

# Report whether pending migrations exist
pnpm -F @origam/marketing db:migrate:status
```

## Schema (ADR §3)

One generic root table `doc_entry` (discriminated by `kind`) + normalised child
tables for the requestable collections, a relation graph, a category table, a
sync-audit table and a placeholder `theme` table.

- **Root**: `doc_entry` — `UNIQUE(kind, slug)`, `kind` constrained to the 8
  families, rich component-only blocks stored in `kind_extra jsonb`.
- **Collections** (FK `entry_id`, cascade, ordered by `position`): `doc_prop`,
  `doc_value`, `doc_param`, `doc_return`, `doc_emit`, `doc_slot`, `doc_example`,
  `doc_directive_arg`, `doc_directive_modifier`.
- **Graph**: `doc_relation` (`used_by` / `related` / `family` / `extends`).
- **Navigation**: `doc_category`.
- **Audit**: `doc_sync_run` (one row per ingestion/re-sync run).
- **Placeholder**: `theme` (macro only — not implemented in this scope).

### Editorial vs source boundary

Each table that carries editorial (`[ÉDIT]`) columns has a **row-level
editorial lock** (`edited_by_user` + `editorial_locked_at`). The re-sync
(ticket B) only ever writes source (`[SRC]`) columns and never touches a locked
row's editorial fields. Items removed from the DS source are flagged via
`orphaned_at`, never hard-deleted.

`created_at` / `updated_at` are present on every table; `updated_at` is kept
current automatically by the shared `doc_set_updated_at` trigger.

## Rollback

`db:rollback` reverts the most recent migration. The `down` of
`InitDocReference` drops every object it created — all tables (in FK-safe order:
children → root → standalone) and the shared `doc_set_updated_at` trigger
function. It is fully reversible: `db:rollback` followed by `db:migrate` returns
to an identical schema.

```bash
pnpm -F @origam/marketing db:rollback     # drops all doc_* / theme tables + trigger fn
pnpm -F @origam/marketing db:migrate       # recreate from scratch
```

> The rollback drops data. In stage/prod, snapshot the database (Coolify backup)
> before rolling back a migration that has live editorial content.

## Seed & re-sync pipeline (ticket B)

`scripts/generate-api-docs.mjs` was reoriented from writing per-slug `.const.ts`
files to UPSERTing into this database. It reuses the same libs
(`extract` / `merge` / `read-existing`) — no logic is duplicated.

```bash
# First load: ingest the 1758 curated app/consts/**.const.ts files (all 8
# families) into the DB without loss. Idempotent; respects the editorial lock.
pnpm -F @origam/marketing docs:seed

# Re-sync: re-extract STRUCTURAL [SRC] facts from packages/ds/src for the 4
# auto-derivable families (enums, interfaces, consts, utils) and UPSERT only the
# [SRC] columns. Editorial fields are never touched. Run this on every DS change.
pnpm -F @origam/marketing docs:sync

# Dry-run drift gates (write nothing, exit 1 if the DB would change):
pnpm -F @origam/marketing docs:seed:check
pnpm -F @origam/marketing docs:sync:check

# Legacy file writer (kept until the pages are rebranched — ticket F):
pnpm -F @origam/marketing docs:generate
```

Properties:
- **Idempotent** — a second identical run reports `created=0 updated=0 orphaned=0`.
- **Non-destructive** — re-sync only writes `[SRC]`; re-seed never overwrites a
  row whose `edited_by_user` lock is set. Items removed from the source are
  flagged `orphaned_at`, never deleted.
- **Audited** — every run writes a `doc_sync_run` row (counts + git sha of the DS).
- **Faithful to source** — re-sync regenerates `[SRC]` from `packages/ds/src`
  exactly (same rule as `merge.mjs`). NOTE: enums the curated files truncated for
  display (e.g. `mdi-icons`, 31 listed vs 7297 in source) are expanded to the
  full source set by re-sync — a display/policy question for the API/UI layer,
  not a data error.

`--domain=<kind>` restricts a seed (e.g. `--domain=component`);
`--domain=<dir>` restricts a re-sync (e.g. `--domain=enums`).

## Healthcheck

`GET /api/health` reports `{ status, db: { configured, ok } }`. When the DB is
**not** configured the endpoint stays `200 ok` (the site still runs on the
static const files). When it **is** configured but unreachable, it returns
`503 degraded` so orchestrators can gate readiness on the database.
