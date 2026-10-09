import { useMemo } from 'react';
import SectionHead from '../components/SectionHead.jsx';
import BarChart from '../components/BarChart.jsx';
import TypeCard, { TypeDistribution } from '../components/TypeCard.jsx';
import SummaryTable from '../components/SummaryTable.jsx';
import AboutSection from '../components/AboutSection.jsx';
import { useResponses } from '../hooks/useResponses.js';
import { summarize, classify } from '../lib/stats.js';
import { MAJORS, MIN_N, QUESTIONS } from '../lib/survey.js';

const STATUS_TEXT = {
  loading: '불러오는 중',
  live: '실시간 반영 중',
  offline: '연결 끊김 · 다시 연결 시도 중',
  error: '결과를 불러오지 못했습니다',
};

export default function Results({ mine }) {
  const { rows, status } = useResponses();
  const s = useMemo(() => summarize(rows), [rows]);
  const myType = mine ? classify(mine) : null;

  return (
    <main className="page">
      <SectionHead no="03" kicker="결과" title="지금까지 모인 응답" />

      <div className="tally">
        <p className="tally-total">
          <span className="tally-num">{s.total}</span>명 응답
          <span className={`live live-${status}`}>{STATUS_TEXT[status]}</span>
        </p>
        <ul className="tally-groups">
          {MAJORS.map((m) => (
            <li key={m.id} className={s.groupN[m.id] < MIN_N ? 'is-thin' : ''}>
              {m.label} <span className="num">{s.groupN[m.id]}</span>
            </li>
          ))}
        </ul>
      </div>

      {mine ? (
        <TypeCard type={myType} typeCounts={s.typeCounts} total={s.total} />
      ) : (
        <section className="typecard is-empty">
          <p className="kicker">AI 활용 유형 분포</p>
          <TypeDistribution typeCounts={s.typeCounts} total={s.total} />
          <p className="invite">
            설문에 답하면 그래프 위에 내 위치가 표시되고, 나의 유형을 알 수 있습니다.
            <a className="link-accent" href="#/survey">설문에 참여하기 →</a>
          </p>
        </section>
      )}

      <SummaryTable summary={s} myMajor={mine?.major} />

      <section className="questions">
        <p className="legend-note">
          막대는 1(전혀 그렇지 않다)부터 5(매우 그렇다)까지의 평균입니다.
          {mine && ' 세로선은 내 응답입니다.'}
        </p>
        {QUESTIONS.map((q, i) => (
          <BarChart key={q.key} index={i} question={q} stat={s.questions[i]} mine={mine} />
        ))}
      </section>

      <AboutSection />
    </main>
  );
}
