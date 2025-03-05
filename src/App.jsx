import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import SearchResult from './pages/SearchResult'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import Favorite from "./pages/Favorite";
import { FavoriteProvider } from './context/FavoriteContext'

function App() {
  return (
    <FavoriteProvider>
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/favorites" element={<Favorite />} /> 
        </Routes>
      </div>
    </Router>
    </FavoriteProvider>
  )
}

export default App
