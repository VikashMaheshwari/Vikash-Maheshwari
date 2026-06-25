import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function WebGLScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05070d, 0.045)
    const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 200)
    camera.position.set(0, 0, 38)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !coarse,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2))

    const root = new THREE.Group()
    scene.add(root)

    // AGENT NODES
    const NODE_COUNT = coarse ? 34 : 58
    const COLORS = [0x3ef0a3, 0x39d6ff, 0xffc24b, 0x9a8cff]
    const nodes = []
    const nodeGeo = new THREE.IcosahedronGeometry(0.42, 0)

    for (let i = 0; i < NODE_COUNT; i++) {
      const col = COLORS[i % COLORS.length]
      const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.85 })
      const m = new THREE.Mesh(nodeGeo, mat)
      const r = 14 + Math.random() * 22
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      m.position.set(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.7, r * Math.cos(ph) - 14)
      const s = 0.5 + Math.random() * 1.4
      m.scale.setScalar(s)
      m.userData = { col, spin: (Math.random() - 0.5) * 0.01, pulse: Math.random() * Math.PI * 2, base: s }
      root.add(m)
      nodes.push(m)
    }

    // EDGES
    const linePos = [], lineCol = [], edges = []
    const cTmp = new THREE.Color()
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 10 && Math.random() < 0.5) {
          edges.push([i, j])
          linePos.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z)
          cTmp.setHex(nodes[i].userData.col); lineCol.push(cTmp.r, cTmp.g, cTmp.b)
          cTmp.setHex(nodes[j].userData.col); lineCol.push(cTmp.r, cTmp.g, cTmp.b)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3))
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.18 })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    root.add(lines)

    // DATA PACKETS
    const PKT = coarse ? 14 : 30
    const pktGeo = new THREE.BufferGeometry()
    const pktPos = new Float32Array(PKT * 3)
    const pktState = []
    for (let i = 0; i < PKT; i++) {
      const e = edges[Math.floor(Math.random() * edges.length)] || [0, 1]
      pktState.push({ e, t: Math.random(), sp: 0.004 + Math.random() * 0.01 })
    }
    pktGeo.setAttribute('position', new THREE.BufferAttribute(pktPos, 3))
    const packets = new THREE.Points(pktGeo, new THREE.PointsMaterial({ color: 0x9fffe0, size: 0.6, transparent: true, opacity: 0.95, sizeAttenuation: true }))
    root.add(packets)

    // STARFIELD
    const STARS = coarse ? 500 : 1100
    const sGeo = new THREE.BufferGeometry()
    const sPos = new Float32Array(STARS * 3)
    for (let i = 0; i < STARS; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 180
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 120
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0x6f86b8, size: 0.18, transparent: true, opacity: 0.55 }))
    scene.add(stars)

    // GRID FLOOR
    const grid = new THREE.GridHelper(160, 64, 0x1b3a5a, 0x12233a)
    grid.material.transparent = true
    grid.material.opacity = 0.16
    grid.position.y = -26
    scene.add(grid)

    // PARALLAX
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / innerWidth - 0.5)
      mouse.ty = (e.clientY / innerHeight - 0.5)
    }
    if (!coarse) window.addEventListener('mousemove', onMouseMove)

    // SCROLL CAMERA
    if (!reduce) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(camera.position, { z: 10, y: -4, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.1 } })
      gsap.to(root.rotation, { y: Math.PI * 0.5, x: 0.22, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.4 } })
    }

    const clock = new THREE.Clock()
    let raf

    function frame() {
      const t = clock.getElapsedTime()
      if (!reduce) {
        for (const n of nodes) {
          n.rotation.x += n.userData.spin
          n.rotation.y += n.userData.spin * 1.3
          n.scale.setScalar(n.userData.base * (1 + Math.sin(t * 1.6 + n.userData.pulse) * 0.12))
        }
        for (let i = 0; i < PKT; i++) {
          const p = pktState[i]
          p.t += p.sp
          if (p.t > 1) {
            p.t = 0
            const e = edges[Math.floor(Math.random() * edges.length)]
            if (e) p.e = e
          }
          const a = nodes[p.e[0]].position, b = nodes[p.e[1]].position
          pktPos[i * 3] = a.x + (b.x - a.x) * p.t
          pktPos[i * 3 + 1] = a.y + (b.y - a.y) * p.t
          pktPos[i * 3 + 2] = a.z + (b.z - a.z) * p.t
        }
        pktGeo.attributes.position.needsUpdate = true
        root.rotation.z = Math.sin(t * 0.1) * 0.04
        stars.rotation.y = t * 0.01
        lineMat.opacity = 0.12 + Math.abs(Math.sin(t * 0.8)) * 0.12
      }
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      camera.position.x += ((mouse.x * 6) - camera.position.x) * 0.04
      camera.rotation.y = -mouse.x * 0.18
      camera.rotation.x = mouse.y * 0.12
      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }
    frame()

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else frame()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      if (!coarse) window.removeEventListener('mousemove', onMouseMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="webgl" data-depth="0" aria-hidden="true" />
}
