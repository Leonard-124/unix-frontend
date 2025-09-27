
import React from "react";
import Navbar from "../../Pages/Navbar";

const Card3 = () => {
  const inventors = [
    {
      name: "1. Leonardo da Vinci (1452–1519, Italy)",
      desc: "Often celebrated as one of the greatest minds of the Renaissance, Leonardo da Vinci wasn’t only a painter but also a visionary inventor. His notebooks are filled with sketches of machines far ahead of his time—flying machines, armored vehicles, hydraulics, and even an early version of the helicopter. Although many of his designs were never built, his ability to imagine technology centuries before it was possible demonstrates his unmatched ingenuity. He laid a foundation for modern engineering and aeronautics.",
    },
    {
      name: "2. Thomas Edison (1847–1931, USA)",
      desc: "Edison is often called “America’s greatest inventor,” holding over 1,000 patents. His most famous invention, the practical incandescent light bulb, transformed society by extending productive hours beyond daylight. He also developed the phonograph and key improvements to the motion picture camera. Edison’s impact went beyond individual inventions—he created entire industries, from electric power distribution to recorded music and film.",
    },
    {
      name: "3. Nikola Tesla (1856–1943, Serbia/USA)",
      desc: "Tesla’s brilliance lies in his contributions to electricity and electromagnetism. He pioneered alternating current (AC), which powers the modern world, and developed the Tesla coil, radio wave technology, and early ideas of wireless power transmission. Though underappreciated in his lifetime, his visionary concepts—like wireless communication and renewable energy—proved him to be far ahead of his era.",
    },
    {
      name: "4. Alexander Graham Bell (1847–1922, Scotland/USA)",
      desc: "Best known for inventing the telephone, Bell revolutionized global communication. His invention turned the world into a connected network, shaping business, politics, and personal life forever. Bell also made contributions in aviation, hydrofoils, and optical telecommunications, and his humanitarian work with the deaf community highlighted how invention can serve both science and society.",
    },
    {
      name: "5. Johannes Gutenberg (1400–1468, Germany)",
      desc: "Gutenberg’s invention of the mechanical printing press in the mid-15th century is considered one of the most transformative events in human history. By making books affordable and widely available, he fueled the spread of knowledge, literacy, and ideas, directly leading to the Renaissance, Reformation, and Scientific Revolution.",
    },
    {
      name: "6. James Watt (1736–1819, Scotland)",
      desc: "Watt’s improvements to the steam engine were pivotal in driving the Industrial Revolution. By enhancing efficiency and power, his innovations enabled factories, transportation, and mechanized agriculture to flourish, reshaping societies and economies.",
    },
    {
      name: "7. Wright Brothers (Orville: 1871–1948, Wilbur: 1867–1912, USA)",
      desc: "Orville and Wilbur Wright are credited with inventing and successfully flying the world’s first powered, controlled airplane in 1903. Their achievement forever changed human transportation, shrinking the globe by making long-distance travel possible.",
    },
    {
      name: "8. Marie Curie (1867–1934, Poland/France)",
      desc: "Curie discovered the elements polonium and radium, and her research led to the development of X-ray machines, radiation therapy for cancer, and nuclear science. She was the first woman to win a Nobel Prize, and the only person to win in two different scientific fields.",
    },
    {
      name: "9. Tim Berners-Lee (1955–Present, UK)",
      desc: "Berners-Lee invented the World Wide Web in 1989 while working at CERN. His creation of web browsers, HTML, and hyperlinks transformed the internet into a user-friendly global platform, revolutionizing communication, commerce, and education.",
    },
    {
      name: "10. Steve Jobs (1955–2011, USA)",
      desc: "Jobs was not a traditional inventor but an innovator and visionary entrepreneur who redefined personal technology. As co-founder of Apple, he helped create the Macintosh, iPod, iPhone, and iPad—devices that reshaped entire industries.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-10">
          Greatest Inventors in History
        </h1>

        <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6 sm:p-10 space-y-8">
          {inventors.map((inventor, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {inventor.name}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {inventor.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card3;