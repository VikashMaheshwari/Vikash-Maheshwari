import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useTypewriter } from '../hooks/useTypewriter'
import Terminal from '../components/Terminal'
import LogStream from '../components/LogStream'

const MARQUEE_ITEMS = [
  { label: 'Python', cls: 'gn' }, { label: 'PyTorch' }, { label: 'Scikit-learn', cls: 'cy' },
  { label: 'LangChain' }, { label: 'LangGraph', cls: 'cy' }, { label: 'Hugging Face' },
  { label: 'FAISS', cls: 'cy' }, { label: 'Pinecone' }, { label: 'LSTM', cls: 'gn' },
  { label: 'XGBoost' }, { label: 'SARIMA', cls: 'cy' }, { label: 'Prophet' },
  { label: 'VGG-16', cls: 'gn' }, { label: 'HMM · GMM' }, { label: 'RAG Pipelines', cls: 'cy' },
  { label: 'MCP' }, { label: 'LangSmith', cls: 'gn' }, { label: 'Docker' },
  { label: 'AWS', cls: 'cy' }, { label: 'FastAPI' }, { label: 'Streamlit', cls: 'gn' },
  { label: 'Matplotlib' }, { label: 'Power BI', cls: 'cy' }, { label: 'React.js' },
]

function MarqueeRow({ ariaHidden }) {
  return (
    <div className="marquee-row" aria-hidden={ariaHidden}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i}>
          <span className={`mi${item.cls ? ' ' + item.cls : ''}`}>{item.label}</span>
          <span className="dot"></span>
        </span>
      ))}
    </div>
  )
}

const STAT_CARDS = [
  { cls: 'c-g', target: 8, dec: 0, suffix: '', prefix: '', label: 'Shipped Projects', icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { cls: 'c-c', target: 80, dec: 0, suffix: '%', prefix: '~', label: 'Research Time Cut', icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { cls: 'c-a', target: 1098, dec: 0, suffix: '', prefix: '', label: 'Q&A Pairs Curated', icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg> },
  { cls: 'c-v', target: 4.49, dec: 2, suffix: '%', prefix: '', label: 'Forecast Error', icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
]

function StatCard({ cls, target, dec, suffix, prefix, label, icon }) {
  const numRef = useRef(null)
  const barRef = useRef(null)
  const ranRef = useRef(false)

  useEffect(() => {
    const el = numRef.current
    const bar = barRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function fmt(v, d) {
      return v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
    }

    function runAnim() {
      if (ranRef.current) return
      ranRef.current = true
      if (bar) bar.style.width = '100%'
      if (reduce) { el.textContent = prefix + fmt(target, dec) + suffix; return }
      const dur = 1400, t0 = performance.now()
      ;(function tick(now) {
        const p = Math.min(1, (now - t0) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        el.textContent = prefix + fmt(target * e, dec) + suffix
        if (p < 1) requestAnimationFrame(tick)
        else el.textContent = prefix + fmt(target, dec) + suffix
      })(t0)
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { runAnim(); io.unobserve(e.target) } })
    }, { threshold: 0.4 })
    const card = el.closest('.stat-card')
    if (card) io.observe(card)
    return () => io.disconnect()
  }, [target, dec, suffix, prefix])

  return (
    <div className={`stat-card ${cls}`}>
      <div className="sc-top">
        <span className="sc-num"><span className="num" ref={numRef}>0</span></span>
        <span className="sc-ic">{icon}</span>
      </div>
      <div className="sc-lab">{label}</div>
      <div className="sc-bar"><span ref={barRef}></span></div>
    </div>
  )
}

const BOOT_LINES = [
  { prefix: '$', cls: 'pf', content: <span className="dim">booting portfolio-agent v3.0 …</span> },
  { prefix: '✓', cls: 'ok', content: <>loaded identity → <span className="cy">Vikash Kumar Maheshwari</span></> },
  { prefix: '✓', cls: 'ok', content: <>mounted <span className="cy">PyTorch · Scikit-learn · LangChain</span></> },
  { prefix: '✓', cls: 'ok', content: <>connected vector stores <span className="dim">(FAISS · Pinecone · Chroma)</span></> },
  { prefix: '✓', cls: 'ok', content: <>loaded <span className="cy">8 models</span> · trained &amp; evaluated</> },
  { prefix: '!', cls: 'wn', content: <span className="dim">observability → LangSmith / Langfuse</span> },
  { prefix: '✓', cls: 'ok', content: <>portfolio ready. type <span className="cy">help</span> below ↓</> },
]

function BootSequence() {
  const [shown, setShown] = useState([])
  const [barsAnimated, setBarsAnimated] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((_, idx) => {
      setTimeout(() => {
        setShown(prev => [...prev, idx])
      }, 250 + idx * 230)
    })
    setTimeout(() => setBarsAnimated(true), 600)
  }, [])

  const BARS = [
    { lab: 'ML / deep learning', w: 94, color: 'linear-gradient(90deg,var(--green),#1f9d6b)', val: '94%' },
    { lab: 'LLM / RAG', w: 90, color: 'linear-gradient(90deg,var(--cyan),#1f7da0)', val: '90%' },
    { lab: 'forecasting', w: 88, color: 'linear-gradient(90deg,var(--amber),#b8821f)', val: '88%' },
  ]

  return (
    <aside className="boot" aria-label="System boot sequence">
      <div className="boot-bar">
        <div className="tl"><i className="r"></i><i className="y"></i><i className="g"></i></div>
        <div className="ti">~/agent · init.sh</div>
      </div>
      <div className="boot-body" id="bootBody">
        {BOOT_LINES.map((line, i) => (
          <div key={i} className={`boot-line${shown.includes(i) ? ' show' : ''}`}>
            <span className={line.cls}>{line.prefix}</span>
            <span>{line.content}</span>
          </div>
        ))}
        <div className="boot-bars">
          {BARS.map(bar => (
            <div key={bar.lab} className="bb">
              <span className="lab">{bar.lab}</span>
              <span className="track">
                <span className="fill" style={{ width: barsAnimated ? bar.w + '%' : '0', background: bar.color, transition: 'width 1.2s cubic-bezier(.16,1,.3,1)' }}></span>
              </span>
              <span className="val">{bar.val}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default function Home() {
  useReveal()
  const roleRef = useRef(null)
  useTypewriter(roleRef)

  return (
    <>
      {/* HERO */}
      <section className="scene block" id="hero">
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="kicker"><span className="blip"></span> AI / ML Engineer</span>
              <h1><span className="l1">VIKASH </span><span className="l2">MAHESHWARI</span></h1>
              <div className="role">&gt; <span ref={roleRef}></span><span className="cur"></span></div>
              <p className="prop">
                Building multi-agent AI systems, RAG pipelines, and MCP-based tool orchestration
                through context engineering, agent harness engineering, and agent loop engineering.
              </p>
              <div className="avail">
                <span className="bd"></span> Available now · Open to AI / ML Engineer roles · Relocate anywhere in US
              </div>
              <div className="hero-cta">
                <Link className="btn primary" to="/projects">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                  View Projects
                </Link>
                <Link className="btn" to="/contact">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                  Get in Touch
                </Link>
              </div>
              <div className="hero-stats" id="heroStats">
                {STAT_CARDS.map(card => <StatCard key={card.label} {...card} />)}
              </div>
            </div>
            <BootSequence />
          </div>
        </div>
      </section>

      {/* TECH MARQUEE STRIP */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          <MarqueeRow />
          <MarqueeRow ariaHidden="true" />
        </div>
      </div>

      {/* AGENT CONSOLE */}
      <section className="scene block" id="console">
        <div className="wrap">
          <div className="shead reveal">
            <span className="idx">01</span>
            <h2>Agent Console</h2>
            <div className="sub">interactive shell · query the portfolio agent in real time</div>
            <div className="rule"></div>
          </div>
          <div className="console-grid">
            <Terminal />
            <aside className="side">
              <div className="card reveal">
                <div className="card-h"><span className="i">◉</span> tool-call log <span className="r">streaming</span></div>
                <div className="card-b"><LogStream /></div>
              </div>
              <div className="card reveal">
                <div className="card-h"><span className="i">▤</span> evaluation metrics <span className="r">self-reported</span></div>
                <div className="card-b">
                  <div className="metrics">
                    {[
                      { cls: 'g', l: 'Research pipeline speedup', v: '~80%', w: 80 },
                      { cls: 'c', l: 'Image classification accuracy', v: '97%', w: 97 },
                      { cls: 'a', l: 'Forecast accuracy (1 − err)', v: '95.5%', w: 95 },
                      { cls: 'v', l: 'Fine-tune dataset coverage', v: '1,098 pairs', w: 85 },
                    ].map(m => (
                      <div key={m.l} className={`metric ${m.cls}`}>
                        <div className="top"><span className="l">{m.l}</span><span className="v">{m.v}</span></div>
                        <div className="track"><span className="fill" data-w={m.w}></span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card reveal">
                <div className="card-h"><span className="i">⬢</span> deployment status</div>
                <div className="card-b">
                  <div className="deploys">
                    {[
                      { dot: 'g', name: 'multi-agent-research', pill: 'live', pillLabel: 'streamlit' },
                      { dot: 'g', name: 'rag-doc-search', pill: 'live', pillLabel: 'streamlit' },
                      { dot: 'c', name: 'shopping-react-agent', pill: 'demo', pillLabel: 'demo' },
                      { dot: 'a', name: 'fomc-sft-gpt2', pill: 'rnd', pillLabel: 'research' },
                    ].map(d => (
                      <div key={d.name} className="deploy">
                        <span className={`bdot ${d.dot}`}></span>
                        <span className="nm">{d.name}</span>
                        <span className="st"><span className={`pill ${d.pill}`}>{d.pillLabel}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card reveal">
                <div className="card-h"><span className="i">◎</span> current focus</div>
                <div className="card-b">
                  <div className="focus-tags">
                    {['ML & deep learning', 'LLM fine-tuning', 'RAG pipelines', 'multi-agent AI', 'LLMOps & eval'].map(f => (
                      <span key={f}><span className="b">›</span> {f}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card reveal">
                <div className="card-h"><span className="i">✦</span> top technical strengths</div>
                <div className="card-b">
                  <div className="metrics">
                    {[
                      { cls: 'g', l: 'ML & deep learning', v: 'expert', w: 94 },
                      { cls: 'c', l: 'RAG & vector retrieval', v: 'expert', w: 90 },
                      { cls: 'v', l: 'LLM agents & orchestration', v: 'strong', w: 88 },
                      { cls: 'a', l: 'Time-series & forecasting', v: 'strong', w: 86 },
                    ].map(m => (
                      <div key={m.l} className={`metric ${m.cls}`}>
                        <div className="top"><span className="l">{m.l}</span><span className="v">{m.v}</span></div>
                        <div className="track"><span className="fill" data-w={m.w}></span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
