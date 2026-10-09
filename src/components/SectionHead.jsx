export default function SectionHead({ no, kicker, title }) {
  return (
    <header className="section-head">
      <span className="section-no">{no}</span>
      <div className="section-titles">
        {kicker && <p className="kicker">{kicker}</p>}
        <h2>{title}</h2>
      </div>
    </header>
  );
}
