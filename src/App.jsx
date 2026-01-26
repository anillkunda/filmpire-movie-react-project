import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  return (
    <div className="bg-base-primary w-full h-screen overflow-hidden flex">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
