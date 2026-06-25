import { useState, useEffect, useRef } from 'react'
import { PROJECTS } from '../data/projects'
import { SKILLS } from '../data/skills'

function buildCommands() {
  return {
    help: () => `<h4>Available commands <span class="tag">shell</span></h4><div class="kv">
      <dt>about</dt><dd>who I am &amp; what I bring</dd>
      <dt>projects</dt><dd>list shipped systems</dd>
      <dt>skills</dt><dd>capability matrix</dd>
      <dt>experience</dt><dd>work history &amp; impact</dd>
      <dt>research</dt><dd>research-style modeling work</dd>
      <dt>education</dt><dd>degrees &amp; certifications</dd>
      <dt>blog</dt><dd>open the engineering log</dd>
      <dt>contact</dt><dd>email, phone &amp; profiles</dd>
      <dt>clear</dt><dd>reset the console</dd>
    </div>`,

    about: () => `<h4>whoami · about <span class="tag">profile</span></h4>
      <p style="color:var(--txt-dim);font-size:13px;line-height:1.7;margin-bottom:10px">
        AI / ML Engineer who <b style="color:var(--txt)">learns fast and goes deep</b> — classical ML, deep learning, LLM fine-tuning,
        multi-agent pipelines, and production RAG. M.Eng in CS &amp; Engineering from UConn (2026).
      </p>
      <div class="kv">
        <dt>edge</dt><dd>full ML/AI stack · ships to production</dd>
        <dt>seeking</dt><dd>full-time AI / ML Engineer roles</dd>
        <dt>location</dt><dd>Hartford, CT · open to relocate (US)</dd>
        <dt>certified</dt><dd>Anthropic AI Fluency · DataCamp AI Engineer</dd>
      </div>`,

    projects: () => {
      const items = PROJECTS.map(p =>
        `<li><span class="ic">▸</span><div><b>${p.name}</b> — ${p.system}</div><span class="meta">${p.impact}</span></li>`
      ).join('')
      return `<h4>Project registry · ${PROJECTS.length} systems <span class="tag">${PROJECTS.length} found</span></h4>
        <ul class="mlist">${items}</ul>
        <div class="echo" style="margin-top:6px">↳ open <a href="/projects" style="color:var(--cyan)">/projects</a> for full cards →</div>`
    },

    skills: () => {
      const tiles = SKILLS.map(s =>
        `<div class="stile"><div class="t"><span class="d"></span>${s.t}</div><div class="tags">${s.tags.map(x => `<span>${x}</span>`).join('')}</div></div>`
      ).join('')
      return `<h4>Capability matrix <span class="tag">${SKILLS.length} groups</span></h4><div class="skill-tiles">${tiles}</div>`
    },

    experience: () => `<h4>Execution trace <span class="tag">3 roles</span></h4><ul class="mlist">
      <li><span class="ic">▸</span><div><b>University of Connecticut</b> · Data Analyst, Catering Services — built dashboards for the sales team, automated reporting for a 10-member team &amp; 30+ staff, and supported operations.</div><span class="meta">2024–2026</span></li>
      <li><span class="ic">▸</span><div><b>Egniol Services Pvt. Ltd.</b> · Financial Research &amp; Strategy Analyst — advised 100+ startup/MSME clients on funding readiness, built pitch decks &amp; financial projections, researched grants, and simplified complex business decisions for founders across healthcare, agri &amp; manufacturing.</div><span class="meta">2023–2024 · ★ Mark of Excellence</span></li>
      <li><span class="ic">▸</span><div><b>WayToWeb Pvt. Ltd.</b> · React Developer (Intern) — built ReactJS single-page apps with React Router; multi-project front-end work.</div><span class="meta">2022 · ReactJS cert</span></li>
    </ul>`,

    research: () => {
      const r = PROJECTS
        .filter(p => ['FINE-TUNE', 'FORECAST', 'MODELING', 'VISION'].includes(p.kind))
        .map(p => `<li><span class="ic">▸</span><div><b>${p.name}</b> — ${p.system}</div><span class="meta">${p.impact}</span></li>`)
        .join('')
      return `<h4>Research &amp; modeling work <span class="tag">resume projects</span></h4>
        <div class="echo" style="margin-top:-4px">↳ no formal publications listed — these are research-style projects from the résumé</div>
        <ul class="mlist">${r}</ul>`
    },

    education: () => `<h4>Education &amp; credentials <span class="tag">verified</span></h4><ul class="mlist">
      <li><span class="ic">▸</span><div><b>University of Connecticut</b> — M.Eng, CS &amp; Engineering</div><span class="meta">GPA 3.4 · 2026</span></li>
      <li><span class="ic">▸</span><div><b>Indus University</b> — B.Tech, Information Technology</div><span class="meta">GPA 3.8 · 2024</span></li>
      <li><span class="ic">▸</span><div><b>AI Engineer for Data Scientists Associate</b> — DataCamp</div><span class="meta">cert</span></li>
      <li><span class="ic">▸</span><div><b>AI Fluency: Framework &amp; Foundations</b> — Anthropic</div><span class="meta">cert</span></li>
    </ul>`,

    blog: () => `<h4>Engineering log <span class="tag">blog</span></h4>
      <div class="echo" style="margin-top:-4px">↳ open <a href="/blog" style="color:var(--cyan)">/blog</a> — technical notes from real project work</div>`,

    contact: () => `<h4>Contact channels <span class="tag">open</span></h4><div class="kv">
      <dt>email</dt><dd><a href="mailto:vikashmaheshwari2002@gmail.com" style="color:var(--cyan)">vikashmaheshwari2002@gmail.com</a></dd>
      <dt>phone</dt><dd>(860) 634-8639</dd>
      <dt>location</dt><dd>Hartford, CT</dd>
      <dt>linkedin</dt><dd><a href="https://www.linkedin.com/in/vikashm02/" target="_blank" rel="noopener" style="color:var(--cyan)">linkedin.com/in/vikashm02</a></dd>
      <dt>github</dt><dd><a href="https://github.com/VikashMaheshwari" target="_blank" rel="noopener" style="color:var(--cyan)">github.com/VikashMaheshwari</a></dd>
    </div>`,

    whoami: () => `<h4>whoami <span class="tag">identity</span></h4><div class="kv">
      <dt>name</dt><dd>Vikash Kumar Maheshwari</dd>
      <dt>role</dt><dd>AI / ML Engineer</dd>
      <dt>tagline</dt><dd>machine learning · LLM pipelines · multi-agent AI</dd>
    </div>`
  }
}

const CHIPS = [
  { cmd: 'help', label: <><b>help</b></> },
  { cmd: 'about', label: 'about' },
  { cmd: 'projects', label: 'projects' },
  { cmd: 'skills', label: 'skills' },
  { cmd: 'experience', label: 'experience' },
  { cmd: 'research', label: 'research' },
  { cmd: 'education', label: 'education' },
  { cmd: 'blog', label: 'blog' },
  { cmd: 'contact', label: 'contact' },
]

export default function Terminal() {
  const [entries, setEntries] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [activeCmd, setActiveCmd] = useState('help')
  const outRef = useRef(null)
  const inputRef = useRef(null)
  const C = useRef(buildCommands())

  function run(raw) {
    const cmd = (raw || '').trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') { setEntries([]); setActiveCmd(''); return }
    setActiveCmd(cmd)
    const fn = C.current[cmd]
    const html = fn
      ? fn()
      : `<div class="echo" style="color:var(--red)">command not found: <span class="cmd">${cmd}</span> — type <span class="cmd">help</span></div>`
    setEntries(prev => [...prev, { cmd, html }])
  }

  // auto-run help on mount
  useEffect(() => { run('help') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // scroll to bottom on new entries
  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight
  }, [entries])

  function handleSubmit(e) {
    e.preventDefault()
    run(inputVal)
    setInputVal('')
  }

  return (
    <div className="term reveal">
      <div className="term-bar">
        <div className="tl"><i className="r"></i><i className="y"></i><i className="g"></i></div>
        <div className="path">vikash@console: <b>~/portfolio</b></div>
        <div className="live"><span className="dot"></span>session live</div>
      </div>
      <div className="cmd-row">
        {CHIPS.map(({ cmd, label }) => (
          <button
            key={cmd}
            className={`chip${activeCmd === cmd ? ' active' : ''}`}
            data-cmd={cmd}
            onClick={() => { run(cmd); inputRef.current && inputRef.current.focus() }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="term-out" ref={outRef} aria-live="polite">
        {entries.map((entry, i) => (
          <div key={i}>
            <div className="echo">
              <span className="pf">vikash@portfolio:~$</span> <span className="cmd">{entry.cmd}</span>
            </div>
            <div className="mod" dangerouslySetInnerHTML={{ __html: entry.html }} />
          </div>
        ))}
      </div>
      <form className="term-in" onSubmit={handleSubmit} autoComplete="off">
        <span className="pf">vikash@portfolio:~$</span>
        <input
          ref={inputRef}
          id="termInput"
          type="text"
          placeholder="type a command… (try: projects)"
          aria-label="terminal command input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
      </form>
    </div>
  )
}
