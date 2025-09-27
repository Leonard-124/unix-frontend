
////////////////////////////////////////////////////////////////////////////////////////////


import React from "react";
import Navbar from "../../Pages/Navbar";

const Card2 = () => {
  const artists = [
    {
      name: "Leonardo da Vinci (1452-1519, Italy)",
      desc: "A polymath; painter of Mona Lisa, The Last Supper, contributions to anatomy, engineering and science; huge influence",
    },
    {
      name: "Michelangelo Buonarroti (1475-1564, Italy)",
      desc: "Master sculptor and painter; David, the Sistine Chapel ceiling; known for incredible anatomical skill and emotional power.",
    },
    {
      name: "Pablo Picasso (1881-1973, Spain/France)",
      desc: "Pioneer of Cubism; always innovating; prolific; works like Guernica show deep engagement with politics, war, human.",
    },
    {
      name: "Vincent van Gogh (1853-1890, Netherlands/France)",
      desc: "Intense emotional expression through color, brushwork; influence on modern art far beyond his lifetime.",
    },
    {
      name: "Rembrandt van Rijn (1606-1669, Netherlands)",
      desc: "Master of light and shadow, deep psychological portraiture; innovative in rendering human emotion.",
    },
    {
      name: "Claude Monet (1840-1926, France)",
      desc: "Founder / leader of Impressionism; light, color, capturing fleeting moments in nature.",
    },
    {
      name: "Salvador Dalí (1904-1989, Spain)",
      desc: "Central to Surrealism; imaginative, strange, dream-like works that push the boundaries of reality.",
    },
    {
      name: "Frida Kahlo (1907-1954, Mexico)",
      desc: "Deeply personal, symbolic, often exploring identity, pain, culture; color, form, storytelling.",
    },
    {
      name: "Georgia O’Keeffe (1887-1986, USA)",
      desc: "Modernist pioneer; distinctive style with flowers, landscapes, abstraction; influence in American art.",
    },
    {
      name: "Jackson Pollock (1912-1956, USA)",
      desc: "Key figure in Abstract Expressionism; his drip paintings embodied a radical new direction in modern art.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-10">
          Top Artists in History
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {artist.name}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {artist.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card2;