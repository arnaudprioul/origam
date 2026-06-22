import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SUBMIT_EVENT_PROMISE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-submit-event-promise',
    name: 'ISubmitEventPromise',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_submit_event_promise.description',
    descriptionFallback: 'Special emit payload for <OrigamForm> submit events — a hybrid of SubmitEvent and Promise<IFormValidationResult> that lets handlers await the form validation result inline.',
    definition: `export interface ISubmitEventPromise extends SubmitEvent, Promise<IFormValidationResult> {
}`,
    extends: ['SubmitEvent', 'Promise<IFormValidationResult>'],
    props: [],
    usedBy: [
        { slug: 'form', name: 'Form', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Form/form.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_submit_event_promise.example',
            titleFallback: 'Awaiting validation in a submit handler',
            code: `import type { ISubmitEventPromise } from 'origam'

async function onSubmit(event: ISubmitEventPromise) {
    const { valid, errors } = await event
    if (!valid) {
        console.error('Validation failed', errors)
        return
    }
    await saveData()
}`,
            lang: 'typescript',
        },
    ],
}
