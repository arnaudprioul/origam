# Origam — Story format (canonical)

Every component story under `stories/components/stories/**/Origam{Name}.story.vue`
MUST follow this layout. The goal is that a consumer can test EVERY prop / slot /
emit independently without having to fiddle with controls in a single mega-Variant.

---

## Variants — required order

1. **`Playground`** — listed FIRST.
   - Surfaces every prop on the component (HstSelect / HstCheckbox / HstText /
     HstNumber controls in the sidebar).
   - Real-world setup that demos the component in a realistic context.
   - **Note on auto-selection:** Histoire does NOT auto-pick a variant by name
     ("default", "Playground" or otherwise). It auto-picks only when there's a
     SINGLE variant. With multiple variants, Histoire remembers the user's last
     selection via `lastSelectedVariant`. So we put Playground first by
     convention only — the user will see it at the top of the variant list.

2. **One Variant per PROP (or per prop group when they share semantics).**
   - Title prefix: `"Prop — <name>"` (e.g. `"Prop — color & bgColor"`,
     `"Prop — variant"`).
   - Pre-set state isolates THAT prop so the consumer can test it in isolation
     without other props interfering.
   - Group only when props are visually equivalent (e.g. six sizes share one
     variant `"Prop — size"`).
   - When in doubt, prefer ONE variant per prop. Easier to navigate.

   **Color props specifically** are split into 3 dedicated variants on every
   component that exposes them, so the consumer can test each interaction
   axis independently:

   - `"Prop — color & bgColor"` — resting-state surface + text.
   - `"Prop — hover (hoverColor & hoverBgColor)"` — hover-state overrides.
   - `"Prop — active (activeColor & activeBgColor)"` — active-state overrides.

   Each variant binds **only its axis** to the rendered component, with the
   sidebar controls limited to those props (no global mega-color-control).
   For components that consume only one axis (e.g. typography components that
   only have `color`), keep the single `"Prop — color"` variant.

3. **One Variant per SLOT.**
   - Title prefix: `"Slot — <name>"` (e.g. `"Slot — default"`, `"Slot — prepend"`,
     `"Slot — append"`).
   - Demos what's possible to slot in. Use realistic content
     (text, icons, sub-components) — not lorem-ipsum.

4. **One Variant per EMIT.**
   - Title prefix: `"Emit — <eventName>"` (e.g. `"Emit — update:modelValue"`).
   - Wire `@event` to a local reactive ref, render the captured value on
     screen so the consumer can confirm the event fired.

---

## Layout / wrapping conventions

- Wrap the variant's content in a fixed-height `<div>` if the component is
  layout-aware (Drawer, AppBar, Toolbar, Sheet, Dialog, Snackbar, …) so the
  visual stays predictable across stories.
- Use `<origam-app :full-height="false">` around layout-coordinated components
  (Drawer, AppBar, Main) so the layout system has a valid context and the
  story container is respected.
- Keep inline `style="..."` to LAYOUT concerns (height, border for visual
  framing). Avoid using inline `padding` shorthand on components that read
  layout vars (OrigamMain, OrigamToolbar, …) — it clobbers the
  layout-driven padding.

## Controls (Histoire sidebar)

The Playground variant exposes EVERY prop via the sidebar controls:

| Prop type                          | Histoire control                   |
| ---------------------------------- | ---------------------------------- |
| `boolean`                          | `<HstCheckbox>`                    |
| `number`                           | `<HstNumber>`                      |
| `string` (free)                    | `<HstText>`                        |
| `string` literal union (e.g. size) | `<HstSelect :options="...">`       |
| `TColor` / `TIntent`               | `<HstSelect :options="intentList">`|
| `tag` / `density` / `elevation` / `rounded` | `<HstSelect :options="<list>"`     |

Available `<list>` constants are exported from `@stories/const` :
  - `intentList` (TColor / TIntent)
  - `densityList`, `elevationList`, `roundedList`, `sizeList`,
    `tagList`, `variantList`, `positionList`, `alignList`,
    `justifyList`, `colsList`, `iconList`, `progressList`

If a prop's literal union isn't covered by an existing list, write the
options inline as `[{ label: '…', value: '…' }, …]` for the Playground only;
the per-prop variants should reuse the same options to stay consistent.

---

## Naming + file conventions

- Story file: `stories/components/stories/{Folder}/Origam{Name}.story.vue`.
- Variant titles are **English**, sentence-case, descriptive enough that the
  user can predict the content from the title alone.
- Comments inside the story explain the *demonstration intent* of each
  variant — not the API surface (that's what the component docs are for).
- Import the component via `@origam/components`, types from
  `@origam/interfaces`, icons from `@origam/enums`. Story-local helpers from
  `@stories/composables` and `@stories/const`.

## Anti-patterns (DO NOT)

- ❌ One mega-Variant that surfaces every prop via the sidebar with no
  isolation variants — the user can't test props one at a time.
- ❌ A "Default" variant that's just a copy of "Playground" — pick one.
- ❌ Inline `padding: 16px` on `<origam-main>` — it overrides the
  layout-driven `padding-inline-start: var(--origam-layout---position-left)`.
- ❌ Wrapping a layout component in a plain `<div>` without `<origam-app>` —
  the layout context is required for Drawer / AppBar / etc.
- ❌ Variant titles like "Basic" / "Test" / "Demo" — be specific about what
  the variant demonstrates.
- ❌ Setting `auto-props-disabled` on `<Story>` and then re-implementing
  the same controls inline — let Histoire auto-discover props unless you
  genuinely need to override.

---

## Reference implementation

`stories/components/stories/Drawer/OrigamDrawer.story.vue` follows this
format and is the canonical reference for the design system.
