

import React from "react";
import cofee from "../assets/Arts/coffee-cup.png";

const Buymecofee = () => {
  return (
    <div className="fixed bottom-4 right-8 z-50 animate-bounce">
      <a
        href="https://buymeacoffee.com/leonardoduor/l-4049902"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={cofee}
          alt="Buy me a coffee"
          className="w-[65px] h-[60px] drop-shadow-lg transition-transform transform hover:scale-110 hover:rotate-6"
        />
      </a>
    </div>
  );
};

export default Buymecofee;
