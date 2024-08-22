import React, { createContext, useState, useEffect } from "react";
import { Howl } from "howler";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [timerValue, setTimerValue] = useState(60);
  const [timerDisabled, setTimerDisabled] = useState(false);
  const [bgMusicVolume, setBgMusicVolume] = useState(0.05);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(0.5);
  const [selectedSentencesFile, setSelectedSentencesFile] = useState(
    "Affirmationen.json",
  );
  const [selectedBgSound, setSelectedBgSound] = useState("Regen.mp3");
  const [availableBgSounds, setAvailableBgSounds] = useState([]);
  const [availableSentencesFiles, setAvailableSentencesFiles] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [bgSoundHowl, setBgSoundHowl] = useState(null);

  useEffect(() => {
    const fetchSentencesFiles = async () => {
      const context = require.context("../../assets/data", false, /\.json$/);
      const files = context.keys().map((file) => file.replace("./", ""));
      setAvailableSentencesFiles(files);
      setSelectedSentencesFile(files[0]);
    };

    const fetchSounds = async () => {
      const contextFx = require.context(
        "../../assets/sounds/fx",
        false,
        /\.(mp3|wav)$/,
      );
      const contextBg = require.context(
        "../../assets/sounds/bg",
        false,
        /\.(mp3|wav)$/,
      );
      const fxFiles = contextFx.keys().map((file) => contextFx(file));
      const bgFiles = contextBg.keys().map((file) => file.replace("./", ""));
      setSounds(fxFiles);
      setAvailableBgSounds(bgFiles);
    };

    fetchSentencesFiles();
    fetchSounds();
  }, []);

  useEffect(() => {
    if (bgSoundHowl) {
      bgSoundHowl.volume(bgMusicVolume);
    }
  }, [bgMusicVolume]);

  useEffect(() => {
    const bgSound = new Howl({
      src: require(`./../../assets/sounds/bg/${selectedBgSound}`),
      loop: true,
      volume: bgMusicVolume,
    });

    setBgSoundHowl(bgSound);
    bgSound.play();

    return () => {
      bgSound.stop();
    };
  }, [selectedBgSound]);

  return (
    <SettingsContext.Provider
      value={{
        timerValue,
        setTimerValue,
        timerDisabled,
        setTimerDisabled,
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
        sounds,
        bgSoundHowl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
