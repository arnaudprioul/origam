# OrigamContextualMenu

`<OrigamContextualMenu>` is a **right-click (context) menu** that opens at
the cursor position. It wraps `OrigamMenu` with `openOnContextMenu`, an
implicit `activator="cursor"` and `target="cursor"` so no activator slot is
required.

## Basic usage

Wrap any element to give it a context menu.

```vue
<template>
    <OrigamContextualMenu :items="[{ title: 'Copy' }, { title: 'Paste' }]">
        <p>Right-click anywhere on this text.</p>
    </OrigamContextualMenu>
</template>
```

## Custom items

```vue
<template>
    <OrigamContextualMenu
        :items="[
            { title: 'Edit', prependIcon: 'mdi-pencil' },
            { title: 'Delete', prependIcon: 'mdi-delete' }
        ]"
    >
        <div style="padding: 24px; border: 1px dashed;">Right-click zone</div>
    </OrigamContextualMenu>
</template>
```

## With title

```vue
<template>
    <OrigamContextualMenu title="Actions" :items="items">
        <div>Context area</div>
    </OrigamContextualMenu>
</template>
```

## Custom content slot

For full control over menu content, use the `default` slot of the underlying menu.

```vue
<template>
    <OrigamContextualMenu>
        <div>Right-click me</div>
        <template #default>
            <OrigamList>
                <OrigamListItem title="Custom action" />
            </OrigamList>
        </template>
    </OrigamContextualMenu>
</template>
```

## Slots

Inherits all slots from `OrigamMenu`.

| Slot | Slot props | Description |
|---|---|---|
| `default` | — | Floating menu content override. |

## Events

| Name | Payload | When |
|---|---|---|
| `update:modelValue` | `boolean` | Menu opens / closes. |

## Design tokens

Inherits all tokens from `OrigamMenu`.

| CSS variable | Description |
|---|---|
| `--origam-menu---background` | Surface background. |
| `--origam-menu---color` | Text color. |
| `--origam-menu---border-radius` | Border radius. |
| `--origam-menu---box-shadow` | Shadow. |

## Accessibility

- Inherits all menu keyboard navigation (arrow keys, `ESC`, `Tab`).
- No explicit activator element is needed; the context event opens the menu at the cursor.
- The floating list has `role="menu"`.
