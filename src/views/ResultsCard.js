import React, { useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";

const ResultsCard = ({
  isOpen,
  closePopup,
  resetTime,
  typedChars,
  typedWords,
  time,
  errors,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    resetTime();
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed px-2 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full mx-4 md:w-1/2 min-h-1/2 py-4 md:py-8 px-5 md:px-8 lg:px-16 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl shadow-xl transform scale-95 transition-transform duration-100 ease-in-out">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-emerald-700 hover:text-emerald-200 transition-colors duration-100 ease-in-out"
        >
          <LiaTimesSolid className="w-5 h-5" />
        </button>
        <div className="w-full text-center flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-emerald-700 mb-4">
            Deine Ergebnisse
          </h2>
          <div className="flex flex-row justify-between text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 truncate">
            <span>Wörter </span>
            <span>{typedWords}</span>
          </div>
          {time !== 60 && (
            <div className="flex flex-row justify-between text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 truncate">
              <span>Wörter pro Minute </span>
              <span>{Math.round((typedWords / time) * 60)}</span>
            </div>
          )}
          <div className="flex flex-row justify-between text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 truncate">
            <span>Zeichen </span>
            <span>{typedChars}</span>
          </div>
          <div className="flex flex-row justify-between text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700 truncate">
            <span>Fehler </span>
            <span>{errors}</span>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="mt-8 mx-6 w-3/4 md:w-1/2 px-6 py-2 bg-emerald-700 bg-opacity-40 text-white ring-2 ring-zinc-100 rounded-full shadow-xl hover:bg-emerald-500 hover:bg-opacity-40 transition-colors duration-100 ease-in-out"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default ResultsCard;
