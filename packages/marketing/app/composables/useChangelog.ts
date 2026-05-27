import { computed } from 'vue'
import type { IChangelogRelease } from '~/interfaces/changelog.interface'
import type { TChangelogType } from '~/types/changelog-type.type'

export function useChangelog () {
    const { data } = useAsyncData<IChangelogRelease[]>(
        'changelog',
        () => $fetch<IChangelogRelease[]>('/api/changelog')
    )

    const releases = computed<IChangelogRelease[]>(() => data.value ?? [])

    const totalEntries = computed<number>(() =>
        releases.value.reduce(
            (acc, release) =>
                acc + release.sections.reduce((a, section) => a + section.entries.length, 0),
            0
        )
    )

    function filterByTypes (types: TChangelogType[]): IChangelogRelease[] {
        if (types.length === 0) {
            return releases.value
        }
        return releases.value
            .map(release => ({
                ...release,
                sections: release.sections.filter(section => types.includes(section.type))
            }))
            .filter(release => release.sections.length > 0)
    }

    return {
        releases,
        filterByTypes,
        totalEntries
    }
}
