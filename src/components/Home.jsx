import { useEffect } from 'react';
import { SideNav, TopNav } from '../components/partials';

const Home = () => {
  useEffect(() => {
    document.title = 'Filmpire | Homepage';
  }, []);

  return (
    <>
      <SideNav />
      <div className="w-full h-full">
        <TopNav />
      </div>
    </>
  );
};

export default Home;
