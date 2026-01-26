import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newFeeds, companyInfo } from '../../constants';
import { filmpireLogo } from '../../../public';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 right-3 md:right-6 z-50 p-2 rounded-lg text-white bg-zinc-800/60 backdrop-blur-md"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <ion-icon
          name={isOpen ? 'close' : 'menu'}
          style={{ fontSize: '32px', display: 'block' }}
        />
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed lg:relative top-0 left-0 z-50 h-screen bg-zinc-900 border-r border-zinc-400 
        w-[260px] xl:w-[18%] transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 overflow-hidden`}
      >
        <aside className="flex flex-col h-full">
          <div className="flex justify-center pt-10 md:pt-15 pb-5 md:pb-10 shrink-0">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src={filmpireLogo}
                alt="Filmpire Logo"
                className="w-40 lg:w-52"
              />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-5">
            <nav className="flex flex-col text-zinc-400 text-lg gap-3">
              <h2 className="text-white font-netflix-medium text-2xl mb-2">
                New Feeds
              </h2>
              {newFeeds.map((item) => (
                <Link
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors group"
                >
                  <ion-icon
                    name={item.icon}
                    style={{ fontSize: '28px' }}
                    className="group-hover:text-accent-hover transition-colors"
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <hr className="my-8 border-zinc-400" />

            <nav className="flex flex-col text-zinc-400 text-lg gap-3">
              <h2 className="text-white font-netflix-medium text-2xl mb-2">
                Company Info
              </h2>

              {companyInfo.map((item) => (
                <Link
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors group"
                >
                  <ion-icon
                    name={item.icon}
                    style={{ fontSize: '28px' }}
                    className="group-hover:text-accent-hover transition-colors"
                  />
                  <span className="font-medium line-clamp-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideNav;
