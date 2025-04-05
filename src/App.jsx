// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import AnimeList from './components/AnimeList';
import AnimeDetails from './components/AnimeDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* The Anime listing page */}
        <Route path="/" element={<AnimeList />} />
        {/* The dedicated details page */}
        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
