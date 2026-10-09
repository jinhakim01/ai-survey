import { useEffect, useState } from 'react';
import { supabaseConfigured } from './lib/supabase.js';
import { loadMine } from './lib/storage.js';
import Intro from './screens/Intro.jsx';
import Survey from './screens/Survey.jsx';
import Results from './screens/Results.jsx';

const readRoute = () => {
  const h = window.location.hash.replace(/^#\/?/, '');
  return h === 'survey' || h === 'results' ? h : 'intro';
};

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [mine, setMine] = useState(loadMine);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // 이미 응답한 브라우저는 결과 화면으로
  useEffect(() => {
    if (mine && route !== 'results') window.location.replace('#/results');
  }, [mine, route]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  if (!supabaseConfigured) {
    return (
      <main className="page">
        <p className="notice">
          Supabase 환경변수가 설정되지 않았습니다. <code>.env</code>에 VITE_SUPABASE_URL과
          VITE_SUPABASE_ANON_KEY를 넣어주세요.
        </p>
      </main>
    );
  }

  if (route === 'results') return <Results mine={mine} />;
  if (route === 'survey' && !mine) return <Survey onDone={setMine} />;
  return <Intro />;
}
