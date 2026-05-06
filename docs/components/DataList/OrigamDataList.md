# OrigamDataList

`<OrigamDataList>` renders a definition list (`<dl>`) from a structured `items` array. Each item can have a title (`IDataTitleProps`) and one or more text rows (`IDataTextProps`).

## Basic usage

```vue
<template>
    <OrigamDataList :items="items" />
</template>

<script setup>
const items = [
    {
        title: { text: 'Status' },
        text: [{ text: 'Active' }]
    },
    {
        title: { text: 'Created' },
        text: [{ text: '2024-01-15' }]
    }
]
</script>
```

## Items structure

```ts
interface IDataItem {
    title?: IDataTitleProps   // term (<dt>)
    text?: IDataTextProps[]   // definition rows (<dd>)
}
```

Pass either an array or a keyed object:

```vue
<template>
    <OrigamDataList :items="{ status: { title: { text: 'Status' }, text: [{ text: 'Active' }] } }" />
</template>
```

## Prepend / append icons

```vue
<template>
    <OrigamDataList :items="items" prepend-icon="mdi-information" />
</template>
```

Adjacent props (`prependIcon`, `appendIcon`, `prependAvatar`, `appendAvatar`) are forwarded to each `OrigamDataTitle`.

## Density

```vue
<template>
    <OrigamDataList :items="items" density="compact" />
</template>
```

## Slots

| Slot | Bindings | Description |
|---|---|---|
| `default` | `{ items }` | Full list override |
| `item` | `{ item, index }` | Custom item renderer |
| `item-{n}` | `{ item, index }` | Override for item at index `n` |
| `item.title` | `props` | Custom title for every item |
| `item-{n}.title` | `props` | Custom title for item at index `n` |
| `item.title.prepend` | — | Prepend slot for every title |
| `item.title.append` | — | Append slot for every title |
| `item.text` | — | Custom text renderer |
| `item-{n}.text` | — | Custom text for item at index `n` |
| `item.text.prepend` | — | Prepend slot for every text row |
| `item.text.append` | — | Append slot for every text row |

## Emits

`OrigamDataList` is display-only — it does not emit events.

## Design tokens

| Token | Description |
|---|---|
| `--origam-data-list---display` | Display mode |
| `--origam-data-list---overflow` | Overflow rule |
| `--origam-data-list---gap` | Gap between items |
| `--origam-data-list__title---font-size` | Title font size |
| `--origam-data-list__title---font-weight` | Title font weight |
| `--origam-data-list__text---font-size` | Text font size |
