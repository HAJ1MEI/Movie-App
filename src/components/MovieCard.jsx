import React from "react";
import { Link } from "react-router-dom"; 
import { IMAGE_URL } from "../config"; 
import { useFavorite } from "../context/FavoriteContext";

const MovieCard = ({ movie }) => {
  const { state, dispatch } = useFavorite();
  const { favorites } = state;
  
  let isFavorite = favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie.id });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie });
    }
  };

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">⭐ {movie.vote_average}/10</p>
        </div>
      </Link>
      <button 
        onClick={toggleFavorite} 
        className={`favorite-btn ${isFavorite ? "remove" : "add"}`}
        style={{
          padding: "10px 15px",
          margin: "10px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: isFavorite ? "#ff4757" : "#1e90ff",
          color: "white",
          fontWeight: "bold",
          transition: "0.3s ease",
        }}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
