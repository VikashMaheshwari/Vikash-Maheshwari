import { useState, useEffect } from 'react'

const LOG_LINES = [
  ['run', 'ml.train', 'LSTM epoch 12/20 · loss ↓ 0.041'],
  ['ok', 'retriever', 'vector hit · FAISS k=4'],
  ['info', 'router', 'model → Groq Llama 3.1'],
  ['ok', 'react.step', 'reason → act (3/7)'],
  ['warn', 'guardrail', 'grounding check passed'],
  ['ok', 'eval', 'sklearn · F1 0.91 · acc 0.89'],
  ['run', 'sft', 'GPT-2 fine-tune · epoch 3/5'],
  ['ok', 'rag', 'source-cited response ✓'],
  ['info', 'mcp', 'tool registered: db.query'],
  ['ok', 'forecast', 'LSTM err 4.49% · 24-mo'],
  ['ok', 'model', 'VGG-16 inference · 97% acc'],
  ['run', 'agent.search', 'dispatch → Tavily query'],
]

const ts = () => new Date().toTimeString().slice(0, 8)

function buildInitialLogs() {
  const logs = []
  for (let k = 0; k < 7; k++) {
    const [tg, who, msg] = LOG_LINES[k % LOG_LINES.length]
    logs.push({ id: k, tg, who, msg, time: ts() })
  }
  return logs
}

export default function LogStream() {
  const [logs, setLogs] = useState(buildInitialLogs)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let i = 7
    const interval = setInterval(() => {
      const [tg, who, msg] = LOG_LINES[i % LOG_LINES.length]
      i++
      setLogs(prev => {
        const next = [...prev, { id: Date.now(), tg, who, msg, time: ts() }]
        return next.length > 7 ? next.slice(next.length - 7) : next
      })
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="logs" id="logStream">
      {logs.map(log => (
        <div key={log.id} className="log new">
          <span className="ts">{log.time}</span>
          <span className={`tg ${log.tg}`}>{log.tg.toUpperCase()}</span>
          <span className="ms">{log.who} · {log.msg}</span>
        </div>
      ))}
    </div>
  )
}
