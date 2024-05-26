import React, { useState, useEffect } from 'react';
import './UserMovies.css';
import { useAuth } from '../../store/auth'; // Assuming you have access to useAuth for getting the authorization token

const UserMovies = () => {
  const { authorizationToken,userAuthentication } = useAuth(); // Assuming you have access to the authorization token using useAuth
  const [userMovies, setUserMovies] = useState([]);
  
  useEffect(() => {
    const fetchMoviesForUser = async () => {
      try {
        const userData = await userAuthentication(authorizationToken); // Fetch user data including user ID
        if (!userData) {
          console.error('User data not available.');
          return;
        }
        
        const userId = userData._id; // Extract the user ID from the user data
        const response = await fetch(`http://localhost:4000/api/movies/${userId}/movies`, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserMovies(data);
        } else {
          console.error('Error fetching user movies:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user movies:', error);
      }
    };

    fetchMoviesForUser();
  }, [authorizationToken]);

  return (
    <div className="user-movies-container">
      <h2 className="user-movies-heading">My Movies</h2>
      <div className="user-movies-list">
        {userMovies.map(movie => (
          <div key={movie._id} className="user-movie-item">
            <h3>{movie.title}</h3>
            <img src={`http://localhost:4000${movie.imagePath}`} alt={movie.title} />
            {/* Render other movie details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMovies;


