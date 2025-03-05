import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL, IMAGE_URL } from "../config";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setSimilarMovies(data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        const trailerVideo = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");
        if (trailerVideo) {
          setTrailer(`https://www.youtube.com/watch?v=${trailerVideo.key}`);
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setCast(data.cast.slice(0, 10)); // Get only first 10 cast members
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchMovieDetails();
    fetchSimilarMovies();
    fetchMovieTrailer();
    fetchMovieCast();
  }, [id]);

  if (!movie) {
    return <p className="text-center">Loading movie details...</p>;
  }

  return (
    <div className="container mt-4 text-white" style={{ backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px', borderRadius: '10px' }}>
      <div className="overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "20px", borderRadius: "10px" }}>
        <h1 className="text-center mb-4">{movie.title}</h1>
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} className="img-fluid rounded" style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div className="col-md-8">
            <h4 className="mb-3">Overview</h4>
            <p className="mb-3">{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10</p>
            <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
            {trailer && <a href={trailer} target="_blank" rel="noopener noreferrer" className="btn btn-danger mt-3">Watch Trailer</a>}
          </div>
        </div>
        
        <h3 className="mt-5">Cast</h3>
        <div className="row justify-content-center">
          {cast.map((member) => (
            <div key={member.id} className="col-md-2 text-center mb-3">
              <img src={`${IMAGE_URL}${member.profile_path}`} alt={member.name} className="rounded-circle" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
              <p className="mt-2 text-truncate text-center" style={{ maxWidth: '120px' }}>{member.name}</p>
            </div>
          ))}
        </div>
        
        <h3 className="mt-5">Similar Movies</h3>
        <div className="row">
          {similarMovies.map((similar) => (
            <div key={similar.id} className="col-md-3 mb-4">
              <div className="card bg-dark text-white">
                <img src={`${IMAGE_URL}${similar.poster_path}`} alt={similar.title} className="card-img-top" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title text-truncate" style={{ maxWidth: '200px' }}>{similar.title}</h5>
                  <p className="card-text">⭐ {similar.vote_average}/10</p>
                  <a href={`/movie/${similar.id}`} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
