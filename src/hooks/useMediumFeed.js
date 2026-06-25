import { useState, useEffect } from 'react'

const MEDIUM_USER = '@maheshwari.vikash6702'

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
        setStatus('● live · synced from medium · ' + d.items.length + ' posts')
        setPosts(d.items.map(item => ({
          title: item.title,
          link: item.link,
          description: item.description || item.content || '',
          thumbnail: item.thumbnail || firstImg(item.content || item.description),
          categories: item.categories || [],
          date: fmtDate(item.pubDate),
          excerpt: stripT(item.description || item.content).slice(0, 230)
        })))
      })
      .catch(err => {
        clearTimeout(timer)
        if (err.name === 'AbortError') return
        setError(true)
        setStatus('showing engineering notes')
      })

    return () => { ctrl && ctrl.abort(); clearTimeout(timer) }
  }, [])

  return { posts, status, error }
}
