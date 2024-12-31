import React, { useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { Subreddits } from './features/subreddits/Subreddits';
import { Posts } from './features/posts/Posts';
import './App.css';

function App() {
  // tracks whether subreddits container is open or hidden
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //pass the state to Subreddits component
  const handleMenuToggle = (isChecked) => {
    setIsMenuOpen(isChecked);
  };

  return (
    <Router basename="/reddit-redux-app">
      <Navbar onToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      <Subreddits onToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/r/pics/" replace />} />
          {/* useParams will only capture what's after r/ so even though the url
          is e.g.: /r/pics the result will be pics */}
          <Route path="/r/:subredditUrl" element={<Posts />} />
          {/* this route may fix error when published app is refreshed. */}
          <Route path="*" element={<Navigate to="/r/pics/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
