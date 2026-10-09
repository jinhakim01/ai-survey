import { MAJORS, MIN_N, QUESTIONS } from '../lib/survey.js';

// 평균 1~5 → 칸 농도 0~1
const tint = (v) => (v == null ? 0 : Math.max(0, Math.min(1, (v - 1) / 4)));

function Cell({ value, thin, mine }) {
  if (thin || value == null) {
    return <td className={`st-cell is-empty${mine ? ' is-mine' : ''}`} aria-label="표본 부족">·</td>;
  }
  const t = tint(value);
  return (
    <td className={`st-cell${t > 0.85 ? ' is-dark' : ''}${mine ? ' is-mine' : ''}`} style={{ '--t': t }}>
      {value.toFixed(1)}
    </td>
  );
}

export default function SummaryTable({ summary, myMajor }) {
  return (
    <section className="summary">
      <p className="kicker">한눈에 보기</p>
      <h3 className="summary-title">문항 × 전공 평균</h3>
      <div className="st-wrap">
        <table className="st">
          <thead>
            <tr>
              <th scope="col" className="st-q"><span className="sr-only">문항</span></th>
              <th scope="col" className="st-all">전체</th>
              {MAJORS.map((m) => (
                <th key={m.id} scope="col" className={myMajor === m.id ? 'is-mine' : ''} title={m.label}>
                  {m.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QUESTIONS.map((q, i) => {
              const stat = summary.questions[i];
              return (
                <tr key={q.key}>
                  <th scope="row" className="st-q">
                    <span className="q-no">Q{i + 1}</span>
                    <span className="st-aspect">{q.aspect}</span>
                  </th>
                  <Cell value={stat.overall} />
                  {stat.groups.map((g) => (
                    <Cell key={g.id} value={g.mean} thin={g.n < MIN_N} mine={myMajor === g.id} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="st-legend" aria-hidden="true">
        <span>1 전혀 그렇지 않다</span>
        <span className="st-swatches">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => <i key={t} style={{ '--t': t }} />)}
        </span>
        <span>5 매우 그렇다</span>
      </div>
      <p className="st-note">· 표시는 응답 3명 미만이라 평균을 생략한 칸입니다.</p>
    </section>
  );
}
