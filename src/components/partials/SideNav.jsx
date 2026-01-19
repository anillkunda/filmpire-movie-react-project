import { useState } from 'react';
import { Link } from 'react-router-dom';
import { newFeeds, companyInfo } from '../../constants';
import { filmpireLogo } from '../../../public';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-3 z-60 p-2 rounded-lg text-white bg-zinc-800/60 backdrop-blur-md"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <ion-icon
          name={isOpen ? 'close' : 'menu'}
          style={{ fontSize: '32px', display: 'block' }}
        />
      </button>

      <div
        className={`fixed top-0 left-0 z-50 h-screen bg-zinc-900 border-r border-zinc-400 w-75 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static xl:w-[22%]`}
      >
        <aside className="flex flex-col h-full">
          <div className="flex justify-center pt-10 pb-5 lg:pt-15 lg:pb-8 shrink-0">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src={filmpireLogo}
                alt="Filmpire Logo"
                className="w-45 lg:w-50"
              />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-5 md:px-8 pb-5 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
            <nav className="flex flex-col text-zinc-400 text-lg gap-3 font-netflix-sans">
              <h2 className="text-white font-semibold text-2xl mb-2">
                New Feeds
              </h2>
              {newFeeds.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <ion-icon
                    name={item.icon}
                    style={{ fontSize: '28px' }}
                    class="group-hover:text-accent-hover transition-colors"
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <hr className="my-8 border-zinc-400" />

            <nav className="flex flex-col text-zinc-400 text-lg gap-3 font-netflix-sans">
              <h2 className="text-white font-semibold text-2xl mb-2">
                Company Info
              </h2>
              {companyInfo.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <ion-icon
                    name={item.icon}
                    style={{ fontSize: '28px' }}
                    class="group-hover:text-accent-hover transition-colors"
                  />
                  <span className="font-medium line-clamp-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideNav;
