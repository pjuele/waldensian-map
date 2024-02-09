import dynamic from 'next/dynamic';
import { useMemo } from 'react';
// import MyMap from "./components/map";

export default function Home() {
  const MyMap = useMemo(() => dynamic(
    () => import('./components/map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])
  return (
    <main>
      <div id="map" className="w-full h-screen">
        <MyMap/>
      </div>
    </main>
  );
}
