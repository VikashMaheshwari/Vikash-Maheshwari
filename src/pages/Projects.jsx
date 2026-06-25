import { useReveal } from '../hooks/useReveal'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  useReveal()
  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">02</span>
          <h1>Project Registry</h1>
          <div className="sub">{PROJECTS.length} systems shipped · agents · RAG · ML · vision</div>
          <div className="rule"></div>
        </div>
        <div className="proj-grid" id="projGrid">
          {PROJECTS.map(p => (
            <article key={p.n} className="proj reveal">
              <div className="scan"></div>
              <div className="ph">
                <span className="num">{p.n}</span>
                <span className="nm">{p.name}</span>
                <span className="kind">{p.kind}</span>
              </div>
              <div className="pb">
                {p.context && <div className="pctx">◷ {p.context}</div>}
                <div className="field">
                  <div className="lab">Problem</div>
                  <div className="txt">{p.problem}</div>
                </div>
                <div className="field">
                  <div className="lab">How I solved it</div>
                  <div className="txt">{p.system}</div>
                </div>
                {p.highlights && (
                  <div className="field">
                    <div className="lab">Highlights</div>
                    <ul className="phl">
                      {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                )}
                <div className="impact">▲ {p.impact}</div>
                {p.shows && (
                  <div className="proj-shows">
                    <span className="dem">Demonstrates →</span> {p.shows}
                  </div>
                )}
                <div className="stack">
                  {p.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
