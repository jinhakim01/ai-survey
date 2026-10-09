import SectionHead from '../components/SectionHead.jsx';

export default function Intro() {
  return (
    <main className="page">
      <p className="masthead">대학생 AI 사용 조사 · 2026 가을</p>
      <SectionHead no="01" kicker="들어가며" title="우리는 AI에 얼마나 기대고 있을까" />
      <div className="prose">
        <p>
          과제를 시작할 때, 검색창보다 AI 창을 먼저 여는 사람이 늘었습니다. 이 설문은 대학생이 AI를
          얼마나 자주, 어떤 방식으로 쓰는지를 여섯 가지 측면에서 묻습니다.
        </p>
        <p>
          전공 계열을 고르고 여섯 문항에 답하면, 지금까지 모인 응답과 함께 전공별 평균을 바로 볼 수
          있습니다. 내 응답이 어디쯤 있는지, 어떤 유형인지도 함께 알려드립니다.
        </p>
      </div>
      <dl className="facts">
        <div><dt>문항</dt><dd>6개 · 5점 척도</dd></div>
        <div><dt>소요</dt><dd>약 1분</dd></div>
        <div><dt>수집</dt><dd>전공 계열과 응답값만, 익명</dd></div>
      </dl>
      <div className="actions">
        <a className="btn-primary" href="#/survey">설문 시작하기</a>
        <a className="link-quiet" href="#/results">결과만 보기</a>
      </div>
    </main>
  );
}
