import React from "react";
import MovieCard from "../components/MovieCard";
import { useFavorite } from "../context/FavoriteContext";

const Favorite = () => {
  const { state } = useFavorite();
  const { favorites } = state;

  return (
    <div className="container">
      <h1 className="text-center my-4">My Favorite Movies</h1>
      {favorites.length > 0 ? (
        <div className="row">
          {favorites.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No favorite movies added yet.</p>
      )}
    </div>
  );
};

export default Favorite;
