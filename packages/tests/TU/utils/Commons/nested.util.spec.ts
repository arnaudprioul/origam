// TU — nested.util.ts
// Exports: independentSelectStrategy, independentSingleSelectStrategy,
//          leafSelectStrategy, leafSingleSelectStrategy, classicSelectStrategy
//
// All strategies return a TStrategySelect with { select, in, out } methods.
// We pass synthetic Map-based children/parents to avoid Vue reactivity.

import { describe, expect, it } from 'vitest'
import {
    independentSelectStrategy,
    independentSingleSelectStrategy,
    leafSelectStrategy,
    leafSingleSelectStrategy,
    classicSelectStrategy,
} from '@origam/utils/Commons/nested.util'

// Helper: build the "selected" map argument
const sel = (...pairs: Array<[unknown, 'on' | 'off' | 'indeterminate']>) =>
    new Map(pairs)

// Empty topology (no children, no parents)
const emptyChildren = new Map<unknown, unknown[]>()
const emptyParents = new Map<unknown, unknown>()

// ─── independentSelectStrategy ───────────────────────────────────────────────

describe('independentSelectStrategy', () => {
    it('sets the id to "on" when value=true', () => {
        const s = independentSelectStrategy()
        const result = s.select({ id: 'a', value: true, selected: new Map(), children: emptyChildren, parents: emptyParents })
        expect(result.get('a')).toBe('on')
    })

    it('sets the id to "off" when value=false', () => {
        const s = independentSelectStrategy()
        const result = s.select({ id: 'a', value: false, selected: sel(['a', 'on']), children: emptyChildren, parents: emptyParents })
        expect(result.get('a')).toBe('off')
    })

    it('mandatory: prevents deselecting the only selected item', () => {
        const s = independentSelectStrategy(true)
        const selected = sel(['a', 'on'])
        const result = s.select({ id: 'a', value: false, selected, children: emptyChildren, parents: emptyParents })
        // Mandatory: should return original (id still 'on')
        expect(result.get('a')).toBe('on')
    })

    it('mandatory: allows deselecting when another item is selected', () => {
        const s = independentSelectStrategy(true)
        const selected = sel(['a', 'on'], ['b', 'on'])
        const result = s.select({ id: 'a', value: false, selected, children: emptyChildren, parents: emptyParents })
        expect(result.get('a')).toBe('off')
    })

    it('in: builds selection map from array', () => {
        const s = independentSelectStrategy()
        const result = s.in(['a', 'b'], emptyChildren, emptyParents)
        expect(result.get('a')).toBe('on')
        expect(result.get('b')).toBe('on')
    })

    it('in: handles empty array', () => {
        const s = independentSelectStrategy()
        const result = s.in([], emptyChildren, emptyParents)
        expect(result.size).toBe(0)
    })

    it('in: handles null/undefined gracefully', () => {
        const s = independentSelectStrategy()
        const result = s.in(undefined as any, emptyChildren, emptyParents)
        expect(result.size).toBe(0)
    })

    it('out: returns array of keys with value "on"', () => {
        const s = independentSelectStrategy()
        const selected = sel(['a', 'on'], ['b', 'off'], ['c', 'on'])
        const result = s.out(selected, emptyChildren, emptyParents)
        expect(result).toContain('a')
        expect(result).toContain('c')
        expect(result).not.toContain('b')
    })
})

// ─── independentSingleSelectStrategy ────────────────────────────────────────

describe('independentSingleSelectStrategy', () => {
    it('only keeps the targeted id in selected map', () => {
        const s = independentSingleSelectStrategy()
        const selected = sel(['a', 'on'], ['b', 'on'])
        const result = s.select({ id: 'b', value: true, selected, children: emptyChildren, parents: emptyParents })
        // The strategy isolates selection to only 'b' — 'a' is NOT in singleSelected
        expect(result.get('b')).toBe('on')
    })

    it('in: only the first element of v is selected', () => {
        const s = independentSingleSelectStrategy()
        const result = s.in(['a', 'b', 'c'], emptyChildren, emptyParents)
        expect(result.get('a')).toBe('on')
        expect(result.has('b')).toBe(false)
        expect(result.has('c')).toBe(false)
    })

    it('in: handles empty array', () => {
        const s = independentSingleSelectStrategy()
        const result = s.in([], emptyChildren, emptyParents)
        expect(result.size).toBe(0)
    })

    it('out: returns at most one item', () => {
        const s = independentSingleSelectStrategy()
        const selected = sel(['a', 'on'])
        const result = s.out(selected, emptyChildren, emptyParents)
        expect(result).toHaveLength(1)
        expect(result[0]).toBe('a')
    })
})

// ─── leafSelectStrategy ───────────────────────────────────────────────────────

describe('leafSelectStrategy', () => {
    it('ignores selection of items that have children', () => {
        const s = leafSelectStrategy()
        const children = new Map<unknown, unknown[]>([['parent', ['child']]])
        const selected = new Map()
        // 'parent' has children → select should be ignored
        const result = s.select({ id: 'parent', value: true, selected, children, parents: emptyParents })
        expect(result.get('parent')).toBeUndefined()
    })

    it('selects leaf items (no children)', () => {
        const s = leafSelectStrategy()
        const children = new Map<unknown, unknown[]>([['parent', ['child']]])
        const selected = new Map()
        const result = s.select({ id: 'child', value: true, selected, children, parents: emptyParents })
        expect(result.get('child')).toBe('on')
    })
})

// ─── leafSingleSelectStrategy ─────────────────────────────────────────────────

describe('leafSingleSelectStrategy', () => {
    it('ignores selection of items that have children', () => {
        const s = leafSingleSelectStrategy()
        const children = new Map<unknown, unknown[]>([['parent', ['child']]])
        const result = s.select({ id: 'parent', value: true, selected: new Map(), children, parents: emptyParents })
        expect(result.get('parent')).toBeUndefined()
    })

    it('selects leaf items only', () => {
        const s = leafSingleSelectStrategy()
        const children = new Map<unknown, unknown[]>([['parent', ['child']]])
        const result = s.select({ id: 'child', value: true, selected: new Map(), children, parents: emptyParents })
        expect(result.get('child')).toBe('on')
    })
})

// ─── classicSelectStrategy ───────────────────────────────────────────────────

describe('classicSelectStrategy', () => {
    // Tree: root → [a, b], a → [a1, a2]
    const buildTopology = () => {
        const children = new Map<unknown, unknown[]>([
            ['root', ['a', 'b']],
            ['a', ['a1', 'a2']]
        ])
        const parents = new Map<unknown, unknown>([
            ['a', 'root'],
            ['b', 'root'],
            ['a1', 'a'],
            ['a2', 'a']
        ])
        return { children, parents }
    }

    it('selecting a leaf marks it "on"', () => {
        const s = classicSelectStrategy()
        const { children, parents } = buildTopology()
        const result = s.select({ id: 'a1', value: true, selected: new Map(), children, parents })
        expect(result.get('a1')).toBe('on')
    })

    it('selecting a parent cascades to all children', () => {
        const s = classicSelectStrategy()
        const { children, parents } = buildTopology()
        const result = s.select({ id: 'a', value: true, selected: new Map(), children, parents })
        expect(result.get('a')).toBe('on')
        expect(result.get('a1')).toBe('on')
        expect(result.get('a2')).toBe('on')
    })

    it('deselecting a parent cascades off to all children', () => {
        const s = classicSelectStrategy()
        const { children, parents } = buildTopology()
        const initial = new Map([
            ['a', 'on'] as [unknown, 'on'],
            ['a1', 'on'] as [unknown, 'on'],
            ['a2', 'on'] as [unknown, 'on']
        ])
        const result = s.select({ id: 'a', value: false, selected: initial, children, parents })
        expect(result.get('a')).toBe('off')
        expect(result.get('a1')).toBe('off')
        expect(result.get('a2')).toBe('off')
    })

    it('selecting all siblings propagates "on" to parent', () => {
        const s = classicSelectStrategy()
        const { children, parents } = buildTopology()
        // Select a1 first, then a2 — parent 'a' should become 'on'
        let state = new Map()
        state = s.select({ id: 'a1', value: true, selected: state, children, parents })
        state = s.select({ id: 'a2', value: true, selected: state, children, parents })
        expect(state.get('a')).toBe('on')
    })

    it('selecting some but not all children makes parent "indeterminate"', () => {
        const s = classicSelectStrategy()
        const { children, parents } = buildTopology()
        const result = s.select({ id: 'a1', value: true, selected: new Map(), children, parents })
        // a2 not selected — 'a' should be indeterminate
        expect(result.get('a')).toBe('indeterminate')
    })

    it('out: returns only leaf nodes (items without children)', () => {
        const s = classicSelectStrategy()
        const { children } = buildTopology()
        const selected = new Map<unknown, 'on' | 'off'>([
            ['a', 'on'],
            ['a1', 'on'],
            ['a2', 'on'],
            ['b', 'on']
        ])
        const result = s.out(selected, children, emptyParents)
        // 'a' is a parent → excluded; 'root' is a parent → excluded;
        // 'a1', 'a2', 'b' are leaves → included
        expect(result).toContain('a1')
        expect(result).toContain('a2')
        expect(result).toContain('b')
        expect(result).not.toContain('a')
    })

    it('mandatory: reverts to original when deselect would leave zero selected', () => {
        const s = classicSelectStrategy(true)
        const { children, parents } = buildTopology()
        const initial = new Map<unknown, 'on'>([['b', 'on']])
        const result = s.select({ id: 'b', value: false, selected: initial, children, parents })
        // Mandatory: 'b' was the only 'on' item → revert
        expect(result.get('b')).toBe('on')
    })

    it('in: builds selection from array', () => {
        const s = classicSelectStrategy()
        const { children, parents } = buildTopology()
        const result = s.in(['a1', 'b'], children, parents)
        expect(result.get('a1')).toBe('on')
        expect(result.get('b')).toBe('on')
    })
})
