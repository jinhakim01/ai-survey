// Supabase 연결·RLS·Realtime 점검 (키는 출력하지 않음). 실행: node --env-file=.env scripts/verify-db.mjs
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.log('FAIL  .env에 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY가 없음');
  process.exit(1);
}
const sb = createClient(url, key);
const ok = (c, msg) => console.log(`${c ? 'PASS' : 'FAIL'}  ${msg}`);

// 1) select
const sel = await sb.from('responses').select('id').limit(1);
ok(!sel.error, `select 허용 ${sel.error ? `(${sel.error.message})` : ''}`);

// 2) realtime 구독 후 insert → 이벤트 수신
const id = crypto.randomUUID();
let got = false;
let pgReady = false;
const ch = sb.channel('verify').on('system', {}, (m) => {
  if (m.extension === 'postgres_changes' && m.status === 'ok') pgReady = true;
}).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'responses' }, (p) => {
  if (p.new.id === id) got = true;
});
const subscribed = await new Promise((res) => {
  ch.subscribe((s) => (s === 'SUBSCRIBED' ? res(true) : ['CHANNEL_ERROR', 'TIMED_OUT', 'CLOSED'].includes(s) && res(false)));
  setTimeout(() => res(false), 10000);
});
ok(subscribed, 'Realtime 채널 구독');
for (let i = 0; i < 40 && !pgReady; i++) await new Promise((r) => setTimeout(r, 250));
ok(pgReady, 'Realtime DB 변경 감지 준비 완료');

const ins = await sb.from('responses').insert({ id, major: 'engineering', q1: 3, q2: 3, q3: 3, q4: 3, q5: 3, q6: 3, is_dummy: true });
ok(!ins.error, `insert 허용 ${ins.error ? `(${ins.error.message})` : ''}`);

for (let i = 0; i < 40 && !got; i++) await new Promise((r) => setTimeout(r, 250));
ok(got, 'Realtime INSERT 이벤트 수신');

// 3) 잘못된 값은 거부 (CHECK 제약)
const bad = await sb.from('responses').insert({ major: 'engineering', q1: 9, q2: 3, q3: 3, q4: 3, q5: 3, q6: 3, is_dummy: true });
ok(Boolean(bad.error), '범위 밖 값(q1=9) insert 거부');

// 4) update / delete 거부
const upd = await sb.from('responses').update({ q1: 1 }).eq('id', id).select();
ok(Boolean(upd.error) || upd.data.length === 0, `update 거부 ${upd.error ? `(${upd.error.code})` : '(0행 변경)'}`);
const del = await sb.from('responses').delete().eq('id', id).select();
ok(Boolean(del.error) || del.data.length === 0, `delete 거부 ${del.error ? `(${del.error.code})` : '(0행 삭제)'}`);
const still = await sb.from('responses').select('q1').eq('id', id).single();
ok(still.data?.q1 === 3, '테스트 행이 변경·삭제되지 않고 그대로 남아 있음');

await sb.removeChannel(ch);
process.exit(0);
