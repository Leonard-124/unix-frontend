
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// import hague from "../assets/Arts/hague.jpg";
// import cottonbro from "../assets/Arts/cottonbro.jpg";
// import googledeep from "../assets/Arts/googledeepmind.jpg"

// const slides = [
//   {
//     text: "Beautiful Mountain View",
//     image: hague,
//     link: "https://example.com/mountain",
//   },
//   {
//     text: "Sunny Beach Paradise",
//     image: cottonbro,
//     link: "https://example.com/beach",
//   },
//   {
//     text: "City Skyline at Night",
//     image: googledeep,
//     link: "https://example.com/city",
//   },
// ];

// const Info = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showSlide, setShowSlide] = useState(false);
//   const intervalRef = useRef(null);

//   const advanceSlide = useCallback((direction = 1) => {
//     setCurrentIndex((prev) => (prev + direction + slides.length) % slides.length);
//   }, []);

//   const startAutoPlay = useCallback(() => {
//     intervalRef.current = setInterval(() => advanceSlide(1), 8000);
//   }, [advanceSlide]);

//   const stopAutoPlay = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSlide(true);
//       startAutoPlay();
//     }, 3000);

//     return () => {
//       clearTimeout(timer);
//       stopAutoPlay();
//     };
//   }, [startAutoPlay, stopAutoPlay]);

//   if (!showSlide) {
//     return (
//       <div className="text-center py-6 text-lg font-medium text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div
//       className="flex flex-col gap-4 mx-auto p-4 w-full max-w-7xl mt-20"
//       onMouseEnter={stopAutoPlay}
//       onMouseLeave={startAutoPlay}
//     >
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/70 rounded-lg shadow-md p-4">
//         {/* Left Arrow */}
//         <button
//           className="text-3xl p-2 hover:text-blue-500 transition md:self-center"
//           onClick={() => advanceSlide(-1)}
//         >
//           <HiChevronLeft />
//         </button>

//         {/* Text + Link */}
//         <div className="flex flex-col items-center justify-center md:w-1/3 text-center">
//           <p className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
//             {slides[currentIndex].text}
//           </p>
//           <a
//             href={slides[currentIndex].link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline"
//           >
//             Visit Link
//           </a>
//         </div>

//         {/* Image + Right Arrow */}
//         <div className="flex items-center w-full md:w-2/3">
//           <div className="relative w-full h-64 sm:h-80 md:h-[400px] overflow-hidden rounded-md">
//             <img
//               src={slides[currentIndex].image}
//               alt={slides[currentIndex].text}
//               className="w-full h-full object-cover transition-opacity duration-1000"
//             />
//           </div>
//           <button
//             className="text-3xl p-2 hover:text-blue-500 transition md:self-center"
//             onClick={() => advanceSlide(1)}
//           >
//             <HiChevronRight />
//           </button>
//         </div>
//       </div>

//       {/* Progress Dots */}
//       <div className="flex gap-2 mt-2 justify-center">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`h-2 w-8 sm:w-12 rounded-full transition-colors duration-500 ${
//               index === currentIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Info;

////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef, useCallback } from "react";
import eastart from "../assets/Arts/eastart.png";
import mask_art from "../assets/Arts/mask_art.png";
import wall_hanging from "../assets/Arts/wall_hanging.png";

const slides = [
  {
    eyebrow: "Woodart",
    text: "African map on art",
    image: eastart,
    link: "/buy",
  },
  {
    eyebrow: "Culture decorum",
    text: "Well engraved and curved masks nice for embracing cultures.",
    image: mask_art,
    link: "/buy",
  },
  {
    eyebrow: "Artwork",
    text: "A collection you can hang on your dining wall.",
    image: wall_hanging,
    link: "/buy",
  },
];

const Info = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef(null);

  const goTo = useCallback((index, dir = 1) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const advance = useCallback((dir = 1) => {
    const next = (current + dir + slides.length) % slides.length;
    goTo(next, dir);
  }, [current, goTo]);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // FIX: 3s delay before showing was jarring UX — reduced to a simple mount fade
    const t = setTimeout(() => setReady(true), 100);
    startAutoPlay();
    return () => { clearTimeout(t); stopAutoPlay(); };
  }, [startAutoPlay, stopAutoPlay]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .info-ready { animation: fadeIn 0.6s ease both; }
        .slide-text  { animation: slideUp 0.45s ease both; }
      `}</style>

      <section
        className={`bg-[#fafaf8] py-0 ${ready ? "info-ready" : "opacity-0"}`}
        style={{ fontFamily: "'DM Mono', monospace" }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[540px]">

          {/* ── Left: image ── */}
          <div className="relative overflow-hidden order-2 lg:order-1 h-72 sm:h-96 lg:h-full">
            <img
              key={current}
              src={slide.image}
              alt={slide.text}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: animating ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            />
            {/* Subtle dark gradient on the right edge to blend into content */}
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#fafaf8] hidden lg:block" />
          </div>

          {/* ── Right: content ── */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 lg:py-0 gap-8">

            {/* Slide text */}
            <div key={current} className="slide-text flex flex-col gap-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                {slide.eyebrow}
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {slide.text}
              </h2>
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-800 border-b border-neutral-800 hover:text-neutral-400 hover:border-neutral-400 transition-colors pb-0.5 w-fit"
              >
                Get Now →
              </a>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Prev */}
              <button
                onClick={() => advance(-1)}
                className="w-10 h-10 border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all cursor-pointer active:scale-95"
                aria-label="Previous slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Progress dots */}
              <div className="flex gap-2 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="cursor-pointer transition-all duration-400"
                    style={{
                      height: "2px",
                      width: i === current ? "32px" : "12px",
                      background: i === current ? "#171717" : "#d4d4d4",
                      border: "none",
                      padding: 0,
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => advance(1)}
                className="w-10 h-10 border border-neutral-300 flex items-center justify-center text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all cursor-pointer active:scale-95"
                aria-label="Next slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Slide count */}
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 ml-auto">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;