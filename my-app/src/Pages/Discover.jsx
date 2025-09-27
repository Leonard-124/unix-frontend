
// import React from 'react'
// import roman from '../assets/Arts/roman.jpg'

// const Discover = () => {
//   return (
//     <div>
//         <div className='mt-20 bg-[#f5f5f5] h-[400px] flex  justify-between'>
//             <div className='w-1/2 flex items-center justify-center text-[30px] font-light tracking-[3.5px]'>
//                 <h1 className='text-center font-bold text-2xl'>Discover and get Art <br />and designs that inspire <br /> you only on Unix</h1>
//             </div>
//             <div>
//                 <img src={roman} alt="The Roman Colosseum" 
//                 className='w-full h-full object-cover pl-12'/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Discover
///////////////////////////////////////////////////////////////////////////////

import React from "react";
import roman from "../assets/Arts/roman.jpg";

const Discover = () => {
  return (
    <section className="mt-20 bg-[#f5f5f5] py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 gap-8">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-wide">
            Discover and get Art <br />
            and designs that inspire <br />
            you only on Unix
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Explore unique artworks and creative designs curated just for you.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full">
          <img
            src={roman}
            alt="The Roman Colosseum"
            className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Discover;

