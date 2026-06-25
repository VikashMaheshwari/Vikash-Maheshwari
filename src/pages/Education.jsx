import { useReveal } from '../hooks/useReveal'

export default function Education() {
  useReveal()
  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">05</span>
          <h1>Education &amp; Credentials</h1>
          <div className="sub">degrees &amp; certifications</div>
          <div className="rule"></div>
        </div>
        <div className="edu-grid">
          <div className="edu-col reveal">
            <div className="edu">
              <div className="top">
                <span className="uni">University of Connecticut</span>
                <span className="when">Aug 2024 — May 2026</span>
              </div>
              <div className="deg">Master of Engineering — Computer Science &amp; Engineering</div>
              <div className="gpa">▦ GPA 3.4 / 4.0</div>
            </div>
            <div className="edu">
              <div className="top">
                <span className="uni">Indus University</span>
                <span className="when">Aug 2020 — May 2024</span>
              </div>
              <div className="deg">Bachelor of Technology — Information Technology</div>
              <div className="gpa">▦ GPA 3.8 / 4.0</div>
            </div>
          </div>
          <div className="edu-col reveal">
            <div className="cert">
              <div className="ico">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                </svg>
              </div>
              <div>
                <div className="nm">AI Engineer for Data Scientists Associate</div>
                <div className="by">DataCamp · Certification</div>
              </div>
            </div>
            <div className="cert">
              <div className="ico">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                </svg>
              </div>
              <div>
                <div className="nm">AI Fluency: Framework &amp; Foundations</div>
                <div className="by">Anthropic · Certification</div>
              </div>
            </div>
            <div className="cert">
              <div className="ico" style={{ color: 'var(--cyan)' }}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <div>
                <div className="nm">Certificate of Completion — ReactJS</div>
                <div className="by">WayToWeb Pvt Ltd · Internship</div>
              </div>
            </div>
            <div className="cert" style={{ borderStyle: 'dashed' }}>
              <div className="ico" style={{ color: 'var(--green)' }}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <div className="nm">Mark of Excellence Award</div>
                <div className="by">Egniol Services · Recognition</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
