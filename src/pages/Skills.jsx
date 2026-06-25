import { useReveal } from '../hooks/useReveal'
import { SKILLS } from '../data/skills'

export default function Skills() {
  useReveal()
  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">04</span>
          <h1>Capability Matrix</h1>
          <div className="sub">{SKILLS.length} skill groups · full ML/AI stack</div>
          <div className="rule"></div>
        </div>
        <div className="smat" id="skillMat">
          {SKILLS.map(s => (
            <div key={s.t} className="sgroup reveal">
              <div className="gh">
                <div className="ico">{s.ic}</div>
                <div className="t">{s.t}</div>
              </div>
              <div className="tags">
                {s.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
