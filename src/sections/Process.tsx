import SectionHead from '../components/SectionHead'
import type { Dict } from '../i18n'

export default function Process({ t }: { t: Dict }) {
  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process-title" title={t.process.title} />
        <ol className="steps">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-num" aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}