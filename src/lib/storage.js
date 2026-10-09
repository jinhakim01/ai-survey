const KEY = 'ai-survey-response-v1';

export function loadMine() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveMine(record) {
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* 저장 실패해도 결과 화면은 동작 */
  }
}
