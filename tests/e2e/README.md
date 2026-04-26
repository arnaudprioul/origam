# `tests/e2e/` — Playwright suite

End-to-end + visual-regression tests for origam, running against the live
Histoire dev server. Replaces the legacy Cypress suite progressively
(see `cypress/` for the originals — both runners coexist during the
Lot 11 migration window).

## Running

```bash
npm run test:e2e            # headless on Chromium / Firefox / Webkit
npm run test:e2e:ui         # interactive UI mode
npm run test:e2e:debug      # step-by-step Inspector
npm run test:e2e:report     # open the last HTML report
```

The `playwright.config.ts` automatically starts `npm run story:dev`
when no Histoire instance is reachable on `localhost:6006`.

## Conventions

- **One spec file per component family** (`btn.spec.ts`, `field.spec.ts`,
  …). Sub-components (`OrigamBtnGroup`, `OrigamBtnToggle`) share their
  parent's spec to keep the file count manageable.
- **One `test.describe` block per `<Variant>`** in the matching
  `*.story.vue`. The `<Variant title>` is the test's name source — the
  story shape drives the test, not the other way around.
- **Accessibility queries first** — `getByRole`, `getByLabelText`,
  `getByText`. Only fall back to `data-testid` when the accessible name
  is ambiguous (long lists of identical buttons, etc.).
- **Visual regression** is opt-in per spec via `toHaveScreenshot()`.
  Baselines live next to the spec under `__screenshots__/`. Update via
  `npm run test:e2e -- --update-snapshots`.

## Migrating from Cypress

- `cy.get('[data-cy="…"]')` → `page.locator('[data-testid="…"]')` —
  rename `data-cy` to `data-testid` in the component (project
  convention going forward).
- `cy.contains('text')` → `page.getByText('text')`.
- `cy.intercept(…)` → `page.route(…)`.
- `should('be.visible')` → `expect(...).toBeVisible()`.
- Custom commands (`cy.commands.ts`) → ordinary helper functions
  imported from a shared `helpers/` module.

The migration is tracked per component in `tokens/CHANGELOG.md` under
the `Lot 11` section.
