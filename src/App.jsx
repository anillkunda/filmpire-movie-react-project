import { Route, Routes } from 'react-router-dom';
import { Home } from './components';

const App = () => {
  return (
    <div className="bg-base-primary flex w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
