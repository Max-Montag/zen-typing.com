import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Howl } from "howler";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [timerValue, setTimerValue] = useState(60);
  const [timerDisabled, setTimerDisabled] = useState(false);
  const [bgMusicVolume, setBgMusicVolume] = useState(0.05);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(0.5);
  const [selectedSentencesFile, setSelectedSentencesFile] = useState(null);
  const [selectedBgSound, setSelectedBgSound] = useState("rain.mp3");
  const [availableBgSounds, setAvailableBgSounds] = useState([]);
  const [availableSentencesFiles, setAvailableSentencesFiles] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [bgSoundHowl, setBgSoundHowl] = useState(null);

  useEffect(() => {
    const fetchSentencesFiles = async () => {
      const language = i18n.language;
      const context =
        language === "de"
          ? require.context(`../../assets/data/de`, false, /\.json$/)
          : require.context(`../../assets/data/en`, false, /\.json$/);
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
  }, [i18n.language]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (bgSoundHowl) {
          bgSoundHowl.stop();
        }
      } else {
        if (bgSoundHowl) {
          bgSoundHowl.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (bgSoundHowl) {
        bgSoundHowl.stop();
      }
    };
  }, [bgSoundHowl]);

  useEffect(() => {
    if (bgSoundHowl) {
      bgSoundHowl.volume(bgMusicVolume);
    }
  }, [bgSoundHowl, bgMusicVolume]);

  useEffect(() => {
    if (bgSoundHowl) {
      bgSoundHowl.stop();
    }

    const bgSound = new Howl({
      src: require(`../../assets/sounds/bg/${selectedBgSound}`),
      loop: true,
      volume: bgMusicVolume,
    });

    setBgSoundHowl(bgSound);
    bgSound.play();

    return () => bgSound.stop();
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
