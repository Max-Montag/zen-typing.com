import React, { useEffect, useContext, useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import NiceToggle from "./components/NiceToggle";
import { SettingsContext } from "./SettingsContext";
import i18n from "./../../i18n";
import "./../styles/range-input.css";

const timerValues = [30, 60, 120, 180, 300, 600, 900, 1200, 1800, 3600];

const SettingsPanel = ({ isOpen, closePopup }) => {
  const { t } = useTranslation();
  const {
    timerValue,
    timerDisabled,
    setTimerDisabled,
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

  const settingsRef = useRef(null);

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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (settingsRef.current && !settingsRef.current.contains(event.target)) {
  //       handleClose();
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed px-2 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div
        className="relative w-full mx-4 md:w-1/2 min-h-1/2 pt-2 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl shadow-xl transform scale-95 transition-transform duration-100 ease-in-out scale-up-br"
        ref={settingsRef}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-emerald-700 hover:text-emerald-200 transition-colors duration-100 ease-in-out"
        >
          <LiaTimesSolid className="w-5 h-5" />
        </button>
        <div className="w-full flex flex-col gap-8 mt-10 px-4 md:px-6">
          <div className="flex flex-row justify-between gap-6">
            <label className="w-2/3 max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              {t("settingsPanel.language")}
            </label>
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="flex flex-row justify-between">
            <label className="w-2/3 max-w-2/3 text-xl truncate font-semibold text-emerald-700">
              {bgMusicVolume === 0 ? (
                <IoVolumeMediumOutline
                  className="inline hover:cursor-pointer"
                  onClick={handleBgMute}
                />
              ) : (
                <IoVolumeMuteOutline
                  className="inline hover:cursor-pointer"
                  onClick={handleBgMute}
                />
              )}{" "}
              {t("settingsPanel.bgMusic")}
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
          <div className="flex flex-row justify-between">
            <label className="w-2/3 max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              {soundEffectsVolume === 0 ? (
                <IoVolumeMediumOutline
                  className="inline hover:cursor-pointer"
                  onClick={handleFxMute}
                />
              ) : (
                <IoVolumeMuteOutline
                  className="inline hover:cursor-pointer"
                  onClick={handleFxMute}
                />
              )}{" "}
              {t("settingsPanel.keySounds")}
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
            <label className="w-2/3 max-w-2/3 truncate text-xl font-semibold text-emerald-700 ">
              {t("settingsPanel.bgSound")}
            </label>
            <select
              value={selectedBgSound}
              onChange={(e) => setSelectedBgSound(e.target.value)}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              {availableBgSounds.map((file, index) => (
                <option key={index} value={file}>
                  {t(`bgSounds.${file.replace(".mp3", "")}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="w-2/3 max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              {t("settingsPanel.vocabulary")}
            </label>
            <select
              value={selectedSentencesFile}
              onChange={(e) => setSelectedSentencesFile(e.target.value)}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              {availableSentencesFiles.map((file, index) => (
                <option key={index} value={file}>
                  {file.replaceAll("_", " ").replace(".json", "")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between gap-6">
            <label className="w-2/3 max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              {t("settingsPanel.timer")}
            </label>
            <select
              value={timerValue}
              disabled={timerDisabled}
              onChange={(e) => setTimerValue(parseInt(e.target.value))}
              className="w-1/3 max-w-1/3 mx-4 bg-emerald-100 text-start rounded-lg p-2"
            >
              {timerValues.map((value) => (
                <option key={value} value={value}>
                  {t(`settingsPanel.${value}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-between">
            <label className="w-2/3 max-w-2/3 truncate text-xl font-semibold text-emerald-700">
              {t("settingsPanel.disableTimer")}
            </label>
            <div className="w-1/3 max-w-1/3 flex flex-row items-center justify-center">
              <NiceToggle
                enabled={timerDisabled}
                setEnabled={setTimerDisabled}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="my-8 mx-6 w-3/4 md:w-1/2 px-6 py-2 bg-emerald-700 bg-opacity-40 text-white ring-2 ring-zinc-100 rounded-full shadow-xl hover:bg-emerald-500 hover:bg-opacity-40 transition-colors duration-100 ease-in-out"
        >
          {t("settingsPanel.close")}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
