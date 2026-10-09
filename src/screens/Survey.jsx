import { useState } from 'react';
import SectionHead from '../components/SectionHead.jsx';
import LikertRow from '../components/LikertRow.jsx';
import { MAJORS, QUESTIONS } from '../lib/survey.js';
import { supabase } from '../lib/supabase.js';
import { saveMine } from '../lib/storage.js';

export default function Survey({ onDone }) {
  const [major, setMajor] = useState(null);
  const [answers, setAnswers] = useState({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const answered = QUESTIONS.filter((q) => answers[q.key]).length;
  const complete = major && answered === QUESTIONS.length;

  async function submit(e) {
    e.preventDefault();
    if (!complete || sending) return;
    setSending(true);
    setError('');
    const row = { id: crypto.randomUUID(), major, ...answers };
    const { error: err } = await supabase.from('responses').insert(row);
    if (err) {
      setSending(false);
      setError('제출하지 못했습니다. 연결을 확인하고 다시 시도해 주세요.');
      return;
    }
    const record = { ...row, submittedAt: new Date().toISOString() };
    saveMine(record);
    onDone(record);
    window.location.hash = '#/results';
  }

  return (
    <main className="page">
      <SectionHead no="02" kicker="응답" title="해당하는 곳에 표시해 주세요" />
      <form onSubmit={submit} noValidate>
        <fieldset className="major">
          <legend>
            <span className="q-no">전공</span>
            나의 전공 계열은
          </legend>
          <div className="major-list" role="radiogroup">
            {MAJORS.map((m) => (
              <label key={m.id} className={`major-opt${major === m.id ? ' is-on' : ''}`}>
                <input type="radio" name="major" value={m.id} checked={major === m.id} onChange={() => setMajor(m.id)} />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>

        {QUESTIONS.map((q, i) => (
          <LikertRow
            key={q.key}
            index={i}
            question={q}
            value={answers[q.key]}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.key]: v }))}
          />
        ))}

        <div className="submit-bar">
          <p className="progress">
            {major ? '전공 선택됨' : '전공 미선택'} · {answered}/{QUESTIONS.length} 문항
          </p>
          <button type="submit" className="btn-primary" disabled={!complete || sending}>
            {sending ? '보내는 중…' : '제출하고 결과 보기'}
          </button>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
      </form>
    </main>
  );
}
