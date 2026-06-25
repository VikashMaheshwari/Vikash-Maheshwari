import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useMediumFeed } from '../hooks/useMediumFeed'

function FeatCard({ badges, title, excerpt, metaRows, fullContent, projectLink }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="feat reveal">
      <div className="fgrid">
        <div className="fl">
          <div className="badge-row">
            {badges.map((b, i) => <span key={i} className={`kbadge ${b.cls}`}>{b.label}</span>)}
          </div>
          <h3>{title}</h3>
          <p className="exrpt">{excerpt}</p>
          {projectLink ? (
            <Link className="btn primary" style={{ marginTop: '20px' }} to={projectLink}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              View Full Project →
            </Link>
          ) : fullContent ? (
            <button className="read" onClick={() => setOpen(o => !o)}>
              <span className="lbl">{open ? 'collapse ▲' : 'read notes ▾'}</span>
            </button>
          ) : null}
        </div>
        <div className="fr">
          {metaRows.map((row, i) => (
            <div key={i} className="row">
              <span className="k">{row.k}</span>
              <span className="v">{row.v}</span>
            </div>
          ))}
        </div>
      </div>
      {fullContent && (
        <div className={`post-full${open ? ' open' : ''}`}>
          {fullContent}
        </div>
      )}
    </article>
  )
}

const FALLBACK_POSTS = [
  {
    badges: [{ cls: 'log', label: 'ENGINEERING LOG' }, { cls: 'cy', label: 'AGENTS' }, { cls: 'draft', label: 'DRAFT' }],
    title: 'Designing a 4-Agent Research Pipeline: Search → Read → Write → Critique',
    excerpt: "How I replaced a manual, four-step research workflow with a fully autonomous multi-agent pipeline — and cut research-to-insight time by roughly 80%. Notes on LCEL composition, routing through Groq's Llama 3.1, grounding with Tavily, and why a dedicated Critique agent matters.",
    metaRows: [
      { k: 'stack', v: 'LangChain LCEL · Groq Llama 3.1 · Tavily · Streamlit' },
      { k: 'result', v: '~80% faster research-to-insight' },
      { k: 'surface', v: '5-page Streamlit UI · downloadable session library' },
      { k: 'read', v: '~6 min (est.)' },
    ],
    projectLink: '/projects',
    fullContent: null,
  },
  {
    badges: [{ cls: 'log', label: 'ENGINEERING LOG' }, { cls: 'cy', label: 'RAG' }],
    title: 'Grounded Generation: A Source-Cited RAG System with LangGraph',
    excerpt: 'Building an end-to-end retrieval system across PDFs and web pages — chunking, vector retrieval, and semantic search — that answers in real time with citations instead of hallucinations.',
    metaRows: [
      { k: 'stack', v: 'LangGraph · LangChain · FAISS · Streamlit' },
      { k: 'result', v: 'real-time, source-cited retrieval' },
      { k: 'surface', v: 'Streamlit app · PDF & web page Q&A' },
      { k: 'read', v: '~5 min (est.)' },
    ],
    fullContent: (
      <>
        <p>The goal was simple to state and hard to do well: let a user ask a question across a pile of PDFs and web pages and get an answer that cites where it came from. I built this end-to-end with LangGraph and LangChain.</p>
        <p>The pipeline does document chunking, vector-based retrieval, and semantic search, then grounds generation on the retrieved passages so every response ships with its sources. I wrapped it in a Streamlit interface for real-time querying.</p>
        <p>The takeaway: retrieval quality is the whole game. Good chunking and honest source citation turn an LLM from a confident guesser into a tool you can actually trust.</p>
      </>
    ),
  },
  {
    badges: [{ cls: 'log', label: 'ENGINEERING LOG' }, { cls: 'cy', label: 'FINE-TUNE' }],
    title: 'Teaching GPT-2 Fed-Speak: Building a 1,098-Pair SFT Dataset from Scratch',
    excerpt: 'There was no domain dataset for Federal Reserve policy language, so I built one — 1,098 Q&A pairs mined from 40 FOMC transcripts — then ran supervised fine-tuning on GPT-2.',
    metaRows: [
      { k: 'stack', v: 'GPT-2 · Python · SFT pipeline' },
      { k: 'result', v: '1,098 Q&A pairs · 40 transcripts' },
      { k: 'surface', v: 'Research / model training' },
      { k: 'read', v: '~7 min (est.)' },
    ],
    fullContent: (
      <>
        <p>No domain-specific dataset existed for Federal Reserve policy language, so step one was a custom extraction pipeline that produced 1,098 Q&A pairs from 40 Fed transcripts.</p>
        <p>With data in hand, I ran supervised fine-tuning on GPT-2 over the policy-language corpora and evaluated how well it generalized. The shape of the work maps closely to the CPT/SFT workflows used in foundation-model development.</p>
        <p>The lesson that stuck: in specialized domains, the dataset is the hard part. Curating it carefully buys more than any architecture tweak.</p>
      </>
    ),
  },
  {
    badges: [{ cls: 'log', label: 'ENGINEERING LOG' }, { cls: 'cy', label: 'AGENTS' }],
    title: 'ReAct in Practice: A Shopping Agent with Zero Human Handoff',
    excerpt: 'A LangChain ReAct agent with custom database tools and multi-model switching between Gemini and Qwen, running 5–7 step reasoning chains across 50+ test queries — fully autonomous.',
    metaRows: [
      { k: 'stack', v: 'LangChain ReAct · Gemini · Qwen' },
      { k: 'result', v: '50+ queries · zero human handoff' },
      { k: 'surface', v: 'Demo project' },
      { k: 'read', v: '~5 min (est.)' },
    ],
    fullContent: (
      <>
        <p>I built an autonomous shopping agent on the ReAct pattern with custom database tools and multi-model switching (Gemini, Qwen), so the agent could pick the right model for the step it was on.</p>
        <p>Across 50+ test queries it executed 5–7 step reasoning chains and returned structured recommendations with zero human handoff.</p>
        <p>What I learned: clean tool definitions and a tight reasoning loop matter more than a bigger model. Give an agent good tools and it stays on the rails.</p>
      </>
    ),
  },
  {
    badges: [{ cls: 'log', label: 'ENGINEERING LOG' }, { cls: 'cy', label: 'FORECAST' }],
    title: 'Beating XGBoost & Prophet with an LSTM on 33 Years of Retail Data',
    excerpt: 'A deep-learning forecasting pipeline on 33 years of FRED retail sales — stationarity checks, trend capture, a 24-month forecast, and a 4.49% error rate that beat every classical baseline.',
    metaRows: [
      { k: 'stack', v: 'LSTM · XGBoost · SARIMA · Prophet' },
      { k: 'result', v: '4.49% error · 24-month forecast' },
      { k: 'surface', v: 'Research / Python notebook' },
      { k: 'read', v: '~6 min (est.)' },
    ],
    fullContent: (
      <>
        <p>To support long-horizon revenue planning, I engineered an LSTM pipeline on 33 years of FRED retail data, including stationarity validation and trend capture.</p>
        <p>Benchmarked head-to-head, the LSTM outperformed XGBoost, SARIMA, and Prophet, landing a 4.49% error rate and delivering a 24-month forecast.</p>
        <p>Takeaway: classical models are strong baselines you should always run — but on a long, trend-heavy series, a well-validated LSTM earned its keep.</p>
      </>
    ),
  },
  {
    badges: [{ cls: 'log', label: 'ENGINEERING LOG' }, { cls: 'cy', label: 'MODELING' }],
    title: 'Reading Market Regimes with HMMs and GMMs',
    excerpt: 'Hidden Markov Models and Gaussian Mixture Models to classify market regimes across 15 years of S&P 500 data — statistically validated and backtested on 2025.',
    metaRows: [
      { k: 'stack', v: 'HMM · GMM · Statistical testing' },
      { k: 'result', v: '15 yrs S&P 500 · backtested 2025' },
      { k: 'surface', v: 'Research modeling' },
      { k: 'read', v: '~5 min (est.)' },
    ],
    fullContent: (
      <>
        <p>This one is about structure hiding in noise. I architected Hidden Markov Model and Gaussian Mixture Model pipelines to classify market regimes across 15 years of S&P 500 data.</p>
        <p>The regimes were validated through statistical testing and then backtested on 2025 data to check they held up out of sample.</p>
        <p>The why: probabilistic regime models give you a principled way to say &ldquo;the market is behaving differently now&rdquo; — useful context for any downstream decision system.</p>
      </>
    ),
  },
  {
    badges: [{ cls: 'draft', label: 'DRAFT' }, { cls: 'cy', label: 'MCP' }],
    title: 'MCP Tool Orchestration: Notes In Progress',
    excerpt: 'A working draft on designing tool/function-calling interfaces and MCP-based orchestration so agents can call the right tool, safely, with guardrails and observability.',
    metaRows: [
      { k: 'stack', v: 'MCP · LangGraph · LangSmith · Guardrails' },
      { k: 'result', v: 'work in progress' },
      { k: 'surface', v: 'Draft post' },
      { k: 'read', v: 'coming soon' },
    ],
    fullContent: (
      <>
        <p>This post is still being written. It will cover how I think about MCP-based tool orchestration, tool/function-calling design, and wiring in guardrails plus observability (LangSmith / Langfuse) — all drawn from the agent work in the project registry.</p>
        <p>Want the finished version? <Link to="/contact" style={{ color: 'var(--cyan)' }}>Reach out</Link> and I&apos;ll send it when it ships.</p>
      </>
    ),
  },
]

export default function Blog() {
  useReveal()
  const { posts, status, error } = useMediumFeed()
  const liveFeed = posts.length > 0 && !error

  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">07</span>
          <h1>Engineering Log</h1>
          <div className="sub">{status}</div>
          <div className="rule"></div>
        </div>


        {/* Live Medium feed */}
        {liveFeed && (
          <div id="mediumFeed">
            {posts.map((post, i) => (
              <article key={i} className="feat reveal in">
                <div className="fgrid">
                  <div className="fl">
                    <div className="badge-row">
                      {i === 0 && <span className="kbadge cy">FEATURED</span>}
                      <span className="kbadge log">MEDIUM</span>
                      {post.categories.slice(0, 2).map(c => (
                        <span key={c} className="kbadge cy">{c}</span>
                      ))}
                    </div>
                    <h3>{post.title}</h3>
                    <p className="exrpt">{post.excerpt}…</p>
                    <a className="btn primary" href={post.link} target="_blank" rel="noopener" style={{ marginTop: '18px' }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                        <path d="M13.54 12a4.36 4.36 0 0 1-4.36 4.35A4.36 4.36 0 0 1 4.83 12a4.36 4.36 0 0 1 4.35-4.35A4.36 4.36 0 0 1 13.54 12zm4.78 0c0 2.3-.78 4.16-1.74 4.16s-1.74-1.86-1.74-4.16.78-4.16 1.74-4.16S18.32 9.7 18.32 12zM22 12c0 2.06-.27 3.74-.61 3.74s-.61-1.68-.61-3.74.27-3.74.61-3.74S22 9.94 22 12z"/>
                      </svg>
                      Read on Medium ↗
                    </a>
                  </div>
                  <div className="fr">
                    {post.thumbnail && <img src={post.thumbnail} alt="" loading="lazy" />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Fallback / evergreen notes */}
        {!liveFeed && (
          <div id="blogFallback">
            {FALLBACK_POSTS.map((post, i) => <FeatCard key={i} {...post} />)}
          </div>
        )}
      </div>
    </section>
  )
}
