

import React from "react";
import hague from "../assets/Arts/hague.jpg";
import cottonbro from "../assets/Arts/cottonbro.jpg";
import bulb from "../assets/Arts/bulb.jpg";
import fotios from "../assets/Arts/fotios.jpg";

const images = [
  { id: 1, src: hague, text: "Best Art of 2025", link: "/card1" },
  { id: 2, src: cottonbro, text: "Top 30 best Artists in the world", link: "/card2" },
  { id: 3, src: bulb, text: "Best inventers of all time", link: "/card3" },
  { id: 4, src: fotios, text: "Why choose Art/Design?", link: "/card4" },
];

const Show = () => {
  return (
    <section className="mt-20 bg-[#f5f5f5] py-10">
      <h1 className="text-center font-bold text-2xl sm:text-3xl mb-8">Featured</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
              <img
                src={image.src}
                alt={image.text}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text + Link */}
            <div className="p-4 flex flex-col items-center text-center">
              <h2 className="font-mono tracking-wide text-lg sm:text-xl mb-2">
                {image.text}
              </h2>
              <a
                href={image.link}
                className="text-blue-600 hover:underline font-medium"
              >
                View More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Show;

