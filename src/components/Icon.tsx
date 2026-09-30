// Small inline icons, so the site needs no icon library.
import type { ReactElement } from 'react'

export type IconName =
  | 'whatsapp' | 'phone' | 'mail' | 'pin' | 'globe' | 'web' | 'server' | 'wrench'
  | 'search' | 'pos' | 'megaphone' | 'external' | 'check' | 'store' | 'back' | 'menu' | 'close'
  | 'snowflake' | 'droplet' | 'bolt' | 'building' | 'shirt' | 'scissors' | 'smartphone' | 'car' | 'home' | 'rocket'

const PATHS: Record<IconName, ReactElement> = {
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.4-4.2A8.6 8.6 0 1 1 8 19.3z" />
      <path d="M9.2 8.6c.2-.5.6-.6 1-.6l1 2.1-.7.9c.6 1.2 1.5 2.1 2.6 2.7l.9-.7 2 1c0 .5-.2.9-.6 1.1-2.9 1.3-7-2.8-6.2-6.5z" />
    </>
  ),
  phone: (
    <path d="M21.5 16.6v2.9a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19.2 19.2 0 0 1-6-6A19.5 19.5 0 0 1 1.9 4.3 2 2 0 0 1 3.9 2.1h2.9a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.7a2 2 0 0 1-.4 2.1L7.8 9.8a15.6 15.6 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 1.8z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.1-7-11.6a7 7 0 0 1 14 0c0 5.5-7 11.6-7 11.6z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.6 3.9 5.8 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-5.8-3.9-9.5S9.4 5.1 12 2.5z" />
    </>
  ),
  web: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M2.5 9h19M6 6.5h.01M8.5 6.5h.01" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="3.5" width="18" height="7" rx="1.5" />
      <rect x="3" y="13.5" width="18" height="7" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  wrench: (
    <path d="M14.8 6.2a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.6-3.6a6 6 0 0 1-7.9 7.9l-6.8 6.8a2.1 2.1 0 0 1-3-3l6.8-6.8a6 6 0 0 1 7.9-7.9z" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20.5 20.5l-4.4-4.4" />
    </>
  ),
  pos: (
    <>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10.5v3a1 1 0 0 0 1 1h2.5L13 19V5L6.5 9.5H4a1 1 0 0 0-1 1z" />
      <path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  external: (
    <>
      <path d="M14 3.5h6.5V10M20.5 3.5L11 13" />
      <path d="M19 14v5.5a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1H10" />
    </>
  ),
  check: <path d="M4.5 12.5l4.8 4.8L19.5 7" />,
  store: (
    <>
      <path d="M3 9.5L4.8 4h14.4L21 9.5M4 9.5v10.5h16V9.5M3 9.5h18" />
      <path d="M9.5 20v-5.5h5V20" />
    </>
  ),
  back: <path d="M15 5l-7 7 7 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  snowflake: <path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.5 4l2.5 2 2.5-2M9.5 20l2.5-2 2.5 2" />,
  droplet: <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />,
  bolt: <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z" />,
  building: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="1" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 21v-4h4v4" />
    </>
  ),
  shirt: <path d="M8.5 3.5L3.5 6.5l2 4 2.5-1v11h8v-11l2.5 1 2-4-5-3a3.5 3.5 0 0 1-7 0z" />,
  scissors: (
    <>
      <circle cx="6" cy="7" r="2.6" />
      <circle cx="6" cy="17" r="2.6" />
      <path d="M8.2 8.4L20 18M8.2 15.6L20 6" />
    </>
  ),
  smartphone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 16.5V12l2-5.5h13l2 5.5v4.5z M3.5 12h17" />
      <circle cx="7.5" cy="16.5" r="1.8" />
      <circle cx="16.5" cy="16.5" r="1.8" />
    </>
  ),
  home: <path d="M3.5 11L12 4l8.5 7v9a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" />,
  rocket: (
    <>
      <path d="M12 2.5c3 2.2 4.8 5.8 4.8 9.8L15 15H9l-1.8-2.7C7.2 8.3 9 4.7 12 2.5z" />
      <path d="M9 15l-2.5 4 3.5-1M15 15l2.5 4-3.5-1" />
      <circle cx="12" cy="9" r="1.6" />
    </>
  ),
}

export default function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}