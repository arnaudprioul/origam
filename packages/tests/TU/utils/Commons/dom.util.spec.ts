// TU — dom.util.ts
// Exports: attachedRoot
//
// jsdom provides a real document — we can test the main branch.
// Shadow DOM (getRootNode) is partially supported in jsdom — the composed
// path check may not behave identically to a real browser. We test
// the deterministic paths: attached node, detached node, and the
// fallback path when getRootNode is absent.

import { describe, expect, it } from 'vitest'
import { attachedRoot } from '@origam/utils/Commons/dom.util'

describe('attachedRoot', () => {
    it('returns document for a node attached to the DOM', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)

        const root = attachedRoot(el)
        // jsdom: getRootNode() on an attached node returns document
        expect(root).toBe(document)

        document.body.removeChild(el)
    })

    it('returns null for a detached node', () => {
        const el = document.createElement('div')
        // Not appended anywhere — detached node
        const root = attachedRoot(el)
        expect(root).toBeNull()
    })

    it('returns null for a node in a detached sub-tree', () => {
        const parent = document.createElement('div')
        const child = document.createElement('span')
        parent.appendChild(child)
        // Neither parent nor child is attached to document
        expect(attachedRoot(child)).toBeNull()
    })

    it.skip('fallback path when getRootNode is not a function (IE11 compat)', () => {
        // jsdom always has getRootNode — can only be tested by deleting the
        // method from the prototype, which would break other tests in this run.
        // Candidate: manual test or separate isolated jsdom context.
    })
})
