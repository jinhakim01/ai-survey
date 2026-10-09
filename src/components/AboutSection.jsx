import SectionHead from './SectionHead.jsx';
import { QUESTIONS } from '../lib/survey.js';

export default function AboutSection() {
  return (
    <section className="about">
      <SectionHead no="04" kicker="편집 후기" title="이 설문에 대하여" />

      <h3 className="about-h">문항을 이렇게 고른 이유</h3>
      <div className="prose">
        <p>
          ‘AI 의존도’는 하나의 숫자로 재기 어렵습니다. 자주 쓰는 사람이 꼭 의존하는 것도 아니고, 적게
          쓰는 사람이 꼭 비판적인 것도 아니기 때문입니다. 그래서 의존을 여섯 측면으로 나누어 한 문항씩
          배정했습니다.
        </p>
      </div>
      <ol className="about-list">
        {QUESTIONS.map((q, i) => (
          <li key={q.key}>
            <span className="q-no">Q{i + 1}</span>
            <strong>{q.aspect}</strong>
            <span className="muted"> — {q.text}</span>
          </li>
        ))}
      </ol>
      <div className="prose">
        <p>
          얼마나 자주 쓰는지(빈도), 쓴 결과를 따져 보는지(비판적 사용), 없으면 불안한지(정서적 의존),
          실제로 도움이 된다고 느끼는지(체감 효과)를 함께 보면 같은 ‘많이 쓰는 사람’ 안에서도 결이
          갈립니다. 여기에 사용 사실을 드러내는지(윤리)와 수업 규칙이 명확한지(제도)를 더해, 개인의
          습관과 그것을 둘러싼 환경을 함께 보려 했습니다.
        </p>
      </div>

      <h3 className="about-h">추가한 기능과 그 이유</h3>
      <dl className="about-features">
        <div>
          <dt>내 위치 표시</dt>
          <dd>
            전체 평균만 보면 결과는 남의 이야기처럼 느껴집니다. 그래프 위에 내 응답이 함께 찍히고
            “전체 평균보다 +0.8”처럼 차이가 보이면, 같은 결과가 곧 내 이야기가 됩니다.
          </dd>
        </div>
        <div>
          <dt>AI 활용 유형 카드</dt>
          <dd>
            응답을 마친 사람에게 작은 보상을 주고 싶었습니다. 내 유형과 같은 유형의 비율을 보여주면
            자연스럽게 친구에게 링크를 공유하게 되고, 응답이 늘수록 실시간 결과는 더 믿을 만해집니다.
            유형은 의존(Q1·Q3 평균)과 검증(Q2) 두 축으로 나누었고, 어느 유형도 좋고 나쁨을 뜻하지
            않도록 문구를 썼습니다.
          </dd>
        </div>
      </dl>

      <p className="footnote">
        응답은 익명으로 저장되며 전공 계열과 응답값만 수집합니다. 중복 응답은 브라우저 저장소로
        막고 있어, 다른 기기나 시크릿 창에서는 다시 응답할 수 있습니다. 집단 응답이 3명 미만이면
        평균을 표시하지 않습니다.
      </p>
    </section>
  );
}
