import { useState, useEffect } from 'react'

const MEDIUM_USER = '@maheshwari.vikash6702'

// Medium's RSS feed exposes only the FIRST image inside the article body,
// not the featured image chosen in the story settings. This is only the
// immediate-paint fallback shown before the live cover resolves — the real
// source of truth is always /api/og-image, re-checked on a TTL (see
// THUMB_TTL_MS below) so an edited cover on Medium self-corrects here too,
// instead of silently going stale like these hardcoded ids used to.
const FEATURED_IMAGES = {
  'The Model Is Not the Agent': '1*fY152lP-ZY5y8YQFFyXvWQ.png',
  'Long-Running & Multi-Agent Loops: Engineering for Hours, Not Seconds': '1*4YnLgnQmiKrWXOdcO8Ib6A.png',
  'Stopping, Verifying & Self-Correction: Closing the Loop': '1*2-yFP8FBMtdQqn-DGENvCg.png',
  'The Agentic Loop: How AI Goes From Chatbot to Worker': '1*MRR-kWP74RxmYoORvt0guA.png',
  'Sandboxing, Permissions & Trust: Harness Engineering for Safety': '1*1w_4lfM8ZCA7kgNFBBfRsQ.png',
  'Designing Tools Agents Actually Use Well': '1*asr0sQqk4yJIUUVpDWxgdQ.png',
  'What Is an Agent Harness? The Invisible Layer That Makes LLMs Useful': '1*X-ZSX1YGFU7u8ArfqqiE6g.png',
  'Memory, RAG & Sub-Agents: Three Ways to Beat the Context Window': '1*_ZBVfKzAkj7_5c1SF6O3Fg.png',
  'Context Rot: Why Your Agent Gets Dumber the Longer It Runs': '1*jC_Cnl-Og-4a3JSNy7U_pw.png',
  'Context Engineering Is the New Prompt Engineering': '1*K_WZHYVV_LUHoes40ntHuQ.png',
  'AI Explained Simply: What Is an AI Agent?': '1*DSpmwf8HkCSm2ku51ZhxCQ.png',
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

function thumbFor(title, item, resolvedImage) {
  if (resolvedImage) return toLight(resolvedImage)
  const id = FEATURED_IMAGES[title]
  if (id) return miro(id)
  return toLight(item.thumbnail || firstImg(item.content || item.description))
}

// Cache of resolved cover images (link -> { image, ts }). Entries older than
// THUMB_TTL_MS are treated as stale and re-fetched from /api/og-image, so a
// cover changed on Medium after publish gets picked up automatically instead
// of requiring a manual edit here.
const THUMB_CACHE_KEY = 'mediumThumbCache_v2'
const THUMB_TTL_MS = 30 * 24 * 60 * 60 * 1000

function loadThumbCache() {
  try { return JSON.parse(localStorage.getItem(THUMB_CACHE_KEY)) || {} } catch (e) { return {} }
}

function saveThumbCache(cache) {
  try { localStorage.setItem(THUMB_CACHE_KEY, JSON.stringify(cache)) } catch (e) { /* storage full or unavailable */ }
}

const canonLink = l => (l || '').split('?')[0]

async function fetchCoverImage(link) {
  try {
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null
    const timer = setTimeout(() => { ctrl && ctrl.abort() }, 6000)
    const r = await fetch('/api/og-image?url=' + encodeURIComponent(link), ctrl ? { signal: ctrl.signal } : undefined)
    clearTimeout(timer)
    if (!r.ok || !(r.headers.get('content-type') || '').includes('json')) return null
    const d = await r.json()
    return d.image || null
  } catch (e) {
    return null
  }
}

// Asks the /api/og-image serverless function for every post whose cached
// cover is missing or older than THUMB_TTL_MS — every post, not just ones
// without a hand-curated FEATURED_IMAGES entry, so hardcoded ids don't stay
// stuck forever if the real cover changes on Medium later.
function resolveCoverImages(posts, setPosts) {
  const cache = loadThumbCache()
  const stale = p => {
    const c = cache[canonLink(p.link)]
    return !c || (Date.now() - c.ts) > THUMB_TTL_MS
  }
  const unresolved = posts.filter(stale)
  if (!unresolved.length) return

  Promise.all(unresolved.map(p => fetchCoverImage(p.link).then(image => ({ link: p.link, image }))))
    .then(results => {
      const now = Date.now()
      const updates = {}
      for (const { link, image } of results) {
        if (image) updates[canonLink(link)] = { image, ts: now }
      }
      if (!Object.keys(updates).length) return
      saveThumbCache({ ...cache, ...updates })
      setPosts(prev => prev.map(p => {
        const u = updates[canonLink(p.link)]
        return u ? { ...p, thumbnail: toLight(u.image) } : p
      }))
    })
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
    thumbnail: 'https://miro.medium.com/v2/resize:fit:800/1*DSpmwf8HkCSm2ku51ZhxCQ.png',
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
        const thumbCache = loadThumbCache()
        const mapped = d.items.map(item => {
          const title = stripT(item.title)
          const cached = thumbCache[canonLink(item.link)]
          return {
            title,
            link: item.link,
            description: item.description || item.content || '',
            thumbnail: thumbFor(title, item, cached && cached.image),
            categories: item.categories || [],
            date: fmtDate(item.pubDate),
            excerpt: stripT(item.description || item.content).slice(0, 230)
          }
        })
        // merge: live feed first, then cached posts that fell off the feed,
        // then the static archive seed — deduped by canonical link and title
        const seen = new Set()
        const all = []
        for (const p of [...mapped, ...loadCache(), ...ARCHIVE_POSTS]) {
          const key = canonLink(p.link)
          if (seen.has(key) || all.some(x => x.title === p.title)) continue
          seen.add(key)
          all.push(p)
        }
        saveCache(all)
        setStatus('● live · synced from medium · ' + all.length + ' posts')
        const withCachedThumbs = all.map(p => {
          const cached = thumbCache[canonLink(p.link)]
          return cached ? { ...p, thumbnail: toLight(cached.image) } : p
        })
        setPosts(withCachedThumbs)
        resolveCoverImages(withCachedThumbs, setPosts)
      })
      .catch(err => {
        clearTimeout(timer)
        if (err.name === 'AbortError') return
        const cached = loadCache()
        if (cached.length) {
          setStatus('● cached · medium unreachable · ' + cached.length + ' posts')
          const thumbCache = loadThumbCache()
          const withCachedThumbs = cached.map(p => {
            const c = thumbCache[canonLink(p.link)]
            return c ? { ...p, thumbnail: toLight(c.image) } : p
          })
          setPosts(withCachedThumbs)
          return
        }
        setError(true)
        setStatus('showing engineering notes')
      })

    return () => { ctrl && ctrl.abort(); clearTimeout(timer) }
  }, [])

  return { posts, status, error }
}
