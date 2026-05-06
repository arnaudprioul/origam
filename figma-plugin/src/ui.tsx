// UI iframe entrypoint for the Origam DS Sync Figma plugin.
//
// Phase 1 scope: render a minimal "loading" shell so the manifest loads
// cleanly in Figma. The 3-tab UI (Tokens / Components / Library) is built
// in Phase 2.

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

function App(): JSX.Element {
  return (
    <main
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 12,
        padding: 16,
        color: 'var(--figma-color-text, #111)',
        background: 'var(--figma-color-bg, #fff)',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{fontSize: 14, margin: '0 0 8px 0', fontWeight: 600}}>
        Origam DS Sync
      </h1>
      <p style={{margin: 0, opacity: 0.7}}>loading…</p>
    </main>
  )
}

const container = document.getElementById('app')
if (!container) {
  throw new Error('[origam-ds-sync] #app mount node not found')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
