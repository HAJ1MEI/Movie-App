import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { IMAGE_URL } from "../config"; // Import IMAGE_URL

const MovieCard = ({ movie }) => {
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
    </div>
  );
};

export default MovieCard;
