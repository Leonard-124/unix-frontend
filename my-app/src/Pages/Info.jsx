
import React, { useState, useEffect, useRef, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import hague from "../assets/Arts/hague.jpg";
import cottonbro from "../assets/Arts/cottonbro.jpg";
import googledeep from "../assets/Arts/googledeepmind.jpg"

const slides = [
  {
    text: "Beautiful Mountain View",
    image: hague,
    link: "https://example.com/mountain",
  },
  {
    text: "Sunny Beach Paradise",
    image: cottonbro,
    link: "https://example.com/beach",
  },
  {
    text: "City Skyline at Night",
    image: googledeep,
    link: "https://example.com/city",
  },
];

const Info = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSlide, setShowSlide] = useState(false);
  const intervalRef = useRef(null);

  const advanceSlide = useCallback((direction = 1) => {
    setCurrentIndex((prev) => (prev + direction + slides.length) % slides.length);
  }, []);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => advanceSlide(1), 8000);
  }, [advanceSlide]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlide(true);
      startAutoPlay();
    }, 3000);

    return () => {
      clearTimeout(timer);
      stopAutoPlay();
    };
  }, [startAutoPlay, stopAutoPlay]);

  if (!showSlide) {
    return (
      <div className="text-center py-6 text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-4 mx-auto p-4 w-full container mt-20"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/70 rounded-lg shadow-md p-4">
        {/* Left Arrow */}
        <button
          className="text-3xl hidden md:block p-2 hover:text-red-500 transition md:self-center"
          onClick={() => advanceSlide(-1)}
        >
          <HiChevronLeft />
        </button>

        {/* Text + Link */}
        <div className="flex flex-col items-center justify-center md:w-1/3 text-center">
          <p className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
            {slides[currentIndex].text}
          </p>
          <a
            href={slides[currentIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 underline-offset-4 hover:underline"
          >
            Visit Link
          </a>
        </div>
        

        {/* Image + Right Arrow */}
        <div className="flex items-center w-full md:w-2/3">
        <button
          className="text-3xl md:hidden p-2 hover:text-red-500 transition md:self-center"
          onClick={() => advanceSlide(-1)}
        >
          <HiChevronLeft />
        </button>
          <div className="relative w-full h-64 sm:h-80 md:h-[500px] overflow-hidden rounded-md">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].text}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          </div>
          <button
            className="text-3xl p-2 hover:text-red-500 transition md:self-center"
            onClick={() => advanceSlide(1)}
          >
            <HiChevronRight />
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2 mt-2 justify-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`p-[6px] rounded-full   transition-colors duration-500 ${
              index === currentIndex ? "bg-red-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Info;