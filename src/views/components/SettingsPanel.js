import React, { useEffect, useContext } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { SettingsContext } from "./../SettingsContext";

const SettingsPanel = ({ isOpen, closePopup }) => {
  const {
    bgMusicVolume,
    setBgMusicVolume,
    soundEffectsVolume,
    setSoundEffectsVolume,
    selectedSentencesFile,
    setSelectedSentencesFile,
    availableSentencesFiles,
  } = useContext(SettingsContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
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
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full mx-4 md:w-1/2 min-h-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl shadow-xl transform scale-95 transition-transform duration-300 ease-in-out">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-emerald-700 hover:text-emerald-200 transition-colors duration-300 ease-in-out"
        >
          <LiaTimesSolid className="w-5 h-5" />
        </button>

        <div className="w-full flex flex-col gap-8 mt-6 px-8">
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/3 text-xl truncate font-semibold text-emerald-700">
              Lautstärke der Hintergrundmusik
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bgMusicVolume}
              onChange={(e) => setBgMusicVolume(parseFloat(e.target.value))}
              className="w-1/3 max-w-1/3 mx-4"
            />
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/4 truncate text-xl font-semibold text-emerald-700">
              Effektlautstärke
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={soundEffectsVolume}
              onChange={(e) =>
                setSoundEffectsVolume(parseFloat(e.target.value))
              }
              className="w-1/3 max-w-1/3 mx-4"
            />
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              Wortschatz
            </label>
            <select
              value={selectedSentencesFile}
              onChange={(e) => setSelectedSentencesFile(e.target.value)}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 border text-center border-emerald-700 rounded p-2"
            >
              {availableSentencesFiles.map((file, index) => (
                <option key={index} value={file}>
                  {file}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="mt-12 mx-6 w-3/4 md:w-1/2 px-6 py-2 bg-emerald-700 bg-opacity-40 text-white ring-2 ring-zinc-100 rounded-full shadow-xl hover:bg-emerald-500 hover:bg-opacity-40 transition-colors duration-300 ease-in-out"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
