/** Eight-pointed star from Islamic geometric art. Used as a small decorative mark. */
export default function Star({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className ? `star ${className}` : 'star'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="5" y="5" width="14" height="14" />
      <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
    </svg>
  )
}