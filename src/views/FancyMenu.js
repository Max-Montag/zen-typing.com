import React, { useEffect, useState, useRef } from "react";
import { GiMeditation } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { IoRocket } from "react-icons/io5";
import "./styles/fancy-menu.css";

const FancyMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [peekingCoffee, setPeekingCoffee] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect
  (() => {
    peekBuyMeACoffee();
  }, []);

  const peekBuyMeACoffee = () => {
    setPeekingCoffee(true);
    setTimeout(() => {
      setPeekingCoffee(false);
    }, 6000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div
      ref={menuRef}
      className="z-10 flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-600 ring-2 rounded-full"
      onClick={toggleMenu}
    >
      <div
        className={`flex justify-center items-center w-16 h-16 bg-gradient-to-r from-emerald-200 to-zinc-100 rounded-full ease-out hover:scale-105 hover:cursor-pointer ${
          isOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 rounded-full">
          <GiMeditation className="text-zinc-600 w-8 h-8" />
        </div>
      </div>
      <div
    className={`absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out hover:scale-105 hover:cursor-pointer ${
      (isOpen)
        ? "translate-x-[176px] translate-y-0"
        : "translate-x-0 translate-y-0 opacity-0"
    }`+` ${peekingCoffee && !isOpen ? " animate-peek" : ""}`} 
      >
        <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-600 ring-2 rounded-full shadow-2xl">
          <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-emerald-200 to-zinc-100 rounded-full">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 rounded-full">
              <SiBuymeacoffee className="text-zinc-600 w-8 h-8" />
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
              <FaLaptopCode className="text-zinc-600 w-8 h-8" />
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
              <IoRocket className="text-zinc-600 w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyMenu;
