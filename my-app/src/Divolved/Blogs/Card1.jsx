

import React from "react";
import Navbar from "../../Pages/Navbar";
import cottonbro from "../../assets/Arts/cottonbro.jpg";

const Card1 = () => {
  return (
    <>
      <Navbar />
      <div className="mt-28 px-4 sm:px-6 lg:px-12">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-10">
          Global Art Highlights 2025
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Asia / Africa / Middle-East */}
          <div className="bg-white rounded-lg shadow p-4 border">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={cottonbro}
                alt="Asia Africa Middle-East"
                className="w-24 h-24 object-cover rounded"
              />
              <h2 className="text-lg sm:text-xl font-semibold">
                Asia / Africa / Middle-East
              </h2>
            </div>
            <div className="font-light text-gray-700 space-y-3 text-sm sm:text-base leading-relaxed">
              <p>
                A standout in this region is Yayoi Kusama’s retrospective at the
                National Gallery of Victoria in Melbourne. It brings together
                works over many decades of her career, including immersive
                installations like Narcissus Garden and her signature mirrored
                spheres that invite a sensorial experience.
              </p>
              <p>
                Another compelling example is <em>One Must Be Seated</em> by Rita
                Mawuena Benissan at Zeitz MOCAA, Cape Town. The artist explores
                Ghanaian cultural symbols and ties them to identity, history,
                and power—presented in contemporary forms like photo, film,
                sculpture, and tapestry.
              </p>
            </div>
          </div>

          {/* America */}
          <div className="bg-white rounded-lg shadow p-4 border">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={cottonbro}
                alt="America"
                className="w-24 h-24 object-cover rounded"
              />
              <h2 className="text-lg sm:text-xl font-semibold">
                America (United States / Canada / Mexico)
              </h2>
            </div>
            <div className="font-light text-gray-700 space-y-3 text-sm sm:text-base leading-relaxed">
              <p>
                In North America, retrospectives like{" "}
                <em>Ai Weiwei: The Art and Activism</em> at the Seattle Art
                Museum span four decades of his works, combining political
                critique, cultural heritage, activism, and art-making into
                immersive displays.
              </p>
              <p>
                Similarly, <em>Light: Visionary Perspectives</em> at the Aga Khan
                Museum in Toronto uses installations by Olafur Eliasson and
                Anish Kapoor to explore light as both medium and metaphor,
                inviting reflection on perception, space, and architecture.
              </p>
            </div>
          </div>

          {/* Europe & UK */}
          <div className="bg-white rounded-lg shadow p-4 border">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={cottonbro}
                alt="Europe UK"
                className="w-24 h-24 object-cover rounded"
              />
              <h2 className="text-lg sm:text-xl font-semibold">Europe & UK</h2>
            </div>
            <div className="font-light text-gray-700 space-y-3 text-sm sm:text-base leading-relaxed">
              <p>
                Europe in 2025 shows a strong trend toward revisiting history,
                elevating underrepresented voices, and staging ambitious,
                immersive shows. Retrospectives that explore artists’ entire
                careers are flourishing, giving more context to their evolution.
              </p>
              <p>
                Another trend is spotlighting Indigenous artists, overlooked
                female artists, and non-European voices whose work dialogues
                with European histories—reframing narratives about power,
                identity, and cultural exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card1;

