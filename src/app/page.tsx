import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import ArticlePopup from './components/ArticlePopup.cli';
import FloatingMenu from './components/FloatingMenu.cli';
import FloatingEmblem from './components/FloatingEmblem.cli';

export default function Home() {
  const MyMap = useMemo(() => dynamic(
    () => import('./components/Map.cli'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])
  return (
    <main>
      <div id="map" className="w-full h-screen">
        <FloatingMenu />
        <FloatingEmblem/>
        <MyMap />
        <ArticlePopup />
      </div>
    </main>
  );
}
