import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

import { API_KEY, BASE_URL, IMAGE_URL } from "../config";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`);
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Top Rated Movies</h1>
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <MovieCard movie={movie} /> 
            </div>
          ))
        ) : (
          <p className="text-center">Loading top-rated movies...</p>
        )}
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default TopRated;
