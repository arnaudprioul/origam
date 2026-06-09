# OrigamBracketMatch

A single match card — two competitor rows separated by a divider, with an
optional status / schedule meta header. Rendered inside `OrigamBracket`,
but exported so you can drop a match card anywhere (e.g. a match-details
page) without the full tree.

```vue
<OrigamBracketMatch :match="match" />
```

`match` is an `IBracketMatch`: `competitorA` / `competitorB` (nullable →
"TBD"), optional `scoreA` / `scoreB`, `winnerId` (drives the winner-row
highlight), `status`, and `advantage` (`{ competitorId, rounds }` → a
`+N` head-start badge, used for the Grand Final).

## Props

| Prop          | Type                                                     | Default     |
|---------------|----------------------------------------------------------|-------------|
| `match`       | `IBracketMatch`                                          | — (required)|
| `status`      | `'pending' \| 'live' \| 'completed' \| 'forfeited'`      | `match.status` |
| `isFinal`     | `boolean`                                                | `false`     |
| `showScores`  | `boolean`                                                | `true`      |
| `showSeed`    | `boolean`                                                | `false`     |
| `interactive` | `boolean`                                                | `true`      |
| `color`       | `TIntent \| <css-color>`                                 | `'primary'` |
| `bgColor`     | `TIntent \| <css-color>`                                 | — (surface) |
| `rounded`     | `TRounded \| number \| string \| boolean`                | — (6px)     |
| `elevation`   | `number` / shadow rung                                   | —           |
| `border`      | `'thin' \| 'thick' \| number \| boolean`                 | — (1px)     |
| `borderColor` | `TIntent \| <css-color>`                                 | — (subtle)  |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted' \| …`                   | `'solid'`   |
| `density`     | `'default' \| 'compact' \| 'comfortable'`                | —           |
| `width`/`height`/min/max | `number \| string`                            | —           |
| `padding*` / `margin*` | `number \| string`                              | —           |
| `tag`         | `string`                                                 | `'div'`     |

The card carries the full cross-cutting surface (color, bgColor, rounded,
elevation, border, density, dimension, padding, margin). `bgColor` paints
the card; the text auto-contrasts (black / white) against the painted
surface, just like inside `OrigamBracket`. `borderColor` accepts an intent
and also drives the connector links when the card is in a tree.

`status` overrides `match.status` — handy to preview a `live` badge. The
status drives the meta header: `live` pulses, `completed` greys out,
`forfeited` warns.

## Events

| Event              | Payload                                                      |
|--------------------|--------------------------------------------------------------|
| `click`            | `(match, ev: MouseEvent)` — fired on the card (not a row)    |
| `competitor-click` | `(competitor, match, side: 'A' \| 'B', ev)`                  |
| `winner-click`     | `(competitor, match, ev)` — when the declared winner is clicked |

## Slots

| Slot         | Scope                                       | Purpose                  |
|--------------|---------------------------------------------|--------------------------|
| `competitor` | `{ competitor, match, isWinner, side }`     | Replace a competitor row |

## Notes

- The card surface, border (width / style / colour), radius and elevation
  are inherited from `OrigamBracket` via CSS custom properties when used
  inside the tree; standalone, it falls back to the component defaults.
- Text colour auto-contrasts the surface (see `OrigamBracket`).
