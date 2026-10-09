import { useId } from 'react';
import { SCALE } from '../lib/survey.js';

// 원 안을 펜으로 칠한 듯한 지그재그 획
const SCRIBBLE = 'M6.5 9.5 L17.5 6 L6 13.5 L20 9 L6.5 17.5 L20.5 13 L8.5 20.5 L19.5 17.5';

function Dot({ checked }) {
  const clip = useId();
  return (
    <svg className="dot" viewBox="0 0 26 26" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="13" cy="13" r="10.5" />
        </clipPath>
      </defs>
      <circle className="dot-ring" cx="13" cy="13" r="10.5" />
      <path className={`dot-ink${checked ? ' is-on' : ''}`} d={SCRIBBLE} clipPath={`url(#${clip})`} pathLength="100" />
    </svg>
  );
}

export default function LikertRow({ index, question, value, onChange }) {
  const name = useId();
  const chosen = SCALE.find((s) => s.value === value);
  return (
    <fieldset className="likert">
      <legend>
        <span className="q-no">Q{index + 1}</span>
        {question.text}
      </legend>
      <div className="likert-line" role="radiogroup" aria-label={question.text}>
        {SCALE.map((s) => (
          <label key={s.value} className="likert-opt">
            <input
              type="radio"
              name={name}
              value={s.value}
              checked={value === s.value}
              onChange={() => onChange(s.value)}
              aria-label={`${s.value}점 ${s.label}`}
            />
            <Dot checked={value === s.value} />
            <span className="likert-num" aria-hidden="true">{s.value}</span>
          </label>
        ))}
      </div>
      <div className="likert-ends" aria-hidden="true">
        <span>전혀 그렇지 않다</span>
        <span className="likert-chosen">{chosen ? chosen.label : ''}</span>
        <span>매우 그렇다</span>
      </div>
    </fieldset>
  );
}
