import { MAJORS, QUESTIONS } from './survey.js';

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/** 의존 = (Q1+Q3)/2, 검증 = Q2. 각 축 3 이상이면 높음. */
export function classify(r) {
  const reliance = (r.q1 + r.q3) / 2 >= 3;
  const verify = r.q2 >= 3;
  if (reliance && verify) return 'collaborator';
  if (reliance) return 'delegator';
  if (verify) return 'careful';
  return 'independent';
}

export function summarize(rows) {
  const byMajor = Object.fromEntries(MAJORS.map((m) => [m.id, rows.filter((r) => r.major === m.id)]));

  const questions = QUESTIONS.map(({ key }) => ({
    key,
    overall: mean(rows.map((r) => r[key])),
    groups: MAJORS.map((m) => ({
      id: m.id,
      n: byMajor[m.id].length,
      mean: mean(byMajor[m.id].map((r) => r[key])),
    })),
  }));

  const typeCounts = { collaborator: 0, delegator: 0, careful: 0, independent: 0 };
  rows.forEach((r) => { typeCounts[classify(r)] += 1; });

  return {
    total: rows.length,
    groupN: Object.fromEntries(MAJORS.map((m) => [m.id, byMajor[m.id].length])),
    questions,
    typeCounts,
  };
}

export function formatDiff(mine, avg) {
  if (avg == null) return '';
  const d = Math.round((mine - avg) * 10) / 10;
  if (d === 0) return '전체 평균과 같음';
  return `전체 평균보다 ${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}`;
}
