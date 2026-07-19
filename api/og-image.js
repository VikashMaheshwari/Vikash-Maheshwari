import https from 'node:https'

// Resolves the real featured/cover image for a Medium article by reading its
// og:image meta tag server-side. Medium's RSS feed only exposes the first
// image inside the article body, not the cover chosen in story settings, and
// that lookup can't happen client-side (CORS blocks cross-origin HTML reads).
//
// This deliberately uses the classic `https` module instead of fetch(): fetch
// is backed by undici, which negotiates HTTP/2 by default, and Medium's edge
// bot-protection blocks that connection with a 403 even with a browser User-
// Agent. Plain https.request stays on HTTP/1.1 (like curl) and gets through.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

function fetchHtml(url, redirectsLeft = 3) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { headers: { 'User-Agent': UA } }, (res) => {
      const { statusCode, headers } = res
      if (statusCode >= 300 && statusCode < 400 && headers.location && redirectsLeft > 0) {
        res.resume()
        fetchHtml(new URL(headers.location, url), redirectsLeft - 1).then(resolve, reject)
        return
      }
      if (statusCode !== 200) {
        res.resume()
        reject(new Error('status ' + statusCode))
        return
      }
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
    req.setTimeout(8000, () => req.destroy(new Error('timeout')))
    req.end()
  })
}

export default async function handler(req, res) {
  const { url } = req.query

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'missing url' })
    return
  }

  let parsed
  try {
    parsed = new URL(url)
  } catch {
    res.status(400).json({ error: 'invalid url' })
    return
  }

  const host = parsed.hostname
  if (host !== 'medium.com' && !host.endsWith('.medium.com')) {
    res.status(400).json({ error: 'unsupported host' })
    return
  }

  try {
    const html = await fetchHtml(parsed)
    const match = /property="og:image"\s+content="([^"]+)"/.exec(html)
    // Only cache a successful match — caching a miss would lock in "no image"
    // at the edge for a week even after a transient Medium block clears.
    if (match) res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=86400')
    res.status(200).json({ image: match ? match[1] : null })
  } catch {
    res.status(200).json({ image: null })
  }
}
