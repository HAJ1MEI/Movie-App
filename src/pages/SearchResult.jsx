import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY, BASE_URL, IMAGE_URL } from "../config";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const SearchResult = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${currentPage}`);
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Search Results for "{query}"</h1>
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p className="text-center">No results found for "{query}". Try a different search.</p>
        )}
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default SearchResult;
