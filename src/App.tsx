import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
