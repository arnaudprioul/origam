// TU — input.util.ts
// Exports: filterInputAttrs
//
// filterInputAttrs splits an attrs object into two parts:
//   [rootAttrs, inputAttrs]
//
// ROOT attrs: 'class', 'style', 'id', /^data-/ keys + ALL on-keys (bubbling ones too)
// INPUT attrs: everything else (including on-keys that bubble, minus the bubbling ones from root)
//
// Implementation detail from source:
//   const [events, props] = pickWithRest(attrs, [ON_REGEX])        → events=on-keys, props=rest
//   const inputEvents = omit(events, BUBBLING_EVENTS)               → non-bubbling on-keys
//   const [rootAttrs, inputAttrs] = pickWithRest(props, ['class', 'style', 'id', /^data-/])
//   Object.assign(rootAttrs, events)   ← ALL events land on root
//   Object.assign(inputAttrs, inputEvents) ← only non-bubbling events land on input
//
// Therefore:
//   - class/style/id/data-* → rootAttrs only
//   - ALL on-keys → rootAttrs (via `assign(rootAttrs, events)`)
//   - NON-bubbling on-keys ALSO land in inputAttrs
//   - BUBBLING on-keys are NOT in inputAttrs (omitted)
//   - unknown attrs (e.g. 'placeholder', 'maxlength') → inputAttrs only

import { describe, expect, it } from 'vitest'
import { filterInputAttrs } from '@origam/utils/Input/input.util'

describe('filterInputAttrs', () => {
    it('returns [rootAttrs, inputAttrs] tuple', () => {
        const result = filterInputAttrs({})
        expect(result).toHaveLength(2)
    })

    it('places "class" in rootAttrs', () => {
        const [root] = filterInputAttrs({ class: 'my-class' })
        expect(root).toHaveProperty('class', 'my-class')
    })

    it('places "style" in rootAttrs', () => {
        const [root] = filterInputAttrs({ style: 'color:red' })
        expect(root).toHaveProperty('style', 'color:red')
    })

    it('places "id" in rootAttrs', () => {
        const [root] = filterInputAttrs({ id: 'input-1' })
        expect(root).toHaveProperty('id', 'input-1')
    })

    it('places data-* attrs in rootAttrs', () => {
        const [root] = filterInputAttrs({ 'data-cy': 'my-input', 'data-testid': 'foo' })
        expect(root).toHaveProperty('data-cy', 'my-input')
        expect(root).toHaveProperty('data-testid', 'foo')
    })

    it('places unknown attrs (placeholder, maxlength) in inputAttrs', () => {
        const [, input] = filterInputAttrs({ placeholder: 'Enter text', maxlength: '100' })
        expect(input).toHaveProperty('placeholder', 'Enter text')
        expect(input).toHaveProperty('maxlength', '100')
    })

    it('ALL on-keys land in rootAttrs', () => {
        // onClick is a BUBBLING_EVENTS member → lands in root
        const [root] = filterInputAttrs({ onClick: () => {} })
        expect(root).toHaveProperty('onClick')
    })

    it('bubbling on-keys are NOT in inputAttrs', () => {
        // onClick is in BUBBLING_EVENTS → inputEvents = omit(events, BUBBLING_EVENTS) removes it
        const [, input] = filterInputAttrs({ onClick: () => {} })
        expect(input).not.toHaveProperty('onClick')
    })

    it('non-bubbling on-keys land in BOTH rootAttrs AND inputAttrs', () => {
        // onScroll is NOT in BUBBLING_EVENTS (it's not listed) → non-bubbling
        // All events go to root; non-bubbling also go to input
        const handler = () => {}
        const [root, input] = filterInputAttrs({ onScroll: handler })
        expect(root).toHaveProperty('onScroll')
        expect(input).toHaveProperty('onScroll')
    })

    it('handles empty attrs without throwing', () => {
        const [root, input] = filterInputAttrs({})
        expect(root).toEqual({})
        expect(input).toEqual({})
    })

    it('handles mixed attrs correctly', () => {
        const [root, input] = filterInputAttrs({
            class: 'foo',
            id: 'bar',
            placeholder: 'hint',
            'data-cy': 'test',
            onClick: () => {}
        })
        // Root: class, id, data-cy, onClick
        expect(root).toHaveProperty('class')
        expect(root).toHaveProperty('id')
        expect(root).toHaveProperty('data-cy')
        expect(root).toHaveProperty('onClick')
        // Input: placeholder (not data-*, not class/style/id, not bubbling on-key)
        expect(input).toHaveProperty('placeholder')
        expect(input).not.toHaveProperty('onClick')
        expect(input).not.toHaveProperty('class')
    })
})
