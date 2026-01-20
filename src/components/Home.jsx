import { useEffect, useState, useCallback } from 'react';
import axios from '../utils/axios';
import { SideNav, TopNav, Header } from '../components/partials';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);

  useEffect(() => {
    document.title = 'Filmpire | Homepage';
  }, []);

  const getWallpaper = useCallback(async () => {
    try {
      const { data } = await axios.get('/trending/all/day');
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[randomIndex]);
    } catch (error) {
      console.error('Error fetching wallpaper data:', error);
    }
  }, []);

  useEffect(() => {
    if (!wallpaper) {
      getWallpaper();
    }
  }, [wallpaper, getWallpaper]);

  return wallpaper ? (
    <>
      <SideNav />
      <div className="w-full h-full px-2 md:px-4">
        <TopNav />
        <Header data={wallpaper} />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Home;
