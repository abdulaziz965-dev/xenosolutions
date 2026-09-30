import { useEffect, useRef } from 'react'

/*
  Rotating wireframe globe, inspired by the old site's three.js hero, drawn with plain canvas.
  - Outer shape: subdivided icosahedron (white lines). Inner shape: plain icosahedron (gold lines).
  - Follows the mouse slightly on desktop.
  - Stops animating when off screen or when the tab is hidden (saves battery).
  - Always animates, even when the visitor's device asks for reduced motion (site owner's choice).
*/

type Vec3 = [number, number, number]
type Shape = { verts: Vec3[]; edges: [number, number][] }

function normalise(v: Vec3): Vec3 {
  const length = Math.hypot(v[0], v[1], v[2])
  return [v[0] / length, v[1] / length, v[2] / length]
}

function icosahedron(subdivide: boolean): Shape {
  const t = (1 + Math.sqrt(5)) / 2
  const verts: Vec3[] = (
    [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
    ] as Vec3[]
  ).map(normalise)

  let faces: number[][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]

  if (subdivide) {
    const midpoints = new Map<string, number>()
    const midpoint = (a: number, b: number) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`
      const existing = midpoints.get(key)
      if (existing !== undefined) return existing
      const va = verts[a]
      const vb = verts[b]
      verts.push(normalise([(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2]))
      midpoints.set(key, verts.length - 1)
      return verts.length - 1
    }
    faces = faces.flatMap(([a, b, c]) => {
      const ab = midpoint(a, b)
      const bc = midpoint(b, c)
      const ca = midpoint(c, a)
      return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]]
    })
  }

  const seen = new Set<string>()
  const edges: [number, number][] = []
  for (const [a, b, c] of faces) {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      const key = p < q ? `${p}-${q}` : `${q}-${p}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([p, q])
      }
    }
  }
  return { verts, edges }
}

export default function WireframeGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const outer = icosahedron(true)
    const inner = icosahedron(false)
    const finePointer = window.matchMedia('(pointer: fine)').matches

    let width = 0
    let height = 0
    let frame = 0
    let onScreen = true
    let spinY = 0.6
    let spinX = 0.3
    let tiltX = 0
    let tiltY = 0
    let targetX = 0
    let targetY = 0

    function drawShape(shape: Shape, radius: number, rgb: string, baseAlpha: number, rotY: number, rotX: number) {
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const size = (Math.min(width, height) / 2) * radius
      const camera = 3.2

      const points = shape.verts.map(([x, y, z]) => {
        const x1 = x * cosY + z * sinY
        const z1 = -x * sinY + z * cosY
        const y1 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX
        const scale = camera / (camera - z2)
        return { x: width / 2 + x1 * size * scale, y: height / 2 - y1 * size * scale, depth: (z2 + 1) / 2 }
      })

      ctx!.lineWidth = 1
      for (const [a, b] of shape.edges) {
        const pa = points[a]
        const pb = points[b]
        const alpha = baseAlpha * (0.3 + 0.7 * ((pa.depth + pb.depth) / 2)) // nearer edges are brighter
        ctx!.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`
        ctx!.beginPath()
        ctx!.moveTo(pa.x, pa.y)
        ctx!.lineTo(pb.x, pb.y)
        ctx!.stroke()
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      drawShape(outer, 0.9, '255, 255, 255', 0.55, spinY + tiltX, spinX + tiltY)
      drawShape(inner, 0.5, '201, 164, 92', 0.85, -spinY * 0.8 + tiltX, spinX * 1.4 + tiltY)
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const box = canvas!.getBoundingClientRect()
      width = box.width
      height = box.height
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw()
    }

    function tick() {
      if (!onScreen || document.hidden) {
        frame = 0
        return
      }
      spinY += 0.0035
      spinX += 0.0012
      tiltX += (targetX - tiltX) * 0.04
      tiltY += (targetY - tiltY) * 0.04
      draw()
      frame = requestAnimationFrame(tick)
    }

    function start() {
      if (!frame && onScreen && !document.hidden) frame = requestAnimationFrame(tick)
    }

    function onPointerMove(event: PointerEvent) {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.6
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.4
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      start()
    })
    visibilityObserver.observe(canvas)

    document.addEventListener('visibilitychange', start)
    if (finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true })

    resize()
    start()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', start)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}