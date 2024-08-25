import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { IoRocket, IoMenu } from "react-icons/io5";
import "./../styles/header-menu.css";

const HeaderMenu = ({ ableToBegRef, isOpen, closePopup }) => {
  const navigate = useNavigate();
  const [peekingCoffee, setPeekingCoffee] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (ableToBegRef.current === true) {
        peekBuyMeACoffee();
      } else {
        const intervalId = setInterval(() => {
          const ableToBeg = ableToBegRef.current;
          if (ableToBeg === true) {
            peekBuyMeACoffee();
            clearInterval(intervalId);
          }
        }, 2000);
      }
    }, 60000);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAboutClick = () => {
    if (isOpen) navigate("/about");
  };

  const peekBuyMeACoffee = () => {
    setPeekingCoffee(true);
    setTimeout(() => {
      setPeekingCoffee(false);
    }, 4000);
  };

  return (
    <div
      ref={menuRef}
      className="z-10 flex justify-center items-center w-16 h-16 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-300 ring-1 shadow-xl rounded-full"
    >
      <div
        className={`flex justify-center items-center w-8 h-8 bg-gradient-to-r from-zinc-100 to-emerald-200 shadow-xl rounded-full ${isOpen ? "opacity-50" : "opacity-80"}`}
      >
        <IoMenu className="text-zinc-600 w-6 h-6" />
      </div>
      <div
        className={
          `absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out hover:scale-105 hover:cursor-pointer ${
            isOpen
              ? "translate-x-[130px] translate-y-[130px]"
              : "translate-x-0 translate-y-0 opacity-0"
          }` + ` ${peekingCoffee && !isOpen ? " animate-peek-move" : ""}`
        }
      >
        <a
          href="https://buymeacoffee.com/maxmontag1j"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-300 ring-1 shadow-xl rounded-full shadow-2xl">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 shadow-xl rounded-full">
              <SiBuymeacoffee
                className={`text-zinc-600 w-8 h-8 ${peekingCoffee && !isOpen ? " animate-peek-rotation" : ""}`}
              />
            </div>
          </div>
        </a>
      </div>
      <div
        className={`absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-800 ease-out hover:scale-105 hover:cursor-pointer ${
          isOpen
            ? "translate-x-[100px] translate-y-[20px]"
            : "translate-x-0 translate-y-0 opacity-0"
        }`}
      >
        <a
          href="https://github.com/Max-Montag/zen_typing_experience"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-300 ring-1 shadow-xl rounded-full shadow-2xl">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 shadow-xl rounded-full">
              <FaLaptopCode className="text-zinc-600 w-8 h-8" />
            </div>
          </div>
        </a>
      </div>
      <div
        className={`absolute top-inherit left-inherit transform -translate-x-1/2 -translate-y-1/2 transition-all duration-800 ease-out hover:scale-105 hover:cursor-pointer ${
          isOpen
            ? "translate-x-[20px] translate-y-[100px]"
            : "translate-x-0 translate-y-0 opacity-0"
        }`}
        onClick={handleAboutClick}
      >
        <div className="flex justify-center items-center w-20 h-20 bg-gradient-to-r from-zinc-100 to-emerald-200 ring-zinc-300 ring-1 shadow-xl rounded-full shadow-2xl">
          <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r from-zinc-100 to-emerald-200 shadow-xl rounded-full">
            <IoRocket className="text-zinc-600 w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
