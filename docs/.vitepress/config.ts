import { defineConfig } from 'vitepress'
import {existsSync, readdirSync,statSync} from 'fs'
import { resolve, join } from 'path'

// Fonction pour scanner récursivement le dossier docs/components
function getDocs(dir: string, baseDir: string) {
  const docsPath = resolve(__dirname, dir)
  const items: { text: string; link: string }[] = []

  if (!existsSync(docsPath)) return items

  const scan = (currentDir: string, currentLink: string) => {
    const files = readdirSync(currentDir)

    for (const file of files) {
      const fullPath = join(currentDir, file)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        scan(fullPath, `${currentLink}${file}/`)
      } else if (file.endsWith('.md')) {
        const name = file.replace('.md', '')
        items.push({
          text: name,
          link: `${currentLink}${name}`
        })
      }
    }
  }

  scan(docsPath, baseDir)
  return items.sort((a, b) => a.text.localeCompare(b.text))
}

const dynamicComponents = getDocs(resolve(__dirname, '../../docs/components'), '/components/')
const dynamicComposables = getDocs(resolve(__dirname, '../../docs/composables'), '/composables/')
const dynamicDirectives = getDocs(resolve(__dirname, '../../docs/directives'), '/directives/')

export default defineConfig({
  title: 'Origam UI',
  description: 'Documentation de la bibliothèque de composants Origam',
  lang: 'fr-FR',
  base: '/',

  vite: {
    resolve: {
      alias: {
        '@origam': resolve(__dirname, '../../src')
      }
    },
    optimizeDeps: {
      include: ['@origam']
    },
    ssr: {
      noExternal: ['@origam']
    }
  },

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Composants', link: dynamicComponents[0]?.link || '/guide/components' },
      { text: 'Composables', link: dynamicComposables[0]?.link || '/guide/composables' },
      { text: 'Directives', link: dynamicDirectives[0]?.link || '/guide/directives' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Démarrage', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Utilisation', link: '/guide/usage' },
            { text: 'Composants', link: '/guide/components' },
            { text: 'Composables', link: '/guide/composables' },
            { text: 'Directives', link: '/guide/directives' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Composants',
          items: dynamicComponents
        }
      ],
      '/composables/': [
        {
          text: 'Composables',
          items: dynamicComposables
        }
      ],
      '/directives/': [
        {
          text: 'Directives',
          items: dynamicDirectives
        }
      ],
    },

    search: { provider: 'local' }
  }
})