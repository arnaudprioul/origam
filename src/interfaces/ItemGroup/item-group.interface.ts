import type {
    ICommonsComponentProps,
    IGroupItemProps,
    IGroupProps,
    ITagProps
} from '../../interfaces'

/**
 * Props for `<OrigamItemGroup>` — the renderless selection container.
 * Mirrors `IBtnToggleProps` minus the visual mixins (this group has
 * no chrome of its own).
 */
export interface IItemGroupProps extends ICommonsComponentProps, ITagProps, IGroupProps {
}

/**
 * Props for `<OrigamItem>` — a single registered item inside the group.
 * Named `IItemGroupItemProps` to avoid collision with the existing
 * `IItemProps` in `List/list.interface.ts` (List's `items?` prop).
 */
export interface IItemGroupItemProps extends ICommonsComponentProps, IGroupItemProps {
}
