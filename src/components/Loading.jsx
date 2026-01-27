import { loaderGIF } from '../../public';

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img src={loaderGIF} alt="Loading..." className="h-[50%] object-cover" />
    </div>
  );
};

export default Loading;
