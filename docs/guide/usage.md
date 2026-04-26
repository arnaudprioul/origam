# Utilisation

Origam UI est une bibliothèque de composants Vue 3 native. Vous pouvez l'utiliser soit en enregistrant tous les composants globalement, soit en les important à la demande.

## Import Global

Pour rendre tous les composants disponibles dans votre application sans import manuel :

```typescript
import { createApp } from 'vue'
import { createOrigam } from '@origam'
import App from './App.vue'

// Import des styles obligatoires
import '@origam/dist/style.css'

const app = createApp(App)
app.use(createOrigam())
app.mount('#app')
```