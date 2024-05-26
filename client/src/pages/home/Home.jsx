import React, { useState } from 'react';
import './Home.css';
import i2 from './ms_dhoni.jpeg';
import i1 from './f_f.jpeg';
import i3 from './parasite.jpeg';
import i4 from './train.jpeg';
import i5 from './october.jpeg';

const images = [
  i1,
  i2,
  i3,
  i4,
  i5
];


const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <main className="hero-section">
      <div className="hero-text">
        <h1>Welcome to Movie Collection</h1>
        <p>Explore and create your favorite movie collections</p>
      </div>
      <div className="gallery">
        <button className="arrow arrow-left" onClick={prevImage}>&#9664;</button>
        <div className="gallery-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} className="gallery-image" />
          ))}
        </div>
        <button className="arrow arrow-right" onClick={nextImage}>&#9654;</button>
      </div>
    </main>
  );
};

export default Home;

