import React, { useState } from "react";
import { GiMeditation } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { IoRocket } from "react-icons/io5";

const FancyMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex justify-center items-center w-24 h-24 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-600 ring-2 rounded-full"
      onClick={toggleMenu}
    >
      <div className={`flex justify-center items-center w-20 h-20 bg-gradient-to-r from-emerald-200 to-zinc-100 rounded-full ease-out hover:cursor-pointer ${
        isOpen
          ? "opacity-50"
          : "opacity-100"
      }`}>
        <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-zinc-100 to-emerald-200 rounded-full">
          <GiMeditation className="text-zinc-600 w-9 h-9" />
        </div>
      </div>
      <div
        className={`absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out hover:scale-105 hover:cursor-pointer ${
          isOpen
            ? "translate-x-[176px] translate-y-0"
            : "translate-x-0 translate-y-0 opacity-0"
        }`}
      >
        <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-600 ring-2 rounded-full shadow-2xl">
          <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-emerald-200 to-zinc-100 rounded-full">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 rounded-full">
              
              <SiBuymeacoffee className="text-zinc-600 w-9 h-9" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out hover:scale-105 hover:cursor-pointer ${
          isOpen
            ? "translate-x-[88px] translate-y-[88px]"
            : "translate-x-0 translate-y-0 opacity-0"
        }`}
      >
        <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-600 ring-2 rounded-full shadow-2xl">
          <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-emerald-200 to-zinc-100 rounded-full">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 rounded-full">
            <FaLaptopCode className="text-zinc-600 w-9 h-9" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out hover:scale-105 hover:cursor-pointer ${
          isOpen
            ? "translate-x-0 translate-y-[176px]"
            : "translate-x-0 translate-y-0 opacity-0"
        }`}
      >
        <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-600 ring-2 rounded-full shadow-2xl">
          <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-emerald-200 to-zinc-100 rounded-full">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 rounded-full">
              <IoRocket className="text-zinc-600 w-9 h-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyMenu;
