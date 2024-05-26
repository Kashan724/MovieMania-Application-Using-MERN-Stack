import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import './Navbar.css'; // Ensure you have this CSS file imported

const Navbar = () => {
  const { LogoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-heading">
        <h1>MovieMania</h1>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/register">Register</Link></li>
        <li className="navbar-item"><Link to="/login">Login</Link></li>
        <li className="navbar-item"><Link to="/movies">Movies</Link></li>
        <li className="navbar-item"><Link to="/movies-form">Create Your Own</Link></li>
        <li className="navbar-item"><Link to="/my-movies">My Movies</Link></li>
        <li className="navbar-item logout-item">
          <Link to="/login" onClick={LogoutUser}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;



