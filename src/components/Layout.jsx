import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import WebGLScene from './WebGLScene'
import useTheme from '../hooks/useTheme'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/education', label: 'Education' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLight, toggleTheme] = useTheme()
  const location = useLocation()

  // close drawer on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <WebGLScene />
      <div className="fx-overlay" data-depth="1" aria-hidden="true"></div>
      <div className="fx-scan" data-depth="2" aria-hidden="true"></div>
      <div className="fx-grain" data-depth="5" aria-hidden="true"></div>

      <header className="hud">
        <div className="brand"><span className="dot"></span> vikash@agent-console</div>
        <span className="sep"></span>
        <div className="stat hide-sm">Sys: <b>Online</b></div>
        <nav aria-label="Primary">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => isActive ? 'active' : undefined}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          className="theme-toggle"
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={toggleTheme}
        >
          {isLight ? <MoonIcon /> : <SunIcon />}
        </button>
        <div className="hud-mini">
          <Link to="/contact" className="chip" style={{ padding: '5px 11px' }}>Contact ↗</Link>
          <button
            className="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div className={`mob-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => isActive ? 'active' : undefined}
              onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mob-nav-foot">
          <a href="https://www.linkedin.com/in/vikashm02/" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="https://github.com/VikashMaheshwari" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="https://medium.com/@maheshwari.vikash6702" target="_blank" rel="noopener">Medium ↗</a>
        </div>
      </div>
      {menuOpen && <div className="mob-nav-backdrop" onClick={() => setMenuOpen(false)} />}

      <main className="app" id="main">
        {children}
        <footer>
          <div className="wrap foot">
            <span className="dot"></span> agent-console · session active <span>·</span>{' '}
            <a href="#main">↑ back to top</a>
            <span className="right">
              <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
                <a href="https://www.linkedin.com/in/vikashm02/" target="_blank" rel="noopener" style={{ color: 'var(--txt-dim)' }}>LinkedIn ↗</a>
                <a href="https://github.com/VikashMaheshwari" target="_blank" rel="noopener" style={{ color: 'var(--txt-dim)' }}>GitHub ↗</a>
                <a href="https://medium.com/@maheshwari.vikash6702" target="_blank" rel="noopener" style={{ color: 'var(--txt-dim)' }}>Medium ↗</a>
              </span>
              {' '}© 2026 Vikash Kumar Maheshwari
            </span>
          </div>
        </footer>
      </main>
    </>
  )
}
