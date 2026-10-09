export const MAJORS = [
  { id: 'engineering', short: '공학', label: '공학' },
  { id: 'humanities', short: '인문', label: '인문·사회' },
  { id: 'business', short: '경영', label: '경영·경제' },
  { id: 'science', short: '자연', label: '자연과학' },
  { id: 'arts', short: '예체', label: '예체능·기타' },
];

export const majorLabel = (id) => MAJORS.find((m) => m.id === id)?.label ?? id;

export const QUESTIONS = [
  { key: 'q1', text: '과제를 시작할 때 AI부터 연다.', aspect: '사용 빈도' },
  { key: 'q2', text: 'AI가 준 답을 다른 자료로 검증하는 편이다.', aspect: '비판적 사용' },
  { key: 'q3', text: 'AI 없이 과제를 하면 불안하다.', aspect: '정서적 의존' },
  { key: 'q4', text: 'AI 덕분에 실력이 늘었다고 느낀다.', aspect: '체감 효과' },
  { key: 'q5', text: 'AI 사용 사실을 교수님께 굳이 밝히지 않는다.', aspect: '윤리' },
  { key: 'q6', text: 'AI 사용 규칙이 수업마다 명확하다고 느낀다.', aspect: '제도' },
];

export const SCALE = [
  { value: 1, label: '전혀 그렇지 않다' },
  { value: 2, label: '그렇지 않다' },
  { value: 3, label: '보통이다' },
  { value: 4, label: '그렇다' },
  { value: 5, label: '매우 그렇다' },
];

export const MIN_N = 3;

export const TYPES = {
  collaborator: {
    name: '협업형',
    axis: '의존 높음 · 검증 높음',
    summary: 'AI를 자주 쓰되, 결과는 직접 한 번 더 확인하는 편입니다.',
    traits: [
      '과제의 출발점에서 AI를 적극적으로 활용함',
      'AI의 답을 다른 자료와 대조해 보는 습관이 있음',
      'AI를 동료처럼 두고 판단은 스스로 내림',
    ],
  },
  delegator: {
    name: '위임형',
    axis: '의존 높음 · 검증 낮음',
    summary: 'AI에게 많은 부분을 맡기고, 그 결과를 비교적 그대로 받아들이는 편입니다.',
    traits: [
      '속도와 효율을 중요하게 여김',
      'AI의 답을 신뢰하는 정도가 높음',
      '검증 단계를 더하면 결과물이 더 단단해질 수 있음',
    ],
  },
  careful: {
    name: '신중형',
    axis: '의존 낮음 · 검증 높음',
    summary: 'AI는 필요할 때만 꺼내 쓰고, 쓸 때는 꼼꼼히 확인하는 편입니다.',
    traits: [
      '스스로 먼저 생각한 뒤 AI를 보조로 사용함',
      '출처와 근거를 확인하는 데 익숙함',
      'AI 없이도 과제를 진행하는 데 부담이 적음',
    ],
  },
  independent: {
    name: '독립형',
    axis: '의존 낮음 · 검증 낮음',
    summary: 'AI와 거리를 두고 자신만의 방식으로 과제를 해내는 편입니다.',
    traits: [
      'AI 사용 빈도가 비교적 낮음',
      '익숙한 기존 방식으로 과제를 수행함',
      'AI를 쓰게 되면 활용법을 새로 정할 여지가 큼',
    ],
  },
};

export const TYPE_ORDER = ['collaborator', 'delegator', 'careful', 'independent'];
