// MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { useAuth } from '../../store/auth';
import './MovieCard.css';

const MovieCard = () => {
  const { id } = useParams();
  //const { authorizationToken } = useAuth();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/movies/${id}`, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched movie:', data); // Debugging
          setMovie(data);
        } else {
          console.error('Failed to fetch movie');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const imageUrl = `http://localhost:4000${movie.imagePath}`;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={imageUrl} alt={movie.title} />
      <p>{movie.description}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Genre: {movie.genre.join(', ')}</p>
      <p>Rating: {movie.rating}</p>
      <p>Duration: {movie.duration}</p>
      <p>Language: {movie.language}</p>
      <p>Country: {movie.country}</p>
    </div>
  );
};

export default MovieCard;
