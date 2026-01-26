import { useEffect, useState, useCallback } from 'react';
import axios from '../utils/axios';
import { SideNav, TopNav, Header } from '../components/partials';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);

  useEffect(() => {
    document.title = 'Filmpire | Homepage';
  }, []);

  // Fetch random wallpaper
  const getWallpaper = useCallback(async () => {
    try {
      const response = await axios.get('/trending/all/day');
      const results = response.data.results;

      const randomIndex = Math.floor(Math.random() * results.length);
      setWallpaper(results[randomIndex]);
    } catch (error) {
      console.log('Wallpaper Error:', error);
    }
  }, []);

  // Load wallpaper once
  useEffect(() => {
    getWallpaper();
  }, [getWallpaper]);

  if (!wallpaper) {
    return <h1 className="text-white p-10">Loading...</h1>;
  }

  return (
    <div className="flex w-full min-h-screen bg-base-primary">
      <SideNav />

      <main className="flex-1 min-h-screen overflow-y-auto hide-scrollbar px-3 md:px-6">
        <TopNav />
        <Header data={wallpaper} />
      </main>
    </div>
  );
};

export default Home;
