-- 제출 전 더미 응답 삭제 (SQL Editor는 관리자 권한이라 RLS와 무관하게 실행됨)
delete from public.responses where is_dummy = true;

-- 확인
select count(*) as remaining, count(*) filter (where is_dummy) as dummy_left from public.responses;
