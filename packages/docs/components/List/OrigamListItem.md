# OrigamListItem

`<OrigamListItem>` renders a single interactive or informational row inside an
`OrigamList`. It supports a title and subtitle (as props or slots), leading /
trailing icons or avatars via the prepend and append slots, and a full set of
visual, spacing, link and typography props.

## Basic usage

```vue
<template>
    <OrigamList>
        <OrigamListItem title="Primary text" subtitle="Secondary line" />
    </OrigamList>
</template>
```

## With prepend / append icons

```vue
<template>
    <OrigamList>
        <OrigamListItem
            title="Inbox"
            prepend-icon="mdi-inbox"
            append-icon="mdi-chevron-right"
        />
    </OrigamList>
</template>
```

## Typography on title and subtitle

`fontSize`, `fontWeight`, `lineHeight` and `letterSpacing` drive **both** the
title and subtitle surfaces simultaneously via two dedicated CSS variable
prefixes (`list-item__title` and `list-item__subtitle`).

```vue
<template>
    <OrigamList>
        <OrigamListItem
            title="Bold title"
            subtitle="Compact subtitle"
            font-size="lg"
            font-weight="semibold"
            line-height="tight"
            letter-spacing="wide"
        />
    </OrigamList>
</template>
```

## Props

| Prop          | Type                      | Default | Description                                   |
|---------------|---------------------------|---------|-----------------------------------------------|
| `title`       | `string \| number`        | —       | Primary text (also available as `#title` slot) |
| `subtitle`    | `string \| number`        | —       | Secondary text (also available as `#subtitle` slot) |
| `active`      | `boolean`                 | `false` | Forces the active state                       |
| `activeClass` | `string`                  | —       | CSS class applied when active                 |
| `disabled`    | `boolean`                 | `false` | Prevents interaction                          |
| `lines`       | `TLines`                  | —       | Clamp subtitle to one, two or three lines     |
| `link`        | `boolean`                 | `false` | Makes the item behave as a link               |
| `nav`         | `boolean`                 | `false` | Nav-mode sizing (0.8125rem title, 0.75rem subtitle) |
| `slim`        | `boolean`                 | `false` | Reduced inner spacing                         |
| `tag`         | `string`                  | `'div'` | Root HTML element                             |
| `href`        | `string`                  | —       | Anchor href (renders as `<a>`)                |
| `to`          | `RouteLocationRaw`        | —       | Router-link target                            |
| `value`       | `any`                     | —       | Selectable value within a list group          |
| `prependIcon` | `string`                  | —       | Icon shown before content                     |
| `appendIcon`  | `string`                  | —       | Icon shown after content                      |
| `prependAvatar` | `string`                | —       | Avatar image URL shown before content         |
| `appendAvatar`  | `string`                | —       | Avatar image URL shown after content          |

### Props — Typography (title and subtitle surfaces)

Both `__title` and `__subtitle` respond to the same prop set — one value
controls both children simultaneously.

| Prop            | Type              | Default | Description                                                                                                          |
|-----------------|-------------------|---------|----------------------------------------------------------------------------------------------------------------------|
| `fontSize`      | `TFontSize`       | —       | Font-size token (xs · sm · md · lg · xl · …). Sets `--origam-list-item__title---font-size` and `--origam-list-item__subtitle---font-size`. Overrides nav-mode sizing. |
| `fontWeight`    | `TFontWeight`     | —       | Font-weight token (regular · medium · semibold · bold · …). Sets `--origam-list-item__title---font-weight` and `--origam-list-item__subtitle---font-weight`. |
| `lineHeight`    | `TLineHeight`     | —       | Line-height token (none · tight · snug · normal · relaxed · loose). Sets `--origam-list-item__title---line-height` and `--origam-list-item__subtitle---line-height`. |
| `letterSpacing` | `TLetterSpacing`  | —       | Letter-spacing token (tight · normal · wide · wider · widest). Sets `--origam-list-item__title---letter-spacing` and `--origam-list-item__subtitle---letter-spacing`. |

## Emits

| Event           | Payload        | Description                            |
|-----------------|----------------|----------------------------------------|
| `click`         | `MouseEvent`   | Fired on item click                    |
| `click:prepend` | `MouseEvent`   | Fired when the prepend area is clicked |
| `click:append`  | `MouseEvent`   | Fired when the append area is clicked  |

## Slots

| Slot       | Scope                              | Description                         |
|------------|------------------------------------|-------------------------------------|
| `default`  | `{ isActive, select, isSelected, isIndeterminate }` | Arbitrary content inside the content area |
| `title`    | `{ title }`                        | Custom title content                |
| `subtitle` | `{ subtitle }`                     | Custom subtitle content             |
| `prepend`  | slot props                         | Leading avatar / icon override      |
| `append`   | slot props                         | Trailing avatar / icon override     |
| `wrapper`  | —                                  | Full content wrapper override       |

## Tokens

| Variable                                          | Default          | Used for                              |
|---------------------------------------------------|------------------|---------------------------------------|
| `--origam-list-item__title---font-size`           | `1rem`           | title font size                       |
| `--origam-list-item__title---font-weight`         | `400`            | title font weight                     |
| `--origam-list-item__title---letter-spacing`      | `0.009375em`     | title letter spacing                  |
| `--origam-list-item__title---line-height`         | `1.5rem`         | title line height                     |
| `--origam-list-item__subtitle---font-size`        | `0.875rem`       | subtitle font size                    |
| `--origam-list-item__subtitle---font-weight`      | `400`            | subtitle font weight                  |
| `--origam-list-item__subtitle---letter-spacing`   | `0.0178571429em` | subtitle letter spacing               |
| `--origam-list-item__subtitle---line-height`      | `1rem`           | subtitle line height                  |
| `--origam-list-item---min-height`                 | `40px`           | row minimum height (density-adjusted) |
| `--origam-list-item---padding-block-start`        | `8px`            | top padding (density-adjusted)        |
| `--origam-list-item---padding-inline-start`       | `16px`           | left padding (indent-adjusted)        |
