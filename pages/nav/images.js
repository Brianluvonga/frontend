import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = ["/shop2.png", "/shop4.png", "/image3.jpg"];

  // Function to handle automatic carousel slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to reset the carousel timer when the component mounts or the activeIndex changes
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds (5000 milliseconds)
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [activeIndex]);

  return (
    <div className="carousel">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`carousel-item ${
            index === activeIndex ? "active" : "hidden"
          }`}
        >
          <img src={imageUrl} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
