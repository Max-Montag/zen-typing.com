import React from 'react';

const ResultsCard = ({ isOpen, closePopup, resetTime, typedChars, typedWords, errors }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    resetTime();
    closePopup();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="w-1/2 h-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl shadow-xl transform scale-95 transition-transform duration-300 ease-in-out">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-emerald-700 mb-4">Ergebnisse</h2>
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700">Wörter: {typedWords}</p>
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700">Zeichen: {typedChars}</p>
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-700">Falsche Zeichen: {errors}</p>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 px-6 py-2 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 transition-colors duration-300 ease-in-out"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

export default ResultsCard;
