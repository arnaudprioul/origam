import {useState} from 'react'
import {postToCode} from '@/lib/messaging'
import {EXPORT_FORMATS, type TExportFormat} from './constants'

export function ExportTab(): JSX.Element {
  const [format, setFormat] = useState<TExportFormat>('tokens-studio')

  function handleExport(): void {
    postToCode({type: 'export', format})
  }

  return (
    <div className="panel" role="tabpanel" id="panel-export" aria-labelledby="tab-export">
      <section className="section">
        <h2 className="section__title">Format</h2>
        <ul className="radiolist" role="radiogroup" aria-label="Export format">
          {EXPORT_FORMATS.map((option) => {
            const id = `fmt-${option.id}`
            const checked = option.id === format
            return (
              <li key={option.id} className="radiolist__item">
                <input
                  id={id}
                  type="radio"
                  name="export-format"
                  value={option.id}
                  className="radiolist__radio"
                  checked={checked}
                  onChange={() => setFormat(option.id)}
                />
                <label htmlFor={id} className="radiolist__label">
                  <span className="radiolist__title">{option.label}</span>
                  <span className="radiolist__desc">{option.description}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="section section--footer">
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleExport}
        >
          Export
        </button>
      </section>

      <section className="section status" aria-live="polite">
        {/* Status zone — populated in Phase 7+ when the exporter wires up */}
      </section>
    </div>
  )
}
