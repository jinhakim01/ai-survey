import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

const COLUMNS = 'id, major, q1, q2, q3, q4, q5, q6';

/** 전체 응답을 불러오고, Realtime으로 INSERT/DELETE를 반영한다. */
export function useResponses() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | live | offline | error

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase.from('responses').select(COLUMNS).order('created_at');
    if (error) {
      setStatus('error');
      return;
    }
    setRows(data);
  }, []);

  useEffect(() => {
    fetchAll();

    const channel = supabase
      .channel('responses-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'responses' }, ({ new: row }) => {
        setRows((prev) => (prev.some((r) => r.id === row.id) ? prev : [...prev, row]));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'responses' }, ({ old }) => {
        setRows((prev) => prev.filter((r) => r.id !== old.id));
      })
      .on('system', {}, (m) => {
        // SUBSCRIBED 이후 DB 변경 감지가 실제로 준비된 시점 — 그 사이 놓친 응답 보정
        if (m.extension === 'postgres_changes' && m.status === 'ok') fetchAll();
      })
      .subscribe((s) => {
        if (s === 'SUBSCRIBED') {
          setStatus('live');
        } else if (s === 'CLOSED' || s === 'CHANNEL_ERROR' || s === 'TIMED_OUT') {
          setStatus('offline');
        }
      });

    // 폰에서 탭을 다시 열었을 때 놓친 응답 보정
    const onVisible = () => document.visibilityState === 'visible' && fetchAll();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      supabase.removeChannel(channel);
    };
  }, [fetchAll]);

  const addLocal = useCallback((row) => {
    setRows((prev) => (prev.some((r) => r.id === row.id) ? prev : [...prev, row]));
  }, []);

  return { rows, status, addLocal };
}
