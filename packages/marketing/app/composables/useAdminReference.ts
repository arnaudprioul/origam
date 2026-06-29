/**
 * useAdminReference — composable encapsulant toutes les opérations admin.
 *
 * Seule porte d'entrée vers /api/admin/**. Aucune page ni layout n'appelle
 * $fetch directement — tout passe par ce composable.
 *
 * `isAuthenticated` est un Nuxt useState (clé 'admin_auth') : il persiste
 * à travers la navigation côté client mais se réinitialise à la fermeture
 * de l'onglet / du rechargement de page (l'authentification réelle est
 * portée par le cookie httpOnly géré côté serveur).
 */

export interface IAdminLoginResult {
    ok: boolean
    error?: 'wrong_password' | 'server_error'
}

export interface IAdminSyncResult {
    created: number
    updated: number
    unchanged: number
    orphaned: number
    status: string
    error?: string | null
}

export interface IAdminSyncRun {
    id: string
    started_at: string
    finished_at: string | null
    created_count: number
    updated_count: number
    unchanged_count: number
    orphaned_count: number
    source_commit: string | null
    status: string
    error: string | null
}

export interface IAdminPatch {
    category?: string | null
    icon?: string | null
    descriptionKey?: string | null
    descriptionFallback?: string | null
    storyUrl?: string | null
    docUrl?: string | null
    noteKey?: string | null
    noteFallback?: string | null
}

export interface IAdminUpdateResult {
    ok: boolean
    error?: string
}

export function useAdminReference () {
    const isAuthenticated = useState<boolean>('admin_auth', () => false)

    async function login (password: string): Promise<IAdminLoginResult> {
        try {
            await $fetch('/api/admin/login', {
                method: 'POST',
                body: { password },
            })
            isAuthenticated.value = true
            return { ok: true }
        } catch (err: unknown) {
            const status: number =
                (err as any)?.statusCode ??
                (err as any)?.status ??
                0
            return {
                ok: false,
                error: status === 401 ? 'wrong_password' : 'server_error',
            }
        }
    }

    async function logout (): Promise<void> {
        try {
            await $fetch('/api/admin/logout', { method: 'POST' })
        } catch {
            // best-effort: on efface quand même l'état local
        }
        isAuthenticated.value = false
    }

    async function updateEntry (
        kind: string,
        slug: string,
        patch: IAdminPatch,
    ): Promise<IAdminUpdateResult> {
        try {
            await $fetch(`/api/admin/reference/${kind}/${slug}`, {
                method: 'PATCH',
                body: patch,
            })
            return { ok: true }
        } catch (err: unknown) {
            const status: number =
                (err as any)?.statusCode ?? (err as any)?.status ?? 0
            const message: string =
                (err as any)?.data?.message ??
                (err as any)?.message ??
                'Unknown error'
            if (status === 400) return { ok: false, error: `bad_request: ${message}` }
            if (status === 404) return { ok: false, error: 'not_found' }
            return { ok: false, error: 'server_error' }
        }
    }

    async function triggerSync (): Promise<{ ok: boolean; result?: IAdminSyncResult; error?: string }> {
        try {
            const result = await $fetch<IAdminSyncResult>(
                '/api/admin/reference/sync',
                { method: 'POST' },
            )
            return { ok: true, result }
        } catch (err: unknown) {
            return {
                ok: false,
                error: (err as any)?.message ?? 'server_error',
            }
        }
    }

    async function getSyncRuns (limit = 20): Promise<IAdminSyncRun[]> {
        try {
            return await $fetch<IAdminSyncRun[]>(
                `/api/admin/reference/sync/runs?limit=${limit}`,
            )
        } catch {
            return []
        }
    }

    return {
        isAuthenticated,
        login,
        logout,
        updateEntry,
        triggerSync,
        getSyncRuns,
    }
}
