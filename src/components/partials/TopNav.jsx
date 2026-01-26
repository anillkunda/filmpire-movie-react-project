import { useEffect, useState, useCallback } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { noMovie } from '../../../public';

const TopNav = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch search data
  const getSearches = useCallback(async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `/search/multi?query=${encodeURIComponent(query)}`,
      );

      setSearchResults(response.data?.results || []);
    } catch (error) {
      console.log('Search Error:', error);
    }
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearches();
    }, 250);

    return () => clearTimeout(timer);
  }, [getSearches]);

  return (
    <nav className="w-full sticky top-0 z-30 bg-base-primary py-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="-skew-x-6 bg-transparent">
            <div className="flex items-center gap-3 py-3 skew-x-6">
              <ion-icon
                name="search-outline"
                className="text-xl md:text-2xl text-white"
              />
              <input
                type="text"
                placeholder="Search movies…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-zinc-400 outline-none text-lg md:text-xl min-h-[30px]"
              />
            </div>
          </div>

          {/* SEARCH RESULTS */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-4xl max-h-[50vh] bg-zinc-200 mt-2 rounded overflow-auto shadow-xl">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  onClick={() => setQuery('')}
                  className="flex items-center gap-3 p-4 md:p-6 border-b border-zinc-300 hover:bg-zinc-300 transition"
                >
                  <img
                    className="w-[8vh] h-[8vh] md:w-[10vh] md:h-[10vh] object-cover rounded shadow-lg"
                    src={
                      item.backdrop_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            item.backdrop_path || item.profile_path
                          }`
                        : noMovie
                    }
                    alt={item.name || item.title || 'image'}
                  />

                  <span className="text-black text-sm md:text-lg font-medium line-clamp-1">
                    {item.name ||
                      item.title ||
                      item.original_name ||
                      item.original_title}
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
