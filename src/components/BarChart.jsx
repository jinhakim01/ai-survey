import { MAJORS, MIN_N, majorLabel } from '../lib/survey.js';
import { formatDiff } from '../lib/stats.js';

// 1~5 척도를 0~1 위치로
const pos = (v) => (v == null ? 0 : (v - 1) / 4);

function Row({ label, value, n, tone, emphasis }) {
  const thin = n != null && n < MIN_N;
  return (
    <div className={`bar-row tone-${tone}${thin ? ' is-thin' : ''}${emphasis ? ' is-mine' : ''}`}>
      <span className="bar-label">{label}</span>
      <span className="bar-track">
        <span className="bar-fill" style={{ '--p': thin ? 0 : pos(value) }} />
        <span className="bar-value" style={{ '--p': thin ? 0 : pos(value) }}>
          {thin ? `표본 부족 n=${n}` : value == null ? '–' : value.toFixed(1)}
        </span>
      </span>
    </div>
  );
}

export default function BarChart({ index, question, stat, mine }) {
  const myValue = mine?.[question.key];
  return (
    <article className="qblock">
      <h3 className="qblock-title">
        <span className="q-no">Q{index + 1}</span>
        {question.text}
        <span className="aspect">{question.aspect}</span>
      </h3>

      <div className="chart">
        <span className="chart-mid" aria-hidden="true" />
        {myValue != null && (
          <span className="chart-me" style={{ '--p': pos(myValue) }} aria-hidden="true">
            <span className="chart-me-label">나 {myValue}</span>
          </span>
        )}
        <Row label="전체" value={stat.overall} tone="accent" />
        {MAJORS.map((m) => {
          const g = stat.groups.find((x) => x.id === m.id);
          return (
            <Row
              key={m.id}
              label={majorLabel(m.id)}
              value={g.mean}
              n={g.n}
              tone={mine?.major === m.id ? 'ink' : 'gray'}
              emphasis={mine?.major === m.id}
            />
          );
        })}
        <div className="chart-axis" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((t) => (
            <span key={t} style={{ '--p': pos(t) }}>{t}</span>
          ))}
        </div>
      </div>

      {myValue != null && stat.overall != null && (
        <p className="diff">
          내 응답 <strong>{myValue}</strong>
          <span className="diff-sep">·</span>
          {formatDiff(myValue, stat.overall)}
        </p>
      )}
    </article>
  );
}
