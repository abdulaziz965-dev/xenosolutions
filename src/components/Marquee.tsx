import Star from './Star'

/**
 * Slowly scrolling band of words, like the old site's services strip.
 * Decorative only (the same words are in the Services section), so screen readers skip it.
 * Pauses on hover.
 */
export default function Marquee({ items }: { items: string[] }) {
  const group = (copy: number) => (
    <div className="marquee-group" key={copy}>
      {items.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <Star size={14} />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {group(1)}
        {group(2)}
      </div>
    </div>
  )
}