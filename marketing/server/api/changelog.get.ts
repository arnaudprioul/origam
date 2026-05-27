import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { IChangelogRelease } from '~app/interfaces/changelog.interface'

export default defineEventHandler((): IChangelogRelease[] => {
    const jsonPath = resolve(process.cwd(), '.generated/changelog.json')
    const raw = readFileSync(jsonPath, 'utf-8')
    return JSON.parse(raw) as IChangelogRelease[]
})
