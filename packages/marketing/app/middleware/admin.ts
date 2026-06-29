/**
 * admin — middleware nommé de protection de route (côté client uniquement).
 *
 * Déclaré via definePageMeta({ middleware: 'admin' }) sur chaque page admin
 * sauf /admin (la page de connexion elle-même, qui reste publique).
 *
 * Cette garde est purement UX : elle empêche d'afficher une page vide ou
 * une erreur 401 à un utilisateur non connecté. La vraie barrière de
 * sécurité est le middleware serveur sur /api/admin/** (ticket E1).
 */
export default defineNuxtRouteMiddleware(() => {
    if (!import.meta.client) return

    const { isAuthenticated } = useAdminReference()

    if (!isAuthenticated.value) {
        return navigateTo('/admin')
    }
})
