import { useEffect, useState, useCallback } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { noImage } from '../../../public';

const TopNav = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getSearches = useCallback(async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `/search/multi?query=${encodeURIComponent(query)}`,
      );
      setSearchResults(data?.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [query]);

  useEffect(() => {
    const delay = setTimeout(() => {
      getSearches();
    }, 200);

    return () => clearTimeout(delay);
  }, [getSearches]);

  return (
    // Sticky navigation bar that stays at the top
    <nav className="w-full sticky top-0 z-30 bg-base-primary px-3 py-4 pl-18">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="-skew-x-6 bg-transparent">
            <div className="flex items-center gap-3 py-3 px-4 skew-x-6">
              <ion-icon
                name="search-outline"
                style={{ color: '#ffffff', fontSize: '22px' }}
              />

              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-zinc-400 outline-none text-base md:text-lg font-rubik"
              />

              {query.length > 0 && (
                <ion-icon
                  name="close"
                  style={{
                    color: '#ffffff',
                    fontSize: '26px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setQuery('')}
                />
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-4xl max-h-[50vh] bg-zinc-200 mt-2 rounded overflow-auto">
              {searchResults.map((s) => (
                <Link
                  key={s.id}
                  className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 flex items-center gap-3 p-4 md:p-6 border-b border-zinc-300"
                >
                  <img
                    className="w-[8vh] h-[8vh] md:w-[10vh] md:h-[10vh] object-cover rounded mr-1 md:mr-3 shadow-lg"
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            s.backdrop_path || s.profile_path
                          }`
                        : noImage
                    }
                    alt={s.name || s.title || 'image'}
                  />

                  <span className="text-black text-sm md:text-lg font-medium font-netflix-sans line-clamp-1">
                    {s.name || s.title || s.original_name || s.original_title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
