// Générateur off-script design-sync — mode « tokens + cartes preview » (DS Vue).
// Le converter canonique est React-only (voir NOTES.md) ; ce script produit :
//   ds-bundle/styles.css            → look origam réel (tokens compilés + utilities + mdi)
//   ds-bundle/tokens/origam.css     → copie du main.css compilé du DS
//   ds-bundle/fonts/                → @mdi/font (css réécrit + woff2)
//   ds-bundle/_ds_bundle.js         → stub vide conforme (header @ds-bundle)
//   ds-bundle/_ds_bundle.css        → stub (invariant : @import depuis styles.css)
//   ds-bundle/components/<Cat>/<Name>/<Name>.html → carte @dsCard avec capture RÉELLE
// Les captures viennent du Histoire statique servi sur :6006 (vrai rendu, pas de
// réimplémentation). Usage :
//   node .design-sync/build-cards.mjs <repoRoot> <phase>   # phase: base | shots | cards
import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const [, , ROOT, PHASE] = process.argv
if (!ROOT || !PHASE) { console.error('usage: build-cards.mjs <repoRoot> <base|shots|cards>'); process.exit(1) }
const OUT = join(ROOT, 'ds-bundle')
const SHOTS = join(ROOT, '.design-sync/.cache/shots')
const STORIES = join(ROOT, 'packages/stories/components/stories')

// ---------- inventaire : familles de stories × catalogue marketing ----------
function inventory () {
    const catalog = JSON.parse(readFileSync(join(ROOT, 'packages/marketing/server/db/seed/component.json'), 'utf8'))
    // Les entrées ENFANTS (AppBar, AvatarGroup…) portent aussi leur catégorie → tout indexer.
    const byName = new Map()
    for (const { entry } of catalog.entries) {
        if (entry.kind !== 'component') continue
        byName.set(entry.name.toLowerCase(), entry)
    }
    // Catalogue nettoyé (#188) : les catégories sont désormais la taxonomie
    // officielle (celle du Theme Builder / i18n theming.category.*) — on les
    // utilise telles quelles. NB au prochain re-sync : les groupes du projet
    // claude.ai/design seront renommés (les anciens chemins courts partent
    // via les delete globs du plan).
    const canon = c => c
    // 1 dossier peut contenir plusieurs stories (Grids → Col/Container/Row/Spacer).
    // On énumère les FICHIERS Origam<X>.story.vue réels (hors .emits/.slots).
    // Stories de DÉMO de capacités (pas des composants — pas de tag réel) : exclues des cartes.
    const NOT_COMPONENTS = new Set(['ColorGradient', 'Utilities'])
    const dirs = readdirSync(STORIES, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
        .filter(d => !NOT_COMPONENTS.has(d))
    const items = []
    for (const dir of dirs) {
        for (const f of readdirSync(join(STORIES, dir))) {
            const m = /^Origam([A-Za-z]+)\.story\.vue$/.exec(f)
            if (!m) continue
            const name = m[1]
            const lower = name.toLowerCase()
            // Fallback factuel : un sous-composant sans entrée catalogue hérite de la
            // catégorie de sa FAMILLE (= son dossier de stories, ex. ChartPyramid → Chart).
            const cat = byName.get(lower) || byName.get(dir.toLowerCase())
            items.push({
                name,
                storyId: `components-stories-${dir.toLowerCase()}-origam${lower}-story-vue`,
                category: canon(cat?.category || 'Components'),
                description: cat?.description_fallback || '',
                tag: cat?.tag || `origam-${lower}`
            })
        }
    }
    return items
}

// ---------- phase base : socle tokens / fonts / stubs ----------
function base () {
    rmSync(OUT, { recursive: true, force: true })
    mkdirSync(join(OUT, 'tokens'), { recursive: true })
    mkdirSync(join(OUT, 'fonts'), { recursive: true })
    // tokens : le main.css COMPILÉ du DS (primitives + light + dark + utilities + reset)
    cpSync(join(ROOT, 'packages/ds/src/assets/css/main.css'), join(OUT, 'tokens/origam.css'))
    // fonts : @mdi/font (le DS en dépend pour les icônes)
    const mdi = join(ROOT, 'node_modules/.pnpm')
    const mdiDir = readdirSync(mdi).find(d => d.startsWith('@mdi+font@'))
    const mdiPkg = join(mdi, mdiDir, 'node_modules/@mdi/font')
    for (const f of readdirSync(join(mdiPkg, 'fonts'))) {
        if (/\.(woff2?|ttf)$/.test(f)) cpSync(join(mdiPkg, 'fonts', f), join(OUT, 'fonts', f))
    }
    const mdiCss = readFileSync(join(mdiPkg, 'css/materialdesignicons.min.css'), 'utf8')
        .replace(/\.\.\/fonts\//g, './')
    writeFileSync(join(OUT, 'fonts/mdi.css'), mdiCss)
    // stubs bundle (mode tokens-only : "empty-bodied _ds_bundle.js")
    const header = { namespace: 'Origam', components: [], sourceHashes: {}, inlinedExternals: [], builtBy: 'cc-design-sync' }
    writeFileSync(join(OUT, '_ds_bundle.js'),
        `/* @ds-bundle: ${JSON.stringify(header)} */\n(function(){window.Origam={};})();\n`)
    writeFileSync(join(OUT, '_ds_bundle.css'), '/* origam is a Vue 3 DS — component CSS ships via tokens/origam.css (compiled main.scss) */\n')
    writeFileSync(join(OUT, 'styles.css'),
        '@import "./tokens/origam.css";\n@import "./fonts/mdi.css";\n@import "./_ds_bundle.css";\n')
    writeFileSync(join(OUT, '_ds_needs_recompile'), JSON.stringify({ by: 'design-sync-cli' }))
    console.log('base OK →', OUT)
}

// ---------- phase shots : captures réelles depuis le Histoire statique ----------
async function shots () {
    const req = createRequire(join(ROOT, 'packages/tests/package.json'))
    const { chromium } = req('@playwright/test')
    mkdirSync(SHOTS, { recursive: true })
    const items = inventory()
    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 860, height: 640 } })
    let ok = 0; const fails = []
    for (const it of items) {
        const png = join(SHOTS, `${it.name}.png`)
        if (existsSync(png)) { ok++; continue }
        try {
            await page.goto(`http://localhost:6006/stories/story/${it.storyId}?variantId=${it.storyId}-0`, { timeout: 15000 })
            const frame = page.locator('iframe[src*="__sandbox"]')
            await frame.waitFor({ timeout: 12000 })
            await page.waitForTimeout(900) // laisser peindre (animations d'entrée)
            // Gate de vérité : le sandbox doit contenir un rendu origam réel.
            // (La taille du PNG n'est PAS un critère — un Badge rend légitimement petit.)
            const dom = await page.frameLocator('iframe[src*="__sandbox"]').locator('body')
                .evaluate(b => ({ hasOrigam: !!b.querySelector('[class*="origam"]'), kids: b.childElementCount }))
            if (!dom.hasOrigam && dom.kids <= 1) throw new Error('empty sandbox (no origam render)')
            const buf = await frame.screenshot({ timeout: 10000 })
            writeFileSync(png, buf)
            ok++
        } catch (e) { fails.push(`${it.name}: ${String(e.message).split('\n')[0]}`) }
    }
    await browser.close()
    console.log(`shots: ${ok}/${items.length} OK`)
    if (fails.length) console.log('FAILS:\n' + fails.join('\n'))
}

// ---------- phase cards : émission des cartes @dsCard ----------
function cards () {
    const items = inventory()
    let ok = 0; const missing = []
    for (const it of items) {
        const png = join(SHOTS, `${it.name}.png`)
        if (!existsSync(png)) { missing.push(it.name); continue }
        const b64 = readFileSync(png).toString('base64')
        const dir = join(OUT, 'components', it.category, it.name)
        mkdirSync(dir, { recursive: true })
        const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        writeFileSync(join(dir, `${it.name}.html`), `<!-- @dsCard group="${esc(it.category)}" -->
<meta charset="utf-8">
<title>Origam${esc(it.name)}</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; background: #fff; color: #1a1a1a; }
  figure { margin: 0; }
  img { display: block; width: 100%; height: auto; }
  figcaption { padding: 10px 14px; border-top: 1px solid #e6e6e6; }
  figcaption b { font-size: 14px; }
  figcaption code { font-size: 12px; color: #c24500; background: #faf5f0; padding: 1px 5px; border-radius: 4px; }
  figcaption p { margin: 6px 0 0; font-size: 12px; color: #555; }
  .note { font-size: 11px; color: #888; padding: 6px 14px 10px; }
</style>
<figure>
  <img src="data:image/png;base64,${b64}" alt="Rendu réel de Origam${esc(it.name)} (variant Design, Histoire)">
  <figcaption>
    <b>Origam${esc(it.name)}</b> <code>&lt;${esc(it.tag)}&gt;</code>
    <p>${esc(it.description)}</p>
  </figcaption>
</figure>
<p class="note">Capture réelle (Histoire, variant Design). origam est un DS Vue 3 — référence visuelle ; construire avec les tokens/classes de styles.css.</p>
`)
        ok++
    }
    console.log(`cards: ${ok}/${items.length}`)
    if (missing.length) console.log('SANS CAPTURE (pas de carte): ' + missing.join(', '))
}

if (PHASE === 'base') base()
else if (PHASE === 'shots') await shots()
else if (PHASE === 'cards') cards()
