import Movie from '../models/MovieModel.js'; // Adjust the path as needed
import User from "../models/UserModel.js";


export const createMovie = async (req, res) => {
    try {
        const { userId, title, description, releaseYear, genre, rating, duration, language, country } = req.body;
        const imagePath = `/upload/${req.file.filename}`; // Change to '/upload/' instead of 'public/upload/'
        
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Fetch the user information based on the userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new movie document with userId and other details
        const movie = new Movie({ 
            userId, 
            title, 
            description, 
            releaseYear, 
            genre, 
            rating, 
            duration, 
            language, 
            country, 
            imagePath 
        });

        await movie.save(); // Save the movie document to the database

        res.status(201).json(movie); // Respond with the created movie document
    } catch (error) {
        res.status(500).json({ message: error.message, extraDetails: 'Error from Backend' });
    }
};

export const getAllMovies = async (req, res) => {
    try {
        // Retrieve all movies from the database
        const movies = await Movie.find();

        // Send response with the list of movies
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateMovie = async (req, res) => {
    try {
        // Extract movie ID and updated data from request body
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the movie in the database
        const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });

        // Send response with the updated movie
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        // Extract movie ID from request parameters
        const { id } = req.params;

        // Find and delete the movie from the database
        await Movie.findByIdAndDelete(id);

        // Send response
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Function to get a movie by ID
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);

        console.log('Fetched movie:', movie); // Add this line to debug

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        movie.imagePath = movie.imagePath.replace(/\\/g, '/');
        res.status(200).json(movie);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
export const getUserMovies = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Movie.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  