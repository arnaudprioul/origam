/**
 * entities.mjs — TypeORM EntitySchema definitions for the API-Reference store.
 *
 * EntitySchema (decorator-free) is used deliberately: the migrations and the
 * ingestion pipeline run as plain `.mjs` under `node` (no TS compiler), and the
 * Nitro bundle is built by esbuild, which does not emit the decorator metadata
 * (`emitDecoratorMetadata`) that decorator entities rely on. EntitySchema is the
 * officially-supported, fully-featured alternative — same repositories, same
 * migrations, same `upsert`.
 *
 * Columns are keyed by their snake_case database name (property name == column
 * name) so the repository rows round-trip in snake_case across the whole stack.
 * The real DDL (defaults, checks, triggers, functional indexes) is owned by the
 * migration; `synchronize` is always off.
 */

import { EntitySchema } from 'typeorm'

import { DB_TABLES } from './db.const.mjs'

const base = {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    created_at: { type: 'timestamptz', default: () => 'now()' },
    updated_at: { type: 'timestamptz', default: () => 'now()' },
}
const lock = {
    edited_by_user: { type: 'boolean', default: false },
    editorial_locked_at: { type: 'timestamptz', nullable: true },
}
const orphan = { orphaned_at: { type: 'timestamptz', nullable: true } }
const entryFk = { entry_id: { type: 'uuid' } }
const position = { position: { type: 'int', default: 0 } }

const txt = (nullable = false) => ({ type: 'text', nullable })
const bool = (nullable = false) => ({ type: 'boolean', nullable })

export const DocEntry = new EntitySchema({
    name: 'DocEntry',
    tableName: DB_TABLES.DOC_ENTRY,
    columns: {
        ...base,
        kind: txt(), slug: txt(), name: txt(),
        category: txt(true), domain: txt(true), icon: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        definition: txt(true), signature: txt(true), tag: txt(true), value: txt(true),
        source_file: txt(true), package_note: txt(true),
        note_key: txt(true), note_fallback: txt(true),
        story_url: txt(true), doc_url: txt(true), parent_slug: txt(true),
        kind_extra: { type: 'jsonb', nullable: true },
        ...lock, ...orphan,
    },
})

export const DocProp = new EntitySchema({
    name: 'DocProp',
    tableName: DB_TABLES.DOC_PROP,
    columns: {
        ...base, ...entryFk,
        name: txt(),
        type_label: txt(true), type_slug: txt(true), type_kind: txt(true),
        optional: bool(true), required: bool(true), default_value: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocValue = new EntitySchema({
    name: 'DocValue',
    tableName: DB_TABLES.DOC_VALUE,
    columns: {
        ...base, ...entryFk,
        value: txt(),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocParam = new EntitySchema({
    name: 'DocParam',
    tableName: DB_TABLES.DOC_PARAM,
    columns: {
        ...base, ...entryFk,
        name: txt(), type: txt(true), required: bool(true), default_value: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocReturn = new EntitySchema({
    name: 'DocReturn',
    tableName: DB_TABLES.DOC_RETURN,
    columns: {
        ...base, ...entryFk,
        name: txt(true), type: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocEmit = new EntitySchema({
    name: 'DocEmit',
    tableName: DB_TABLES.DOC_EMIT,
    columns: {
        ...base, ...entryFk,
        event: txt(), payload_label: txt(true), payload_slug: txt(true), payload_kind: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocSlot = new EntitySchema({
    name: 'DocSlot',
    tableName: DB_TABLES.DOC_SLOT,
    columns: {
        ...base, ...entryFk,
        slot: txt(), slot_props: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocExample = new EntitySchema({
    name: 'DocExample',
    tableName: DB_TABLES.DOC_EXAMPLE,
    columns: {
        ...base, ...entryFk,
        title_key: txt(true), title_fallback: txt(true), code: txt(true), lang: txt(true),
        ...position, ...lock,
    },
})

export const DocDirectiveArg = new EntitySchema({
    name: 'DocDirectiveArg',
    tableName: DB_TABLES.DOC_DIRECTIVE_ARG,
    columns: {
        ...base, ...entryFk,
        name: txt(), type: txt(true), required: bool(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocDirectiveModifier = new EntitySchema({
    name: 'DocDirectiveModifier',
    tableName: DB_TABLES.DOC_DIRECTIVE_MODIFIER,
    columns: {
        ...base, ...entryFk,
        name: txt(), type: txt(true), required: bool(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocRelation = new EntitySchema({
    name: 'DocRelation',
    tableName: DB_TABLES.DOC_RELATION,
    columns: {
        ...base, ...entryFk,
        rel_type: txt(),
        to_kind: txt(true), to_slug: txt(true), to_name: txt(true), prop_name: txt(true),
        description_key: txt(true), description_fallback: txt(true),
        ...position, ...lock, ...orphan,
    },
})

export const DocCategory = new EntitySchema({
    name: 'DocCategory',
    tableName: DB_TABLES.DOC_CATEGORY,
    columns: {
        ...base,
        kind: txt(), key: txt(),
        label_key: txt(true), label_fallback: txt(true), icon: txt(true),
        ...position, ...lock,
    },
})

export const DocSyncRun = new EntitySchema({
    name: 'DocSyncRun',
    tableName: DB_TABLES.DOC_SYNC_RUN,
    columns: {
        ...base,
        started_at: { type: 'timestamptz', default: () => 'now()' },
        finished_at: { type: 'timestamptz', nullable: true },
        domain: txt(true),
        created_count: { type: 'int', default: 0 },
        updated_count: { type: 'int', default: 0 },
        unchanged_count: { type: 'int', default: 0 },
        orphaned_count: { type: 'int', default: 0 },
        source_commit: txt(true),
        status: { type: 'text', default: 'running' },
        error: txt(true),
    },
})

export const Theme = new EntitySchema({
    name: 'Theme',
    tableName: DB_TABLES.THEME,
    columns: {
        ...base,
        slug: txt(), name: txt(),
        data: { type: 'jsonb', nullable: true },
    },
})

export const ENTITIES = [
    DocEntry, DocProp, DocValue, DocParam, DocReturn, DocEmit, DocSlot,
    DocExample, DocDirectiveArg, DocDirectiveModifier, DocRelation,
    DocCategory, DocSyncRun, Theme,
]
