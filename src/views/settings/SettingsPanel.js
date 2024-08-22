import React, { useEffect, useContext } from "react";
import { LiaTimesSolid  } from "react-icons/lia";
import { IoVolumeMediumOutline, IoVolumeMute } from "react-icons/io5";
import { SettingsContext } from "./SettingsContext";

const timerMappings = {
  30: "30 Sekunden",
  60: "1 Minute",
  120: "2 Minuten",
  180: "3 Minuten",
  300: "5 Minuten",
  600: "10 Minuten",
};

const SettingsPanel = ({ isOpen, closePopup }) => {
  const {
    timerValue,
    setTimerValue,
    bgMusicVolume,
    setBgMusicVolume,
    soundEffectsVolume,
    setSoundEffectsVolume,
    selectedSentencesFile,
    setSelectedSentencesFile,
    availableSentencesFiles,
    selectedBgSound,
    setSelectedBgSound,
    availableBgSounds,
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

  const handleBgMute = () => {
    setBgMusicVolume(bgMusicVolume === 0 ? 0.05 : 0);
  };

  const handleFxMute = () => {
    setSoundEffectsVolume(soundEffectsVolume === 0 ? 0.5 : 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full mx-4 md:w-1/2 min-h-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl shadow-xl transform scale-95 transition-transform duration-100 ease-in-out scale-up-br">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-emerald-700 hover:text-emerald-200 transition-colors duration-100 ease-in-out"
        >
          <LiaTimesSolid className="w-5 h-5" />
        </button>
        <div className="w-full flex flex-col gap-8 mt-10 px-8">
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/3 text-xl truncate font-semibold text-emerald-700">
              Hintergrundgeräusche {(bgMusicVolume === 0) ? <IoVolumeMediumOutline className="inline hover:cursor-pointer" onClick={handleBgMute}/> : <IoVolumeMute className="inline hover:cursor-pointer" onClick={handleBgMute}/>}
            </label>
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.001"
              value={bgMusicVolume}
              onChange={(e) => setBgMusicVolume(parseFloat(e.target.value))}
              className="w-1/3 max-w-1/3 mx-4 shadow-sm"
            />
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/4 truncate text-xl font-semibold text-emerald-700">
              Tastenklänge {(soundEffectsVolume === 0) ? <IoVolumeMediumOutline className="inline hover:cursor-pointer" onClick={handleFxMute}/> : <IoVolumeMute className="inline hover:cursor-pointer" onClick={handleFxMute}/>}
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
              className="w-1/3 max-w-1/3 mx-4 shadow-sm"
            />
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              Hintergrundgeräusche
            </label>
            <select
              value={selectedBgSound}
              onChange={(e) => setSelectedBgSound(e.target.value)}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              {availableBgSounds.map((file, index) => (
                <option key={index} value={file}>
                  {file.replace("_", " ").replace(".mp3", "")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              Wortschatz
            </label>
            <select
              value={selectedSentencesFile}
              onChange={(e) => setSelectedSentencesFile(e.target.value)}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              {availableSentencesFiles.map((file, index) => (
                <option key={index} value={file}>
                  {file.replace("_", " ").replace(".json", "")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              Timer
            </label>
            <select
              value={timerValue}
              onChange={(e) => setTimerValue(parseInt(e.target.value))}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              {Object.keys(timerMappings).map((key) => (
                <option key={key} value={key}>
                  {timerMappings[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="mt-12 mx-6 w-3/4 md:w-1/2 px-6 py-2 bg-emerald-700 bg-opacity-40 text-white ring-2 ring-zinc-100 rounded-full shadow-xl hover:bg-emerald-500 hover:bg-opacity-40 transition-colors duration-100 ease-in-out"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
