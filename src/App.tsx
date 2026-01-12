import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisableDevtool from 'disable-devtool';
import { initializeTheme } from './utils/theme';

import Home from './features/movies/pages/Home';
import VideoPlayer from './features/movies/pages/VideoPlayer';


function App() {
  useEffect(() => {
    // Initialize theme when app mounts
    initializeTheme();
  }, []);

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
