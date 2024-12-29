import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { Subreddits } from './features/subreddits/Subreddits';
import { Posts } from './features/posts/Posts';
import './App.css';

function App() {
  // tracks whether subreddits container is open or hidden
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   // Set the initial state once the component has mounted
  //   setIsMenuOpen(false); // Ensure the menu is hidden initially
  // }, []);

  //pass the state to Subreddits component
  const handleMenuToggle = (isChecked) => {
    setIsMenuOpen(isChecked);
  };
  return (
    <Router>
      <Navbar onToggle={handleMenuToggle} />
      <div className="App">
        <Subreddits isMenuOpen={isMenuOpen} />
        <Routes>
          <Route
            path="/"
            element={<Posts defaultSubredditUrl="defaultUrl" />}
          />
          <Route path="/subreddit/*" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
