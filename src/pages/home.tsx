import { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { createPortal } from 'react-dom'

const logo = '/logo.png'
const card = '/card.jpeg'
const Neph = '/Neph.jpg'
const hyde = '/hyde.png'
const rescuebite = '/rescuebite.png'
const triplens = '/triplens.png'

type ThemeMode = 'dark' | 'light'

function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('xeno-theme') as ThemeMode | null
    const preferredLight = window.matchMedia('(prefers-color-scheme: light)').matches
    return stored ?? (preferredLight ? 'light' : 'dark')
  })
  const [covering, setCovering] = useState(false)
  const [nextTheme, setNextTheme] = useState<ThemeMode | null>(null)
  const [coverCircle, setCoverCircle] = useState<{ x: number; y: number; size: number } | null>(null)

  useEffect(() => {
    window.localStorage.setItem('xeno-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (!covering) return
    const flipTimer = window.setTimeout(() => {
      if (nextTheme) setTheme(nextTheme)
    }, 240)
    const stopTimer = window.setTimeout(() => {
      setCovering(false)
      setNextTheme(null)
    }, 700)

    return () => {
      window.clearTimeout(flipTimer)
      window.clearTimeout(stopTimer)
    }
  }, [covering, nextTheme])

  const toggleTheme = (anchor?: DOMRect | null) => {
    if (covering) return
    const targetTheme = theme === 'dark' ? 'light' : 'dark'
    setNextTheme(targetTheme)
    if (anchor) {
      const x = anchor.left + anchor.width / 2
      const y = anchor.top + anchor.height / 2
      const maxX = Math.max(x, window.innerWidth - x)
      const maxY = Math.max(y, window.innerHeight - y)
      const size = Math.sqrt(maxX * maxX + maxY * maxY) * 2
      setCoverCircle({ x, y, size })
    }
    setCovering(true)
  }

  return {
    theme,
    isLight: theme === 'light',
    toggleTheme,
    covering,
    nextTheme,
    coverCircle,
  }
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({})
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setStyle({
      transform: `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)',
      transition: 'transform 0.5s ease-out',
    })
  }, [])

  return (
    <div ref={ref} className={`card-3d ${className}`} style={style}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}


// ── Case Study Modal ──────────────────────────────────────────────────────────
const caseStudies = {
  rescuebite: {
    title: 'RescueBite',
    subtitle: 'AI-Powered Food Distribution',
    img: rescuebite,
    overview: 'RescueBite is an end-to-end intelligent logistics platform that connects surplus food sources — restaurants, supermarkets and catering companies — with distribution hubs and families in need. The core engine uses a machine learning model trained on historical donation patterns and demand signals to predict where food is needed most before it even becomes available.',
    challenge: 'Food banks and NGOs were operating entirely on phone calls and spreadsheets. Surplus food was expiring before it could be routed. Volunteers had no visibility into what was available or where to go. The matching problem was being solved manually, at scale, every single day.',
    solution: 'We built a real-time logistics layer on top of a predictive ML model. Donors log surplus via a simple mobile interface; the algorithm instantly matches each donation to the nearest high-demand hub, generates optimized pickup routes for volunteers and pushes notifications. A live ops dashboard gives coordinators full visibility.',
    stack: ['React', 'Node.js', 'Python (ML)', 'PostgreSQL', 'Google Maps API', 'Firebase', 'TensorFlow Lite'],
    highlights: [
      'ML model trained on 18 months of donation + demand data',
      'Sub-60-second matching from donation log to volunteer assignment',
      'Offline-capable mobile app for volunteers in low-connectivity areas',
      'Live ops dashboard with heatmap of active donations and demand zones',
    ],
  },
  triplens: {
    title: 'TripLens',
    subtitle: 'Trip Planner + Expense Tracker',
    img: triplens,
    overview: "TripLens is a unified travel companion that collapses the planning, navigation and financial tracking of a trip into one coherent experience. Whether you're a solo traveler budgeting across currencies or a group splitting costs across multiple people, TripLens keeps every moving part organized and visible.",
    challenge: "Travelers were juggling four or five apps simultaneously — a notes app for itineraries, a spreadsheet for expenses, a currency converter, a maps app and a group chat for splitting costs. Every handoff between tools introduced friction and errors. Nothing was connected.",
    solution: 'We designed TripLens around a single unified data model for a "trip" — one object that holds itinerary days, expense entries, group members, currency settings and map waypoints. Every feature operates on that shared model, so changing a date cascades correctly, expenses auto-convert and the map stays in sync.',
    stack: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'Mapbox', 'Open Exchange Rates API', 'Zustand'],
    highlights: [
      'Itinerary builder with drag-and-drop day planning and time estimates',
      'Group expense splitting with smart settle-up calculations',
      'Real-time currency conversion across 18+ currencies',
      'Interactive trip map with custom waypoints and offline tile caching',
    ],
  },
  cardiacsyncai: {
    title: 'Cardiac Sync AI',
    subtitle: 'AI-Driven Heart Health Platform',
    img: card,
    overview: 'A platform that uses AI to analyze cardiac data and provide personalized recommendations for heart health management. It includes predictive analytics, patient education and integration with electronic health records.',
    challenge: 'Cardiovascular disease is the leading cause of death globally, but early detection and management are often lacking. Patients lack access to personalized care and healthcare providers struggle with managing complex cases.',
    solution: 'We developed CardiacSync to leverage AI for early detection and personalized treatment plans. The platform integrates with existing EHR systems, providing healthcare providers with actionable insights and enabling patients to actively participate in their care.',
    stack: ['React', 'Node.js', 'Python (ML)', 'PostgreSQL', 'TensorFlow', 'D3.js'],
    highlights: [
      'AI-powered predictive analytics for early heart disease detection',
      'Personalized treatment recommendations based on patient data',
      'Integration with electronic health records for seamless data flow',
      'Patient education portal with interactive content and resources',
    ],
  },
  nephronx: {
    title: 'NephronX',
    subtitle: 'AI-Driven Kidney Health Platform',
    img: Neph,
    overview: 'A platform that uses AI to analyze patient data and provide personalized recommendations for kidney health management. It includes predictive analytics, patient education and integration with electronic health records.',
    challenge: 'Chronic kidney disease affects millions of people worldwide, but early detection and management are often lacking. Patients lack access to personalized care and healthcare providers struggle with managing complex cases.',
    solution: 'We developed NephronX to leverage AI for early detection and personalized treatment plans. The platform integrates with existing EHR systems, providing healthcare providers with actionable insights and enabling patients to actively participate in their care.',
    stack: ['React', 'Node.js', 'Python (ML)', 'PostgreSQL', 'TensorFlow', 'D3.js'],
    highlights: [
      'AI-powered predictive analytics for early kidney disease detection',
      'Personalized treatment recommendations based on patient data',
      'Integration with electronic health records for seamless data flow',
      'Patient education portal with interactive content and resources',
    ],
  },
  hyderabadengineeringworks: {
      title: 'Hyderabad Engineering Works',
      subtitle: 'Industrial Engineering Website',
      img: hyde,
      overview: 'A modern corporate website designed for Hyderabad Engineering Works to showcase its engineering expertise, fabrication services and industrial capabilities. Built with a responsive design, intuitive navigation and a professional visual identity to strengthen the company’s digital presence and generate business inquiries.',
      challenge: 'Hyderabad Engineering Works needed a professional online presence to attract new clients and showcase their engineering capabilities. The existing website was outdated, lacked responsiveness and did not effectively communicate the company’s services.',
      solution: 'We designed and developed a modern, responsive website that highlights Hyderabad Engineering Works’ services, projects and expertise. The website features an intuitive navigation structure, visually appealing design elements and clear calls-to-action to encourage potential clients to get in touch.',
      stack: ['React', 'Responsive Design', 'Corporate Website', 'SEO'],
      highlights: [
        'Responsive design for optimal viewing on all devices',
        'Showcase of engineering expertise and fabrication services',
        'Professional visual identity to strengthen digital presence',
        'SEO optimization to improve search engine visibility and attract new clients',
      ],
    
    }
}

function CaseStudyModal({ id, onClose }: { id: keyof typeof caseStudies; onClose: () => void }) {
  const study = caseStudies[id]
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 sm:p-8"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl"
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.12)',
          animation: 'slide-up 0.3s ease forwards',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative h-40 sm:h-52 md:h-64 overflow-hidden rounded-t-2xl">
          <img
            src={study.img}
            alt={study.title}
            className="w-full h-full object-contain"
            style={{ background: '#0a0a0a', filter: 'grayscale(100%) contrast(1.1)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(10,10,10,1) 100%)' }} />
          <div className="absolute bottom-6 left-8">
            <p className="font-mono text-xs tracking-widest mb-1" style={{ color: '#666' }}>
              {study.subtitle.toUpperCase()}
            </p>
            <h2 className="font-display font-black text-4xl text-white">{study.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
          {/* Overview */}
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-3" style={{ color: '#ffffff' }}>OVERVIEW</h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: '#ccc' }}>{study.overview}</p>
          </div>

          <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Challenge + Solution */}
          <div className="grid
grid-cols-1
lg:grid-cols-2 gap-6 sm:p-8">
            <div>
              <h3 className="font-mono text-xs tracking-widest mb-3" style={{ color: '#ffffff' }}>THE CHALLENGE</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#ccc' }}>{study.challenge}</p>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-widest mb-3" style={{ color: '#ffffff' }}>THE SOLUTION</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#ccc' }}>{study.solution}</p>
            </div>
          </div>

          <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Highlights */}
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>KEY HIGHLIGHTS</h3>
            <ul className="space-y-3">
              {study.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" style={{ opacity: 0.5 }} />
                  <span className="font-body text-sm leading-relaxed" style={{ color: '#ccc' }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Stack */}
          <div>
            <h3 className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>TECH STACK</h3>
            <div className="flex flex-wrap gap-2">
              {study.stack.map(t => (
                <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-full text-white"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${7 + Math.random() * 8}s`,
    size: `${1.5 + Math.random() * 2.5}px`,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full"
          style={{
            left: p.left, bottom: '-10px',
            width: p.size, height: p.size,
            background: '#ffffff',
            opacity: 0.25,
            animation: `particle ${p.duration} ${p.delay} ease-in infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({
  theme,
  toggleTheme,
  navRef,
}: {
  theme: ThemeMode
  toggleTheme: (anchor?: DOMRect | null) => void
  navRef: React.RefObject<HTMLElement | null>
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { label: 'Services', href: '#services', type: 'anchor' as const },
    { label: 'Work', href: '#work', type: 'anchor' as const },
    { label: 'About', href: '#about', type: 'anchor' as const },
    { label: 'Contact', href: '#contact', type: 'anchor' as const },
    { label: 'Privacy Policy', href: '/privacy-policy', type: 'route' as const },
    { label: 'Terms & Conditions', href: '/terms', type: 'route' as const },
    {label: 'GM Message', href: '/gm-message', type: 'route' as const},
  ]
  return (
    <nav
  ref={navRef}
  className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
    scrolled
      ? '-translate-y-full opacity-0 pointer-events-none'
      : 'translate-y-0 opacity-100'
  }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Xenosys Solutions"
            className="block h-auto w-30 sm:w-37.5 md:w-50 max-w-full select-none"
            draggable={true}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-10">
          {links.map(link => (
            link.type === 'anchor' ? (
              <a key={link.label} href={link.href}
                className="font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{ color: '#888' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href}
                className="font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{ color: '#888' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                {link.label}
              </Link>
            )
          ))}
          <a href="#contact"
            className="btn-primary px-6 py-2.5 rounded-full font-display font-black text-sm text-black">
            <span>Get Started</span>
          </a>
          <button
            type="button"
            onClick={e => toggleTheme(e.currentTarget.getBoundingClientRect())}
            className="grid h-11 w-11 place-items-center rounded-full transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M12 3v2.25M12 18.75V21M4.93 4.93l1.59 1.59M17.48 17.48l1.59 1.59M3 12h2.25M18.75 12H21M4.93 19.07l1.59-1.59M17.48 6.52l1.59-1.59" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M20 13.1A7.8 7.8 0 1 1 10.9 4a6.2 6.2 0 1 0 9.1 9.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={e => toggleTheme(e.currentTarget.getBoundingClientRect())}
            className="grid h-10 w-10 place-items-center rounded-full transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M12 3v2.25M12 18.75V21M4.93 4.93l1.59 1.59M17.48 17.48l1.59 1.59M3 12h2.25M18.75 12H21M4.93 19.07l1.59-1.59M17.48 6.52l1.59-1.59" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M20 13.1A7.8 7.8 0 1 1 10.9 4a6.2 6.2 0 1 0 9.1 9.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <button className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map(i => (
              <span key={i} className="block w-6 h-0.5 bg-white transition-all duration-300"
                style={{
                  transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,4px)' :
                    menuOpen && i === 1 ? 'scaleX(0)' :
                    menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
                }} />
            ))}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden glass absolute inset-x-0 top-full px-6 py-6 flex flex-col gap-5">
          {links.map(link => (
            link.type === 'anchor' ? (
              <a key={link.label} href={link.href}
                className="font-display font-bold text-lg text-white"
                onClick={() => setMenuOpen(false)}>{link.label}</a>
            ) : (
              <Link key={link.label} to={link.href}
                className="font-display font-bold text-lg text-white"
                onClick={() => setMenuOpen(false)}>{link.label}</Link>
            )
          ))}
        </div>
      )}
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    })
  }, [])

  return (
    <section
  id="hero"
  ref={containerRef}
  onMouseMove={handleMouseMove}
  className="
    relative
    min-h-screen
    flex
    items-center
    justify-center
    overflow-hidden
    px-4
    sm:px-6
    pb-24
    sm:pb-28
    lg:pb-20
  "
  style={{ background: '#000', paddingTop: 'calc(var(--nav-h, 140px) + 2.5rem)' }}
>

      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        transform: `perspective(1000px) rotateX(${mouse.y * -6}deg) rotateY(${mouse.x * 6}deg)`,
        transition: 'transform 0.3s ease-out',
      }} />

      {/* Orbital rings — white */}
      <div className="absolute z-0" style={{
        width: 'min(88vw, 560px)',
        height: 'min(88vw, 560px)',
        top: '50%', left: '50%',
        transform: `translate(-50%, -50%) rotateX(${58 + mouse.y * 8}deg) rotateY(${mouse.x * 18}deg)`,
        transition: 'transform 0.4s ease-out',
        transformStyle: 'preserve-3d',
        opacity: 0.9,
      }}>
        {[1, 0.7, 0.45].map((scale, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: `${100 * scale}%`, height: `${100 * scale}%`,
            top: `${(1 - scale) * 50}%`, left: `${(1 - scale) * 50}%`,
            border: `1px solid rgba(255,255,255,${0.18 - i * 0.04})`,
            animation: `${i % 2 === 0 ? 'spin-slow' : 'spin-reverse'} ${20 + i * 5}s linear infinite`,
          }}>
            <div className="absolute w-2.5 h-2.5 rounded-full bg-white" style={{
              top: '-5px', left: '50%', transform: 'translateX(-50%)',
              boxShadow: '0 0 12px rgba(255,255,255,0.8)',
            }} />
          </div>
        ))}
        
      </div>

      {/* Hero text */}
    <div className="
  relative z-20
  w-full
  max-w-5xl
  mx-auto
  px-2
  sm:px-6
  lg:px-8
  text-center
">
        <h1
          className="font-display font-black tracking-tight text-white leading-none"
          style={{
            fontSize: 'clamp(2.4rem, 10vw, 8rem)',
            animation: 'slide-up 0.9s ease forwards',
          }}
        >
          <div>We Build</div>
          <div>Digital Futures</div>
        </h1>

        <p className="font-body text-sm sm:text-lg w-full max-w-2xl mx-auto mt-5 sm:mt-8 mb-7 sm:mb-10 leading-relaxed px-2 sm:px-0"
          style={{ color: '#888', animation: 'slide-up 1s ease forwards' }}>
          We engineer high-performance websites that load fast, architect bulletproof hosting and surgical debugging.We turn your complex business needs into simple and elegant digital solution.
        </p>

        <div className="flex
flex-col
sm:flex-row
items-stretch
sm:items-center
justify-center
gap-4
w-full
sm:w-auto"
          style={{ animation: 'slide-up 1.1s ease forwards' }}>
          <a href="#work"
            className="btn-primary px-8 py-4 rounded-full font-display font-black text-base text-black text-center">
            <span>View Our Work</span>
          </a>
          <a href="#contact"
            className="font-display font-black px-8 py-4 rounded-full text-base text-white transition-all duration-300 text-center"
            style={{ border: '2px solid rgba(255,255,255,0.3)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#fff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.background = 'transparent'
            }}>
            Start a Project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 mt-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-xs tracking-widest" style={{ color: '#ffffff' }}>SCROLL</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="absolute inset-x-0 top-0 h-6"
            style={{ background: 'linear-gradient(to bottom, white, transparent)', animation: 'particle 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}


// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="8" width="40" height="28" rx="4" stroke="white" strokeWidth="2" />
        <path d="M16 44h16M24 36v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 20l6 6-6 6M26 26h8" stroke="#888" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: '01',
    title: 'Website Development',
    desc: 'From concept to production — we architect blazing-fast, pixel-perfect websites using modern stacks. React, Next.js, TypeScript. No templates but pure craft.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <ellipse cx="24" cy="16" rx="18" ry="8" stroke="white" strokeWidth="2" />
        <path d="M6 16v8c0 4.418 8.059 8 18 8s18-3.582 18-8v-8" stroke="white" strokeWidth="2" />
        <path d="M6 24v8c0 4.418 8.059 8 18 8s18-3.582 18-8v-8" stroke="#888" strokeWidth="2" />
        <circle cx="24" cy="16" r="3" fill="white" />
      </svg>
    ),
    label: '02',
    title: 'Web Hosting',
    desc: '99.9% uptime SLA, edge-optimized delivery, auto-scaling infrastructure and SSL-secured domains. Your website stays fast always.',
    tech: ['CDN', 'SSL/TLS', 'Auto-Scale', '99.9% SLA'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2" />
        <path d="M16 24l5 5 11-10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 10l4-4M10 38l-4 4M38 38l4 4M10 10l-4-4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="38" cy="10" r="2" fill="white" />
        <circle cx="10" cy="38" r="2" fill="white" />
      </svg>
    ),
    label: '03',
    title: 'Debugging & QA',
    desc: 'Deep-dive diagnostics on broken codebases, performance bottlenecks and race conditions. We trace, isolate and eliminate bugs.',
    tech: ['Profiling', 'Tracing', 'Load Tests', 'Root Cause'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="22" cy="22" r="13" stroke="white" strokeWidth="2" />
        <path d="M31 31l9 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 22h14M22 15v14" stroke="#888" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: '04',
    title: 'Google SEO',
    desc: 'Search-focused optimization to improve your website visibility, rankings and organic traffic on Google.',
    tech: ['On-Page SEO', 'Technical SEO', 'Keywords', 'Analytics'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="7" y="9" width="34" height="30" rx="3" stroke="white" strokeWidth="2" />
        <path d="M7 18h34M15 25h7M15 31h12M30 25h5M30 31h5" stroke="#888" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: '05',
    title: 'Customised ERP',
    desc: 'Business-specific ERP systems designed to streamline operations, automate workflows and centralize your data.',
    tech: ['ERP Systems', 'Automation', 'Dashboards', 'Integrations'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 34l9-9 7 6 16-17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31 14h9v9" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 40h32" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: '06',
    title: 'Digital Marketing',
    desc: 'Data-driven digital marketing strategies that build your online presence, reach the right audience and generate leads.',
    tech: ['Social Media', 'Campaigns', 'Content', 'Analytics'],
  },
]

function Services() {
  const ref = useReveal()
  return (
    <section id="services" className="py-16
sm:py-20
lg:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-reveal mb-20">
          <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>
            WHAT WE DO
          </p>
          <h2 className="font-display font-black text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl text-white leading-none">
            Our<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Services</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} className="section-reveal" style={{ transitionDelay: `${index * 0.12}s` }}>
      <TiltCard>
        <div
          className="relative rounded-2xl p-6 sm:p-8 h-full transition-all duration-400 overflow-hidden"
          style={{
            background: hovered ? '#111' : '#0a0a0a',
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="font-mono text-xs absolute top-6 right-6"
            style={{ color: hovered ? '#fff' : '#9ca3af' }}>
            {svc.label}
          </span>
          <div className="mb-6">{svc.icon}</div>
          <h3 className="font-display font-black text-xl sm:text-2xl mb-3 text-white">{svc.title}</h3>
          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: '#888' }}>{svc.desc}</p>
          <div className="flex flex-wrap gap-2">
            {svc.tech.map(t => (
              <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                  color: hovered ? '#fff' : '#888',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  )
}

// ── Work ──────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'rescuebite',
    title: 'RescueBite',
    subtitle: 'AI-Powered Food Distribution',
    desc: 'An intelligent platform that uses machine learning to route surplus food from restaurants and supermarkets to communities in need — reducing waste and hunger simultaneously. Real-time logistics, predictive demand modeling and a volunteer coordination layer.',
    tags: ['AI/ML', 'React', 'Node.js', 'Maps API', 'Real-time'],
    img: rescuebite,
  },
  {
    id: 'triplens',
    title: 'TripLens',
    subtitle: 'Trip Planner + Expense Tracker',
    desc: 'A unified travel companion that lets users plan itineraries, split expenses with groups, track spending by category and visualize their journey on an interactive map. Smart currency conversion and offline-first architecture.',
    tags: ['React Native', 'TypeScript', 'Maps', 'Finance API', 'PWA'],
    img: triplens,
  },
  {
    id: 'cardiacsyncai',
    title: 'Cardiac Sync AI',
    subtitle: 'AI-Powered Cardiac Monitoring',
    desc:' A healthcare platform that leverages AI to monitor cardiac patients in real-time by analyzing ECG data to detect arrhythmias and other anomalies it also provides alerts to healthcare providers and integrates with wearable devices for continuous monitoring.',
    tags: ['AI/ML', 'Healthcare', 'Real-time Monitoring', 'Wearables'],
    img:card,
  },
  {
    id:'nephronx',
    title:'NephronX',
    subtitle:'AI-Driven Kidney Health Platform',
    desc:'A platform that uses AI to analyze patient data and provide personalized recommendations for kidney health management. It includes predictive analytics, patient education and integrates with electronic health records.',
    tags:['AI/ML', 'Healthcare', 'Predictive Analytics', 'Patient Management'],
    img:Neph,
  },
  {
    id: 'hyderabadengineeringworks',
    title: 'Hyderabad Engineering Works',
    subtitle: 'Industrial Engineering Website',
    desc: 'A modern corporate website designed for Hyderabad  Engineering Works to showcase its engineering expertise,   fabrication services and industrial capabilities. Built with a responsive design, intuitive navigation and a professional  visual identity to strengthen the company’s digital presence as well as generate business inquiries.',
    tags: ['React', 'Responsive Design', 'Corporate Website', 'SEO'],
    img: hyde,
  }
]

function Work() {
  const ref = useReveal()
  const [activeStudy, setActiveStudy] = useState<keyof typeof caseStudies | null>(null)
  const closeCaseStudy = useCallback(() => setActiveStudy(null), [])
  return (
    <section id="work" className="py-16
sm:py-20
lg:py-32 px-4 sm:px-6">
      {activeStudy && <CaseStudyModal id={activeStudy} onClose={closeCaseStudy} />}
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="section-reveal mb-20">
          <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>
            SELECTED WORK
          </p>
          <h2 className="font-display font-black text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl text-white leading-none">
            Built to<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Matter</span>
          </h2>
        </div>
        <div className="flex flex-col gap-28">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} flip={i % 2 === 1}
              onCaseStudy={() => setActiveStudy(proj.id as keyof typeof caseStudies)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ proj, flip, onCaseStudy }: { proj: typeof projects[0]; flip: boolean; onCaseStudy: () => void }) {
  const ref = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} className="section-reveal">
      <div className={`grid
grid-cols-1
lg:grid-cols-2 gap-14 items-center ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <TiltCard>
          <div className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow: hovered ? '0 30px 80px rgba(255,255,255,0.12)' : '0 10px 40px rgba(0,0,0,0.8)',
              transition: 'box-shadow 0.5s ease',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <img src={proj.img} alt={proj.title}
              className="w-full h-56
sm:h-72
md:h-80
lg:h-96 object-contain transition-transform duration-700"
              style={{
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                filter: 'grayscale(100%) contrast(1.1)',
              }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }} />
            {/* Browser chrome */}
            <div className="absolute top-0 inset-x-0 h-9 flex items-center gap-2 px-4"
              style={{ background: 'rgba(0,0,0,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['#ffffff', '#777', '#999'].map((c, j) => (
                <div key={j} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
              <div className="ml-2 flex-1 h-5 rounded-full px-3 flex items-center"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <span className="font-mono text-xs" style={{ color: '#666' }}>
                  xenosolutions.dev/{proj.id}
                </span>
              </div>
            </div>
          </div>
        </TiltCard>

        <div className="space-y-6">
          <div>
            <p className="font-mono text-xs tracking-widest mb-3" style={{ color: '#ffffff' }}>
              {proj.subtitle.toUpperCase()}
            </p>
            <h3 className="font-display font-black text-4xl
sm:text-5xl
lg:text-6xl mb-5 leading-tight text-white">
              {proj.title}
            </h3>
            <p className="font-body text-base leading-relaxed" style={{ color: '#888' }}>
              {proj.desc}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {proj.tags.map(tag => (
              <span key={tag} className="font-mono text-xs px-3 py-1.5 rounded-full text-white"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={onCaseStudy}
            className="inline-flex items-center font-display font-black text-sm text-white transition-all duration-300"
            style={{ gap: '8px' }}
            onMouseEnter={e => (e.currentTarget.style.gap = '14px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '8px')}>
            View Case Study
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Process ───────────────────────────────────────────────────────────────────
const process = [
  { num: '01', title: 'Discovery', desc: 'We map your goals, audience and constraints. No assumptions.' },
  { num: '02', title: 'Design', desc: 'Wireframes to high-fidelity prototypes — reviewed together before a line of code.' },
  { num: '03', title: 'Build', desc: 'Modular, tested, documented code shipped in iterative sprints.' },
  { num: '04', title: 'Launch', desc: 'Staged deployment, performance audit and post-launch monitoring.' },
]

function Process() {
  const ref = useReveal()
  return (
    <section className="py-16
sm:py-20
lg:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="section-reveal mb-20">
          <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>HOW WE WORK</p>
          <h2 className="font-display font-black text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl text-white leading-none">
            The<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Process</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {process.map((step, i) => <ProcessStep key={i} step={step} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index }: { step: typeof process[0]; index: number }) {
  const ref = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} className="section-reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
      <TiltCard>
        <div className="relative rounded-2xl p-6 transition-all duration-300"
          style={{
            background: hovered ? '#111' : '#0a0a0a',
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          <div className="font-display font-black text-5xl mb-4"
            style={{ color: hovered ? '#fff' : '#222' }}>
            {step.num}
          </div>
          <h4 className="font-display font-black text-lg mb-2 text-white">{step.title}</h4>
          <p className="font-body text-sm leading-relaxed" style={{ color: '#888' }}>{step.desc}</p>
          {index < 3 && (
            <div className="hidden md:block absolute top-1/2 -right-3 text-white text-sm"
              style={{ transform: 'translateY(-50%)', opacity: 0.3 }}>→</div>
          )}
        </div>
      </TiltCard>
    </div>
  )
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const ref = useReveal()
  return (
    <section id="about" className="py-16
sm:py-20
lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-white opacity-10" />
      <div className="max-w-7xl mx-auto grid
grid-cols-1
lg:grid-cols-2
gap-10
lg:gap-16 md:gap-16 items-center">
        <div ref={ref} className="section-reveal">
          <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>ABOUT XENOSYS SOLUTIONS</p>
          <h2 className="font-display font-black text-4xl
sm:text-5xl
lg:text-6xl mb-6 leading-tight text-white">
            Small Team.<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Big Impact.</span>
          </h2>
          <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#888' }}>
            Xenosys Solutions is an IT services provider built on the belief that exceptional software
            should be accessible — not just to enterprises with massive budgets, but also to founders,
            nonprofits and ambitious teams building things that matter.
          </p>
          <p className="font-body text-base leading-relaxed mb-8" style={{ color: '#888' }}>
            We move fast, write clean code and stay obsessively focused on outcomes. Every project
            gets our full attention, not a junior developer on autopilot.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Fast Delivery', 'Clean Code', 'Full Ownership', 'Post-Launch Support'].map(tag => (
              <span key={tag} className="font-mono text-xs px-3 py-1.5 rounded-full text-white"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Geometric visual */}
        <div className="relative flex items-center justify-center h-64 sm:h-80 md:h-96">
          <div className="absolute w-52 h-52 sm:w-64 sm:h-64 animate-spin-slow rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 animate-spin-reverse"
            style={{
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.02)',
            }} />
          <div className="absolute w-52 h-52 sm:w-64 sm:h-64 animate-spin-slow"
            style={{
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }} />
          <div className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center animate-morph"
            style={{ background: '#fff', boxShadow: '0 0 60px rgba(255,255,255,0.25)' }}>
            <span className="font-display font-black text-5xl text-black">X</span>
          </div>
          {[
            { text: 'TypeScript', pos: { top: '8%', left: '2%' } },
            { text: 'React', pos: { top: '8%', right: '2%' } },
            { text: 'Node.js', pos: { bottom: '8%', left: '5%' } },
            { text: 'AWS', pos: { bottom: '8%', right: '5%' } },
          ].map((item, i) => (
            <div key={i} className="absolute glass rounded-full px-3 py-1.5 animate-float"
              style={{ ...item.pos, animationDelay: `${i * 0.5}s` }}>
              <span className="font-mono text-xs text-white">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal()
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        email: form.email,
        project: form.project,
        message: form.message,
      },

      {publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY}
    );

    setSent(true);

    setForm({
      name: "",
      email: "",
      project: "",
      message: "",
    });

    setTimeout(() => setSent(false), 4000);
  } catch (error) {
  console.error("EMAILJS ERROR:", error);
  alert(`Email failed: ${JSON.stringify(error)}`);
}
};

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    fontFamily: 'Outfit, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="contact" className="py-16
sm:py-20
lg:py-32 px-4 sm:px-6 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-white opacity-10" />
      <div className="max-w-5xl mx-auto relative">
        <div ref={ref} className="section-reveal mb-16">
          <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#ffffff' }}>
            LET'S WORK TOGETHER
          </p>
          <h2 className="font-display font-black text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl text-white leading-none mb-4">
            Start a<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Project</span>
          </h2>
          <p className="font-body text-base" style={{ color: '#888' }}>
            Tell us what you're building. We'll respond within 24 hours.
          </p>
        </div>

        {/* Department Contacts */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {[
            { title: 'General Enquiries', email: 'Info@xenosysweb.com' },
            { title: 'Sales Dept', email: 'sales@xenosysweb.com' },
            { title: 'Careers & HR Dept', email: 'hr@xenosysweb.com' },
            { title: 'Accounts & Finance Dept', email: 'Finance@xenosysweb.com' },
            { title: 'Purchase & Procurement Dept', email: 'Procurement@xenosysweb.com' },
            { title: 'Branding & Marketing Dept', email: 'Marketing@xenosysweb.com' },
          ].map((dept) => (
            <div
              key={dept.email}
              className="rounded-2xl p-5 sm:p-6 transition-all duration-300"
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p
                className="font-mono text-[11px] tracking-widest mb-3"
                style={{ color: '#888' }}
              >
                {dept.title.toUpperCase()}
              </p>
              <a
                href={`mailto:${dept.email}`}
                className="font-display font-bold text-sm sm:text-base text-white break-all transition-opacity duration-200"
                style={{ opacity: 0.9 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.9')}
              >
                {dept.email}
              </a>
            </div>
          ))}
        </div>

        <TiltCard>
          <div className="rounded-3xl p-6 sm:p-5
lg:p-12"
            style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }}>
            {sent ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-white animate-morph">
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                    <path d="M5 13l4 4L19 7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display font-black text-3xl mb-2 text-white">Message Sent!</h3>
                <p className="font-body" style={{ color: '#888' }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="font-mono text-xs tracking-wider block mb-2" style={{ color: '#ffffff' }}>NAME</label>
                    <input style={inputStyle} placeholder="Alex Chen"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                      required />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-wider block mb-2" style={{ color: '#ffffff' }}>EMAIL</label>
                    <input type="email" style={inputStyle} placeholder="alex@company.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                      required />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs tracking-wider block mb-2" style={{ color: '#ffffff' }}>PROJECT TYPE</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }}
                    value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                    required>
                    <option value="" style={{ background: '#0a0a0a' }}>Select a service</option>
                    <option value="web-dev" style={{ background: '#0a0a0a' }}>Website Development</option>
                    <option value="hosting" style={{ background: '#0a0a0a' }}>Web Hosting</option>
                    <option value="debug" style={{ background: '#0a0a0a' }}>Debugging & QA</option>
                    <option value="all" style={{ background: '#0a0a0a' }}>Full Package</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs tracking-wider block mb-2" style={{ color: '#ffffff' }}>MESSAGE</label>
                  <textarea style={{ ...inputStyle, resize: 'none', minHeight: 140 }}
                    placeholder="Tell us about your project, timeline and goals..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                    required />
                </div>
                <button type="submit"
                  className="btn-primary w-full py-4 rounded-xl font-display font-black text-base text-black">
                  <span>Send Message →</span>
                </button>
              </form>
            )}
          </div>
        </TiltCard>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ isLight }: { isLight: boolean }) {
  const links = [
    { label: 'Services', href: '#services', type: 'anchor' as const },
    { label: 'Work', href: '#work', type: 'anchor' as const },
    { label: 'About', href: '#about', type: 'anchor' as const },
    { label: 'Contact', href: '#contact', type: 'anchor' as const },
    { label: 'Privacy Policy', href: '/privacy-policy', type: 'route' as const },
    { label: 'Terms & Conditions', href: '/terms', type: 'route' as const },
    {label: 'GM Message', href: '/gm-message', type: 'route' as const},
  ]
  return (
    <footer
  className="py-12 px-4 sm:px-6"
  style={{
    background: "#000",
    color: "#fff",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  }}
>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid gap-6 sm:p-8 md:grid-cols-[1.25fr_0.95fr] md:items-start">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold" style={{ color: '#ffffff' }}>Xenosys Solutions © 2026</span>
            </div>
            <p className="font-mono text-xs tracking-wider" style={{ color: '#9ca3af' }}>crafted with precision</p>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-xs tracking-widest" style={{ color: '#ffffff' }}>CONTACT INFORMATION</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] tracking-wider mb-1" style={{ color: '#9ca3af' }}>PHONE & WHATSAPP</p>
                <a
                  href="https://wa.me/97470643918?text=Hello%20Xenosys Solutions%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="font-display font-bold text-sm transition-colors duration-200"
                  style={{ color: '#ffffff' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
                >
                  +974 70643918
                </a>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-wider mb-1" style={{ color: '#9ca3af' }}>EMAIL</p>
                <a
                  href="mailto:Info@xenosys.web"
                  className="font-display font-bold text-sm transition-colors duration-200"
                  style={{ color: '#ffffff' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
                >
                  Info@xenosys.web
                </a>
              </div>
              <div className="sm:col-span-2">
                <p className="font-mono text-[11px] tracking-wider mb-1" style={{ color: '#9ca3af' }}>OFFICE LOCATION</p>
                <p className="font-display font-bold text-sm" style={{ color: '#ffffff' }}>ICONO VIEW,Building 44 ,C Ring Road,<br></br>Doha, Qatar</p>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="font-mono text-[11px] tracking-widest mb-4" style={{ color: '#9ca3af' }}>
                DEPARTMENT CONTACTS
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'General Enquiries', email: 'Info@xenosysweb.com' },
                  { title: 'Sales Dept', email: 'sales@xenosysweb.com' },
                  { title: 'Careers & HR Dept', email: 'hr@xenosysweb.com' },
                  { title: 'Accounts & Finance Dept', email: 'Finance@xenosysweb.com' },
                  { title: 'Purchase & Procurement Dept', email: 'Procurement@xenosysweb.com' },
                  { title: 'Branding & Marketing Dept', email: 'Marketing@xenosysweb.com' },
                ].map((dept) => (
                  <div key={dept.email}>
                    <p className="font-mono text-[10px] tracking-wider mb-1" style={{ color: '#666' }}>
                      {dept.title.toUpperCase()}
                    </p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="font-display font-bold text-sm text-white break-all transition-opacity duration-200"
                      style={{ opacity: 0.9 }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0.9')}
                    >
                      {dept.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="https://www.google.com/maps/place/ICONO+VIEW/@25.2638874,51.5240631,17z/data=!3m1!4b1!4m6!3m5!1s0x3e45c5c5ec656cc9:0xde06a1766420dbcb!8m2!3d25.2638874!4d51.526638!16s%2Fg%2F11jcqfc04c?entry=ttu"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center font-display font-black text-sm text-white transition-all duration-300"
              style={{ gap: '8px' }}
              onMouseEnter={e => (e.currentTarget.style.gap = '14px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
            >
              View on Google Maps
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10.75 3.75a.75.75 0 00-1.5 0v10.69l-3.22-3.22a.75.75 0 10-1.06 1.06l4.5 4.5a.75.75 0 001.06 0l4.5-4.5a.75.75 0 10-1.06-1.06l-3.22 3.22V3.75z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Office photo + Google Maps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 w-full">
              <div
                className="relative overflow-hidden rounded-2xl h-56 md:h-64"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a' }}
              >
                <img
                  src="/icono-view.jpeg"
                  alt="ICONO VIEW office location"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="relative overflow-hidden rounded-2xl h-56 md:h-64"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: '#0a0a0a',
                  filter: isLight ? 'invert(1) hue-rotate(180deg)' : 'none',
                }}
              >
                <iframe
                  title="ICONO VIEW location on Google Maps"
                  src="https://www.google.com/maps?q=25.2638874,51.526638&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 sm:p-8">
          {links.map(link => (
            link.type === 'anchor' ? (
              <a key={link.label} href={link.href}
                className="font-mono text-xs tracking-wider transition-colors duration-200"
                style={{ color: '#ffffff' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}>
                {link.label.toUpperCase()}
              </a>
            ) : (
              <Link
  key={link.label}
  to={link.href}
  className="font-mono text-xs tracking-wider transition-colors duration-200"
  style={{ color: '#ffffff' }}
  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
  onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
>
  {link.label.toUpperCase()}
</Link>
            )
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { theme, isLight, toggleTheme, covering, nextTheme, coverCircle } = useThemeMode()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const updateNavHeight = () => {
      document.documentElement.style.setProperty('--nav-h', `${el.offsetHeight}px`)
    }
    updateNavHeight()
    const ro = new ResizeObserver(updateNavHeight)
    ro.observe(el)
    window.addEventListener('resize', updateNavHeight)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', updateNavHeight)
    }
  }, [])

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        position: 'relative',
        filter: isLight ? 'invert(1) hue-rotate(180deg)' : 'none',
        transition: 'filter 260ms ease',
      }}
      data-theme={theme}
    >
      <div className="noise-overlay" />
      {covering && (
        <div
          className="theme-cover"
          data-theme={nextTheme ?? theme}
          style={coverCircle ? {
            left: coverCircle.x,
            top: coverCircle.y,
            width: coverCircle.size,
            height: coverCircle.size,
          } : undefined}
          aria-hidden="true"
        />
      )}
      <Particles />
      <Nav theme={theme} toggleTheme={toggleTheme} navRef={navRef} />
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <Contact />
      <Footer isLight={isLight} />
    </div>
  )
}
