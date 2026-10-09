-- 테스트용 더미 응답 10개 (is_dummy = true 로 표시)
insert into public.responses (major, q1, q2, q3, q4, q5, q6, is_dummy)
select
  (array['engineering','humanities','business','science','arts'])[1 + (g % 5)],
  1 + floor(random() * 5)::int,
  1 + floor(random() * 5)::int,
  1 + floor(random() * 5)::int,
  1 + floor(random() * 5)::int,
  1 + floor(random() * 5)::int,
  1 + floor(random() * 5)::int,
  true
from generate_series(1, 10) as g;
