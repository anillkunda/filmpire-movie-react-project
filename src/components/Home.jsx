import { useEffect } from 'react';
import { SideNav } from '../components/partials';

const Home = () => {
  useEffect(() => {
    document.title = 'Filmpire | Homepage';
  }, []);

  return (
    <>
      <SideNav />
      <div className="w-full h-full"></div>
    </>
  );
};

export default Home;
