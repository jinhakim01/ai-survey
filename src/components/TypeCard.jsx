import { TYPES, TYPE_ORDER } from '../lib/survey.js';

const pct = (c, total) => (total ? Math.round((c / total) * 100) : 0);

export default function TypeCard({ type, typeCounts, total }) {
  const t = TYPES[type];
  const same = pct(typeCounts[type], total);
  return (
    <section className="typecard" aria-labelledby="type-name">
      <p className="kicker">나의 AI 활용 유형</p>
      <h3 id="type-name" className="type-name">{t.name}</h3>
      <p className="type-axis">{t.axis}</p>
      <p className="type-summary">{t.summary}</p>
      <ul className="type-traits">
        {t.traits.map((x) => <li key={x}>{x}</li>)}
      </ul>
      <p className="type-share">
        나와 같은 유형 <strong>{same}%</strong>
        <span className="muted"> · 전체 {total}명 중 {typeCounts[type]}명</span>
      </p>
      <TypeDistribution typeCounts={typeCounts} total={total} highlight={type} />
    </section>
  );
}

export function TypeDistribution({ typeCounts, total, highlight }) {
  return (
    <div className="type-dist">
      {TYPE_ORDER.map((k) => {
        const p = pct(typeCounts[k], total);
        return (
          <div key={k} className={`bar-row ${k === highlight ? 'tone-accent is-mine' : 'tone-gray'}`}>
            <span className="bar-label">{TYPES[k].name}</span>
            <span className="bar-track">
              <span className="bar-fill" style={{ '--p': p / 100 }} />
              <span className="bar-value" style={{ '--p': p / 100 }}>{p}%</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
