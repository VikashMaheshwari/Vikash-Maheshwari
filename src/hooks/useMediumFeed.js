import { useState, useEffect } from 'react'

const MEDIUM_USER = '@maheshwari.vikash6702'

// Medium's RSS feed exposes only the FIRST image inside the article body,
// not the featured image chosen in the story settings. This maps each post
// title to its real featured image (as shown on the Medium profile cards).
// New posts fall back to the first body image unless added here.
const FEATURED_IMAGES = {
  'The Model Is Not the Agent': '1*fY152lP-ZY5y8YQFFyXvWQ.png',
  'Long-Running & Multi-Agent Loops: Engineering for Hours, Not Seconds': '1*4YnLgnQmiKrWXOdcO8Ib6A.png',
  'Stopping, Verifying & Self-Correction: Closing the Loop': '1*2-yFP8FBMtdQqn-DGENvCg.png',
  'The Agentic Loop: How AI Goes From Chatbot to Worker': '1*MRR-kWP74RxmYoORvt0guA.png',
  'Sandboxing, Permissions & Trust: Harness Engineering for Safety': '1*oxKsuz8lktcEyQ4PBszVjA.png',
  'Designing Tools Agents Actually Use Well': '1*asr0sQqk4yJIUUVpDWxgdQ.png',
  'What Is an Agent Harness? The Invisible Layer That Makes LLMs Useful': '1*JeTbXTs9j9BODCsep2YfQA.png',
  'Memory, RAG & Sub-Agents: Three Ways to Beat the Context Window': '1*VcX_STlBK5w0CIeHrK_hdg.png',
  'Context Rot: Why Your Agent Gets Dumber the Longer It Runs': '1*iYE0z2tE2_4ajCqfOlKaoQ.png',
  'Context Engineering Is the New Prompt Engineering': '1*K_WZHYVV_LUHoes40ntHuQ.png',
  'AI Explained Simply: What Is an AI Agent?': '1*wInGeNdrwki5T2GmJyjxdA.png',
}

// miro.medium.com serves resized (and webp-converted) variants — much lighter
// than the full-size cdn-images-1 originals, which froze the page at 11 posts.
function miro(id) {
  return 'https://miro.medium.com/v2/resize:fit:800/' + id
}

function toLight(url) {
  const m = /\/(1\*[^/?]+)(\?|$)/.exec(url || '')
  return m ? miro(m[1]) : url
}

function thumbFor(title, item) {
  const id = FEATURED_IMAGES[title]
  if (id) return miro(id)
  return toLight(item.thumbnail || firstImg(item.content || item.description))
}

// Medium's RSS feed only carries the 10 newest posts, so every post the
// page has ever seen is cached in localStorage — posts that age out of the
// feed keep rendering from the cache instead of disappearing.
const CACHE_KEY = 'mediumPostsCache_v2'

function loadCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || [] } catch (e) { return [] }
}

function saveCache(posts) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(posts.map(({ description, ...rest }) => rest)))
  } catch (e) { /* storage full or unavailable — cache is best-effort */ }
}

// Seed for posts that had already fallen off the feed before caching existed.
const ARCHIVE_POSTS = [
  {
    title: 'AI Explained Simply: What Is an AI Agent?',
    link: 'https://medium.com/@maheshwari.vikash6702/ai-explained-simply-what-is-an-ai-agent-cd3164188058',
    description: '',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:800/1*wInGeNdrwki5T2GmJyjxdA.png',
    categories: ['ai-agent', 'ai-explained'],
    date: 'Jun 19, 2026',
    excerpt: 'If you’ve spent any time around tech news lately, you’ve probably seen the words “AI agent” everywhere. People say it like you’re supposed to already know what it means',
  },
]

function stripT(h) {
  const d = document.createElement('div')
  d.innerHTML = h || ''
  return (d.textContent || '').replace(/\s+/g, ' ').trim()
}

function firstImg(h) {
  const m = /<img[^>]+src=["']([^"'>]+)["']/i.exec(h || '')
  return m ? m[1] : ''
}

function fmtDate(s) {
  try {
    return new Date(s.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch (e) {
    return ''
  }
}

export function useMediumFeed() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('syncing from medium…')
  const [error, setError] = useState(null)

  useEffect(() => {
    const feed = 'https://medium.com/feed/' + MEDIUM_USER
    const api = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feed) + '&_=' + Date.now()

    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null
    const timer = setTimeout(() => { ctrl && ctrl.abort() }, 9000)

    fetch(api, ctrl ? { signal: ctrl.signal } : undefined)
      .then(r => r.json())
      .then(d => {
        clearTimeout(timer)
        if (d.status !== 'ok' || !d.items || !d.items.length) throw new Error('empty feed')
        const mapped = d.items.map(item => {
          const title = stripT(item.title)
          return {
            title,
            link: item.link,
            description: item.description || item.content || '',
            thumbnail: thumbFor(title, item),
            categories: item.categories || [],
            date: fmtDate(item.pubDate),
            excerpt: stripT(item.description || item.content).slice(0, 230)
          }
        })
        // merge: live feed first, then cached posts that fell off the feed,
        // then the static archive seed — deduped by canonical link and title
        const canon = l => (l || '').split('?')[0]
        const seen = new Set()
        const all = []
        for (const p of [...mapped, ...loadCache(), ...ARCHIVE_POSTS]) {
          const key = canon(p.link)
          if (seen.has(key) || all.some(x => x.title === p.title)) continue
          seen.add(key)
          all.push(p)
        }
        saveCache(all)
        setStatus('● live · synced from medium · ' + all.length + ' posts')
        setPosts(all)
      })
      .catch(err => {
        clearTimeout(timer)
        if (err.name === 'AbortError') return
        const cached = loadCache()
        if (cached.length) {
          setStatus('● cached · medium unreachable · ' + cached.length + ' posts')
          setPosts(cached)
          return
        }
        setError(true)
        setStatus('showing engineering notes')
      })

    return () => { ctrl && ctrl.abort(); clearTimeout(timer) }
  }, [])

  return { posts, status, error }
}
