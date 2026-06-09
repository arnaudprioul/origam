# OrigamBracketCompetitor

A single competitor row — optional seed prefix, optional avatar, name, an
optional `+N` advantage badge and a score. Rendered inside
`OrigamBracketMatch`, but exported so you can reuse a row standalone (e.g.
inside a custom `#match` / `#competitor` slot).

```vue
<OrigamBracketCompetitor :competitor="competitor" :score="2" />
```

`competitor` is an `IBracketCompetitor` (`id`, `name`, optional `seed`,
optional `avatar`). `null` renders a "TBD" placeholder.

## Props

| Prop              | Type                          | Default     |
|-------------------|-------------------------------|-------------|
| `competitor`      | `IBracketCompetitor \| null`  | — (required)|
| `score`           | `number \| string`            | — (`—`)     |
| `bgColor`         | `TIntent \| <css-color>`      | — (transparent) |
| `color`           | `TIntent \| <css-color>`      | — (inherits) |
| `isWinner`        | `boolean`                     | `false`     |
| `isLoser`         | `boolean`                     | `false`     |
| `advantageRounds` | `number`                      | — (no badge)|
| `showScore`       | `boolean`                     | `true`      |
| `showSeed`        | `boolean`                     | `false`     |
| `interactive`     | `boolean`                     | `true`      |
| `color`           | `TIntent`                     | `'primary'` |
| `tag`             | `string`                      | `'div'`     |

- `isWinner` bolds the row + tints its background; `isLoser` de-emphasises
  it (lower opacity). `null` competitor → italic "TBD".
- `advantageRounds > 0` renders a `+N` badge next to the name — the Winner
  Bracket champion's Grand Final head start.

## Events

| Event   | Payload                          |
|---------|-----------------------------------|
| `click` | `(ev: MouseEvent \| KeyboardEvent)` — only when `interactive` |

## Notes

- Name, score, seed and the winner/loser/TBD states all derive from
  `currentColor`, so the row stays legible on whatever surface its parent
  match is painted (auto-contrast — see `OrigamBracket`).
- `bgColor` paints the row and `color` sets its text (standalone use).
  Left unset inside a bracket, the row stays transparent and inherits the
  bracket's auto-contrast colour — so the match surface stays in control.
