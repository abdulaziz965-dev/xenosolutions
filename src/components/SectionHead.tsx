export default function SectionHead({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}