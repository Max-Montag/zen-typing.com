import React, { useEffect } from 'react';
import { LiaTimesSolid } from "react-icons/lia";

const ResultsCard = ({ isOpen, closePopup, resetTime, typedChars, typedWords, errors }) => {
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    resetTime();
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full mx-4 md:w-1/2 min-h-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl shadow-xl transform scale-95 transition-transform duration-300 ease-in-out">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-emerald-700 hover:text-emerald-900 transition-colors duration-300 ease-in-out"
        >
          <LiaTimesSolid className="w-8 h-8"/>
        </button>
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-emerald-700 mb-4">Ergebnisse</h2>
          <p className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700">Wörter: {typedWords}</p>
          <p className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700">Zeichen: {typedChars}</p>
          <p className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700">Falsche Zeichen: {errors}</p>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 mx-12 px-6 py-2 bg-teal-500 bg-opacity-20 text-white rounded-full shadow-xl hover:bg-emerald-600 transition-colors duration-300 ease-in-out"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

export default ResultsCard;
