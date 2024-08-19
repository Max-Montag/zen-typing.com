import React from 'react';

const ResultsCard = ({ isOpen, closePopup, resetTime, typedChars, typedWords, errors }) => {
  if (!isOpen) return null;

  // const { typedChars, typedWords, errors } = stateRef.current;

  const handleClose = () => {
    resetTime();
    closePopup();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-5 bg-white rounded-md flex flex-col items-center">
        <div>
          <h2>Ergebnisse</h2>
          <p>Zeichen: {typedChars}</p>
          <p>Wörter: {typedWords}</p>
          <p>Fehler: {errors}</p>
        </div>
        <button onClick={handleClose} className="mt-5">
          Schließen
        </button>
      </div>
    </div>
  );
}

export default ResultsCard;
