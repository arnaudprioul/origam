// Main-thread entrypoint for the Origam DS Sync Figma plugin.
//
// Phase 1 scope: bring up the plugin shell. Subsequent phases will add the
// real handlers (token import, component sync, library publish helpers).

const UI_WIDTH = 360
const UI_HEIGHT = 480

interface IUiMessage {
  type: string
  payload?: unknown
}

figma.showUI(__html__, {
  width: UI_WIDTH,
  height: UI_HEIGHT,
  themeColors: true,
})

figma.ui.onmessage = (msg: IUiMessage): void => {
  // Phase 1 — log only. Real dispatch table lands in Phase 3+.
  console.log('[origam-ds-sync] received ui message:', msg)

  if (msg && msg.type === 'close') {
    figma.closePlugin()
  }
}
