import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisableDevtool from 'disable-devtool';

import Home from './features/movies/pages/Home';
import VideoPlayer from './features/movies/pages/VideoPlayer';


function App() {
  if (import.meta.env.PROD) {
    DisableDevtool();
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<VideoPlayer />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
