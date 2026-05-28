import { createOrigam } from '@origam/origam'

import '@origam/assets/css/tokens/primitive.css'
import '@origam/assets/css/tokens/light.css'
import '@origam/assets/css/tokens/dark.css'

import './custom.css'

import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'

const origam = createOrigam()

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(origam)
  }
} satisfies Theme