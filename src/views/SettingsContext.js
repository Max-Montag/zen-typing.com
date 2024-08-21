import React, { createContext, useState, useEffect } from "react";
import { Howl } from "howler";
import sound1 from "./../assets/sounds/fx/audio1.mp3";
import sound2 from "./../assets/sounds/fx/audio2.mp3";
import sound3 from "./../assets/sounds/fx/audio3.mp3";
import sound4 from "./../assets/sounds/fx/audio4.mp3";
import sound5 from "./../assets/sounds/fx/audio5.mp3";
import sound6 from "./../assets/sounds/fx/audio6.mp3";
import rainSound from "./../assets/sounds/bg/rain.mp3";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [bgMusicVolume, setBgMusicVolume] = useState(0.2);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(1);
  const [selectedSentencesFile, setSelectedSentencesFile] =
    useState("sentences.json");
  const [availableSentencesFiles, setAvailableSentencesFiles] = useState([]);

  const sounds = [sound1, sound2, sound3, sound4, sound5, sound6];
  const [rainHowl, setRainHowl] = useState(null);

  useEffect(() => {
    const fetchSentencesFiles = async () => {
      const context = require.context("../assets/data", false, /\.json$/);
      const files = context.keys().map((file) => file.replace("./", ""));
      setAvailableSentencesFiles(files);
      setSelectedSentencesFile(files[0]);
    };

    fetchSentencesFiles();
  }, []);

  useEffect(() => {
    if (rainHowl) {
      rainHowl.volume(bgMusicVolume);
    }
  }, [bgMusicVolume]);

  useEffect(() => {
    const rain = new Howl({
      src: [rainSound],
      loop: true,
      volume: bgMusicVolume,
    });

    setRainHowl(rain);
    rain.play();

    return () => {
      rain.stop();
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        bgMusicVolume,
        setBgMusicVolume,
        soundEffectsVolume,
        setSoundEffectsVolume,
        selectedSentencesFile,
        setSelectedSentencesFile,
        availableSentencesFiles,
        sounds,
        rainHowl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
