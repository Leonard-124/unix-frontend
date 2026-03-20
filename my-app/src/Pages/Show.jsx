

// import React from "react";
// import hague from "../assets/Arts/hague.jpg";
// import cottonbro from "../assets/Arts/cottonbro.jpg";
// import bulb from "../assets/Arts/bulb.jpg";
// import fotios from "../assets/Arts/fotios.jpg";

// const images = [
//   { id: 1, src: hague, text: "Best Art of 2025", link: "/card1" },
//   { id: 2, src: cottonbro, text: "Top 30 best Artists in the world", link: "/card2" },
//   { id: 3, src: bulb, text: "Best inventers of all time", link: "/card3" },
//   { id: 4, src: fotios, text: "Why choose Art/Design?", link: "/card4" },
// ];

// const Show = () => {
//   return (
//     <section className="mt-20 bg-[#f5f5f5] py-10">
//       <h1 className="text-center font-bold text-2xl sm:text-3xl mb-8">Featured</h1>

//       {/* Responsive Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16">
//         {images.map((image) => (
//           <div
//             key={image.id}
//             className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
//           >
//             {/* Image */}
//             <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
//               <img
//                 src={image.src}
//                 alt={image.text}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Text + Link */}
//             <div className="p-4 flex flex-col items-center text-center">
//               <h2 className="font-mono tracking-wide text-lg sm:text-xl mb-2">
//                 {image.text}
//               </h2>
//               <a
//                 href={image.link}
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 Read More
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Show;
/////////////////////////////////////////////////

import React from "react";
import { Link } from "react-router-dom";
import hague from "../assets/Arts/hague.jpg";
import suzyalwhood from "../assets/Arts/suzyalwhood2.jpg";
import nicigoten from "../assets/Arts/nicigoten.jpg"
import fotios from "../assets/Arts/fotios.jpg";

// FIX: use Link from react-router-dom instead of <a href> for internal routes
const images = [
  { id: 1, src: hague,     text: "Best Art of 2026",                   sub: "Editorial",   link: "/best_art" },
  { id: 2, src: suzyalwhood, text: "Top 30 Best Artists in the World",   sub: "Culture",     link: "/top_best" },
  { id: 3, src: nicigoten,      text: "Best Inventors of All Time",         sub: "Innovation",  link: "/best_inventors" },
  { id: 4, src: fotios,    text: "Why Choose Art & Design?",           sub: "Perspective", link: "/why_choose_art_design" },
];

const Show = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .show-card { animation: fadeUp 0.5s ease both; }
        .show-card .show-img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .show-card:hover .show-img { transform: scale(1.05); }
        .show-card:hover .show-overlay { opacity: 1; }
      `}</style>

      <section
        className="bg-[#fafaf8] py-20 px-6 sm:px-10 lg:px-16"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Header */}
        <header className="text-center mb-14">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
            Editorial
          </p>
          <h2
            className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Featured
          </h2>
          <div className="w-10 h-px bg-neutral-800 mx-auto" />
        </header>

        {/* Grid — first card spans 2 cols on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, i) => (
            <Link
              key={image.id}
              to={image.link}
              className={`show-card group flex flex-col bg-white border border-neutral-100 overflow-hidden
                ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              `}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden w-full"
                style={{ paddingBottom: i === 0 ? "56%" : "80%" }}
              >
                <img
                  src={image.src}
                  alt={image.text}
                  className="show-img absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="show-overlay absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 flex items-end p-5">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white border-b border-white/60 pb-0.5">
                    Read More
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col gap-2">
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400">
                  {image.sub}
                </p>
                <h3
                  className="font-light tracking-tight text-neutral-900 leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: i === 0 ? "1.5rem" : "1.15rem",
                  }}
                >
                  {image.text}
                </h3>
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400 mt-1 group-hover:text-neutral-700 transition-colors border-b border-transparent group-hover:border-neutral-400 pb-0.5 w-fit">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Show;
