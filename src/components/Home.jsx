import { useEffect, useState, useCallback } from 'react';
import axios from '../utils/axios';
import {
  SideNav,
  TopNav,
  Header,
  Dropdown,
  HorizontalCards,
} from '../components/partials';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    document.title = 'Filmpire | Homepage';
  }, []);

  // Helper function to fetch data
  const fetchData = async (url, setter) => {
    try {
      const res = await axios.get(url);
      setter(res.data.results);
    } catch (error) {
      console.log('API Error:', error);
    }
  };
  // Fetch a random wallpaper from trending
  const getWallpaper = useCallback(async () => {
    try {
      const res = await axios.get('/trending/all/day');
      const results = res.data.results;
      const randomIndex = Math.floor(Math.random() * results.length);
      setWallpaper(results[randomIndex]);
    } catch (error) {
      console.log('Wallpaper Error:', error);
    }
  }, []);

  // Fetch wallpaper on mount
  useEffect(() => {
    if (!wallpaper) {
      getWallpaper();
    }
  }, [getWallpaper, wallpaper]);

  // Fetch trending, popular, and upcoming data
  useEffect(() => {
    fetchData(`/trending/${category}/day`, setTrending);
  }, [category]);

  if (!wallpaper) {
    return <h1 className="text-white p-10">Loading...</h1>;
  }

  return (
    <div className="flex w-full min-h-screen bg-base-primary">
      <SideNav />

      <main className="flex-1 min-h-screen overflow-y-auto hide-scrollbar px-3 md:px-6">
        <TopNav />
        <Header data={wallpaper} />

        <div className="flex items-center justify-between gap-4 pt-10 md:pt-15">
          <h2 className="text-white text-2xl md:text-4xl font-netflix-medium">
            Trending
          </h2>

          <Dropdown
            title="Filter"
            option={[
              { value: 'all', label: 'All' },
              { value: 'movie', label: 'Movies' },
              { value: 'tv', label: 'TV Shows' },
            ]}
            onSelect={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </main>
    </div>
  );
};

export default Home;
