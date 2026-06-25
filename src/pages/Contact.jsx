import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  useReveal()
  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">06</span>
          <h1>Open a Channel</h1>
          <div className="sub">let&apos;s build AI/ML systems together</div>
          <div className="rule"></div>
        </div>
        <div className="ct-wrap reveal">
          <div className="ct-grid">
            <div className="ct-l">
              <h3>
                Available for <span>AI / ML</span> engineering roles &amp; collaborations.
              </h3>
              <p>
                I build machine learning models, LLM pipelines, multi-agent systems, and production RAG —
                open to full-time roles anywhere in the US.
              </p>
              <div className="ct-links">
                <a className="clink" href="mailto:vikashmaheshwari2002@gmail.com">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-10 6L2 7"/>
                    </svg>
                  </div>
                  <div className="meta">
                    <div className="l">email</div>
                    <div className="v">vikashmaheshwari2002@gmail.com</div>
                  </div>
                  <span className="go">↗</span>
                </a>
                <a className="clink" href="https://www.linkedin.com/in/vikashm02/" target="_blank" rel="noopener">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </div>
                  <div className="meta">
                    <div className="l">linkedin</div>
                    <div className="v">linkedin.com/in/vikashm02</div>
                  </div>
                  <span className="go">↗</span>
                </a>
                <a className="clink" href="https://github.com/VikashMaheshwari" target="_blank" rel="noopener">
                  <div className="ico">
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </div>
                  <div className="meta">
                    <div className="l">github</div>
                    <div className="v">github.com/VikashMaheshwari</div>
                  </div>
                  <span className="go">↗</span>
                </a>
              </div>
              <a className="btn primary" style={{ marginTop: '22px' }} href="mailto:vikashmaheshwari2002@gmail.com">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 6L2 7"/>
                </svg>
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
