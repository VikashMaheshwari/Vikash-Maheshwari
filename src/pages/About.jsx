import { useReveal } from '../hooks/useReveal'

export default function About() {
  useReveal()
  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">00</span>
          <h1>About // whoami</h1>
          <div className="sub">the engineer behind the console</div>
          <div className="rule"></div>
        </div>
        <div className="about-grid">
          <div className="about-bio reveal">
            <p className="lead">
              I'm <b>Vikash</b> — an AI / ML Engineer who learns fast, goes deep, and turns hard problems into working systems.
            </p>
            <p>
              What sets me apart is how quickly I get to depth. I hold a{' '}
              <b>Master of Engineering in Computer Science &amp; Engineering from the University of Connecticut</b>{' '}
              (Class of 2026), and alongside it I've built the full ML/AI stack end to end — from classical machine learning
              and deep learning through to LLM fine-tuning, multi-agent pipelines, RAG systems, and MCP-based tool
              orchestration, with evaluation, guardrails, and observability throughout.
            </p>
            <p>
              I also bring a less common background: before AI engineering I worked as a{' '}
              <b>Research Analyst advising 100+ startups and MSMEs</b> on valuation and market strategy. That lens sharpens
              which problems are worth solving — it's why my work spans{' '}
              <b>forecasting 33 years of U.S. retail sales</b>,{' '}
              <b>detecting market regimes across 15 years of the S&amp;P 500</b>, and{' '}
              <b>fine-tuning a model on Federal Reserve policy language</b>.
            </p>
            <p>
              I optimize for measurable impact — like training an LSTM that beat XGBoost, SARIMA, and Prophet at 4.49%
              error, and replacing a manual research workflow with a 4-agent pipeline that cut time by ~80%. I'm{' '}
              <b>Anthropic AI Fluency</b> and <b>DataCamp AI Engineer</b> certified, and I'm looking for a full-time{' '}
              <b>AI / ML Engineer</b> role — open to relocating anywhere in the US.
            </p>
            <div className="about-status">
              <span className="pillx">
                <span className="bd" style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }}></span>
                Open to full-time roles
              </span>
              <span className="pillx">
                <span className="bd" style={{ background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}></span>
                M.Eng · UConn 2026
              </span>
              <span className="pillx">
                <span className="bd" style={{ background: 'var(--amber)', boxShadow: '0 0 8px var(--amber)' }}></span>
                Open to relocate · US
              </span>
            </div>
          </div>
          <aside className="about-side reveal" aria-label="What I bring">
            <div className="abx">
              <div className="at"><span className="ico">01</span> Fast, Deep Learner</div>
              <p>I go from a new paper, tool, or problem to a working, well-understood system quickly — and I don't stop at the surface.</p>
            </div>
            <div className="abx">
              <div className="at"><span className="ico">02</span> Full ML/AI Stack</div>
              <p>Classical ML, deep learning, LLM fine-tuning, multi-agent systems, and RAG — across the whole stack, not just one layer.</p>
            </div>
            <div className="abx">
              <div className="at"><span className="ico">03</span> Production Mindset</div>
              <p>Evaluation, guardrails, observability and cost-aware model routing built in from the start, not bolted on later.</p>
            </div>
            <div className="abx">
              <div className="at"><span className="ico">04</span> Cross-Domain Edge</div>
              <p>Real finance, market and data experience that sharpens which ML problems are worth solving.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
