import { describe, it, expect } from 'vitest';
import { classify, summarize, formatDiff } from './stats.js';

const r = (major, q1, q2, q3, q4 = 3, q5 = 3, q6 = 3) => ({ major, q1, q2, q3, q4, q5, q6 });

describe('classify', () => {
  it('경계값 3은 높음', () => {
    expect(classify(r('arts', 3, 3, 3))).toBe('collaborator');
  });
  it('의존 평균 2.5는 낮음', () => {
    expect(classify(r('arts', 2, 5, 3))).toBe('careful');
    expect(classify(r('arts', 2, 2, 3))).toBe('independent');
  });
  it('의존 높음 + 검증 낮음은 위임형', () => {
    expect(classify(r('arts', 5, 2, 4))).toBe('delegator');
  });
});

describe('summarize', () => {
  it('전체·집단 평균과 n', () => {
    const s = summarize([r('engineering', 5, 1, 5), r('engineering', 3, 1, 3), r('arts', 1, 5, 1)]);
    expect(s.total).toBe(3);
    expect(s.groupN.engineering).toBe(2);
    expect(s.groupN.science).toBe(0);
    const q1 = s.questions[0];
    expect(q1.overall).toBeCloseTo(3);
    expect(q1.groups.find((g) => g.id === 'engineering').mean).toBe(4);
    expect(q1.groups.find((g) => g.id === 'science').mean).toBeNull();
    expect(s.typeCounts).toEqual({ collaborator: 0, delegator: 2, careful: 1, independent: 0 });
  });
});

describe('formatDiff', () => {
  it('부호와 소수 한 자리', () => {
    expect(formatDiff(4, 3.2)).toBe('전체 평균보다 +0.8');
    expect(formatDiff(2, 3.24)).toBe('전체 평균보다 −1.2');
    expect(formatDiff(3, 3.02)).toBe('전체 평균과 같음');
  });
});
