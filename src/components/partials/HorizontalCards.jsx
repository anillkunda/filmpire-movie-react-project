import { useState } from 'react';
import { Link } from 'react-router-dom';

const HorizontalCards = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden hide-scrollbar py-10">
        {data.map((item, index) =>
          item ? <CardItem key={item.id || index} item={item} /> : null,
        )}
      </div>
    </div>
  );
};

const CardItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 80;

  const overview = item?.overview ?? '';
  const needsTruncation = overview.length > maxLength;

  const description =
    isExpanded || !needsTruncation
      ? overview
      : overview.slice(0, maxLength) + '...';

  const title = item?.title || item?.name || 'Unknown Title';

  const imageUrl =
    item?.poster_path || item?.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className="min-w-[260px] md:min-w-[300px] bg-base-tertiary rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition">
      <div className="relative h-[170px] md:h-[190px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.currentTarget.src =
              'https://via.placeholder.com/300x450?text=No+Image')
          }
        />

        {item?.vote_average && (
          <span className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-full">
            ⭐ {item.vote_average.toFixed(1)}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col h-[220px]">
        <h3 className="text-white text-xl line-clamp-1">{title}</h3>

        {(item?.release_date || item?.first_air_date) && (
          <p className="text-zinc-500 text-sm mb-2">
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </p>
        )}

        <p className="text-zinc-400 text-sm mb-2">
          {description?.slice(0, 130) || 'No description available.'}
        </p>

        <div className="flex justify-between items-center mt-auto">
          {needsTruncation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-accent-primary text-sm"
            >
              {isExpanded ? 'Show Less' : 'More'}
            </button>
          )}

          <Link className="bg-base-secondary hover:bg-base-primary text-white text-sm px-3 py-1 rounded-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;
