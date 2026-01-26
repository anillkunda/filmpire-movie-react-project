import { Link } from 'react-router-dom';

function Header({ data }) {
  if (!data) return null;

  const imagePath = data.backdrop_path || data.profile_path || '';

  const title =
    data.name ||
    data.title ||
    data.original_name ||
    data.original_title ||
    'Untitled';

  const overview = data.overview
    ? data.overview.length > 180
      ? data.overview.slice(0, 180) + '...'
      : data.overview
    : 'No description available.';

  const bgImage = imagePath
    ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.85)), 
       url(https://image.tmdb.org/t/p/original${imagePath})`
    : 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85))';

  const mediaType =
    data.media_type === 'tv'
      ? 'TV SHOW'
      : data.media_type === 'movie'
        ? 'MOVIE'
        : 'MEDIA';

  return (
    <div
      style={{
        background: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-full min-h-[40vh] md:min-h-[35vh] lg:min-h-[55vh] flex flex-col justify-end rounded-xl px-2 md:px-8 lg:px-16 py-6 md:py-10 text-left"
    >
      {/* TITLE */}
      <h1 className="text-white text-3xl/10 md:text-5xl/15 font-netflix-bold mb-1 md:mb-2 ml-4 md:ml-8 drop-shadow-lg w-[85%] md:w-[50%] line-clamp-1">
        {title}
      </h1>

      {/* OVERVIEW */}
      <p className="text-gray-300 ml-4 md:ml-8 mb-1 md:mb-4 w-[85%] md:w-[70%] line-clamp-2 md:line-clamp-3 leading-tight text-sm md:text-lg drop-shadow-lg">
        {overview}
      </p>

      {/* META */}
      <div className="ml-4 md:ml-8 mt-3 mb-3 md:mb-6 text-white flex flex-wrap gap-3 md:gap-6">
        <p className="flex items-center gap-2 text-sm md:text-lg">
          <ion-icon
            name="calendar-clear"
            className="text-[20px] md:text-[25px] text-accent-primary"
          />
          {data.release_date || data.first_air_date || 'N/A'}
        </p>

        <p className="flex items-center gap-2 text-sm md:text-lg">
          <ion-icon
            name={data.media_type === 'tv' ? 'tv' : 'film'}
            className="text-[20px] md:text-[25px] text-accent-primary"
          />
          {mediaType}
        </p>

        <p className="flex items-center gap-2 text-sm md:text-lg">
          <ion-icon
            name="volume-medium"
            className="text-[25px] md:text-[30px] text-accent-primary"
          />
          {data.original_language?.toUpperCase() || 'N/A'}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="ml-4 md:ml-8 text-white flex flex-wrap gap-4 md:gap-6">
        <Link className="bg-accent-primary hover:bg-accent-hover p-2 md:p-3 rounded-lg flex items-center gap-1 transition">
          <ion-icon
            name="play"
            className="text-[17px] md:text-[25px] text-white"
          />
          <span className="pr-1 text-sm md:text-xl">Watch Trailer</span>
        </Link>

        <Link className="bg-white hover:bg-gray-300 p-2 md:p-3 rounded-lg flex items-center gap-1 transition">
          <ion-icon
            name="albums"
            className="text-[17px] md:text-[25px] text-black"
          />
          <span className="pr-1 text-sm md:text-xl text-black">More Info</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
