import React, { useEffect, useState, useRef, useContext } from "react";
import Howler from "react-howler";
import { Howl } from "howler";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import "./styles/bubble.css";
import "./styles/typing.css";
import "./styles/rangeInput.css";
import ResultsCard from "./ResultsCard";
import SettingsPanel from "./settings/SettingsPanel";
import { SettingsContext } from "./settings/SettingsContext";

const SLIDINGWINDOWSIZE = 40;
const BUFFERSIZE = 20;
const BUBBLEDISTANCE = 1500;

function penultimateIndexOf(str, char) {
  let lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) return -1;
  let penultimateIndex = str.lastIndexOf(char, lastIndex - 1);
  return penultimateIndex;
}

// TODO: errors are not counted correctly!!

const TypingExperience = () => {
  const { timerValue, selectedSentencesFile, soundEffectsVolume, sounds } =
    useContext(SettingsContext);

  const newSentence = () => {
    const sentencesData = require(`../assets/data/${selectedSentencesFile}`);
    return sentencesData[Math.floor(Math.random() * sentencesData.length)];
  };

  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [typedWords, setTypedWords] = useState(0);
  const [errors, setErrors] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [wordBubbles, setWordBubbles] = useState({});
  const [prevDirection, setPrevDirection] = useState("top");
  const [lastWord, setLastWord] = useState("");
  const [lastWordElem, setLastWordElem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timerValue);
  const [resultsCardOpen, setResultsCardOpen] = useState(false);
  const [SettingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [upcomingText, setUpcomingText] = useState(
    newSentence() + " " + newSentence(),
  );
  const [lastPlayedSound, setLastPlayedSound] = useState(null);

  const stateRef = useRef({ upcomingText, typedText, timerActive });

  // TODO: The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. <URL>

  useEffect(() => {
    stateRef.current = { upcomingText, typedText, timerActive };
  }, [upcomingText, typedText, timerActive]);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft(timerValue - (Date.now() - startTime) / 1000);
        if (Date.now() > startTime + timerValue * 1000) {
          completeTypingSession();
        }
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, startTime]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText]);

  const closeResultsCard = () => {
    setResultsCardOpen(false);
  };

  const closeSettingsPanel = () => {
    setSettingsPanelOpen(false);
    setUpcomingText(newSentence() + " " + newSentence());
    setTimeLeft(timerValue);
  };

  const chooseRandomSound = () => {
    let randomInt = null;
    do {
      randomInt = Math.floor(Math.random() * sounds.length);
    } while (lastPlayedSound !== null && randomInt === lastPlayedSound);

    setLastPlayedSound(randomInt);
    return sounds[randomInt];
  };

  const handleSettingsClick = () => {
    setSettingsPanelOpen(true);
    abortTypingSession();
  };

  const handleKeyDown = (event) => {
    const { upcomingText, typedText, timerActive } = stateRef.current;

    // TODO this line does not catch typing 1 wrong char in the resultboard an counting it as an error
    if (timerActive && Date.now() > startTime + timerValue * 1000) return;

    if (
      upcomingText[0] === event.key ||
      (upcomingText[0] === "$" && upcomingText[1] === event.key)
    ) {
      if (!timerActive) {
        setTimerActive(true);
        setStartTime(Date.now());
        setTypedChars(1);
        setTypedWords(0);
        setErrors(0);
      } else {
        setTypedChars(typedChars + 1);
      }
      setTypedText(typedText + event.key);

      if (upcomingText[1] === "$") {
        const sound = chooseRandomSound();
        const howl = new Howl({
          src: [sound],
          autoplay: true,
          volume: soundEffectsVolume,
        });
        howl.play();
      }

      if (
        upcomingText.replace(/\$/g, "").length <=
        SLIDINGWINDOWSIZE + BUFFERSIZE
      ) {
        upcomingText[1] !== "$"
          ? setUpcomingText(upcomingText.slice(1) + " " + newSentence())
          : setUpcomingText(upcomingText.slice(2) + " " + newSentence());
      } else {
        upcomingText[1] !== "$"
          ? setUpcomingText(upcomingText.slice(1))
          : setUpcomingText(upcomingText.slice(2));
      }
      if (event.key === " " || upcomingText.length <= 1) {
        setTypedWords(typedWords + 1);
        launchWordBubble(typedText.trim().replace(/[,!?;:.\-]/g, ""));
        setTypedText("");
      }

      const newLastWord = (
        upcomingText.replace(/\$/g, "").charAt(SLIDINGWINDOWSIZE) === " "
          ? ""
          : upcomingText
              .replace(/\$/g, "")
              .slice(0, SLIDINGWINDOWSIZE)
              .slice(
                penultimateIndexOf(
                  upcomingText.replace(/\$/g, "").slice(0, SLIDINGWINDOWSIZE),
                  " ",
                ) + 1,
                upcomingText
                  .replace(/\$/g, "")
                  .slice(0, SLIDINGWINDOWSIZE)
                  .lastIndexOf(" "),
              )
      )
        .trim()
        .replace(/\$/g, "");
      if (lastWord !== newLastWord) {
        setLastWord(newLastWord);
        setLastWordElem(
          <span
            key={"word" + Date.now()}
            className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-500 text-focus-in"
          >
            {newLastWord}
          </span>,
        );
      }
    } else {
      setErrors(errors + 1);
    }
  };

  const finishTypingSession = () => {
    setTypedText("");
    setLastWord("");
    setWordBubbles({});
    setLastWordElem(null);
    setUpcomingText(newSentence() + " " + newSentence());
  };

  const abortTypingSession = () => {
    setTimerActive(false);
    setTimeLeft(timerValue);
    finishTypingSession();
  };

  const completeTypingSession = () => {
    setTimerActive(false);
    setSettingsPanelOpen(false);
    setResultsCardOpen(true);
    finishTypingSession();
  };

  const resetTime = () => {
    setTimeLeft(timerValue);
  };

  const launchWordBubble = (word) => {
    const randomX = Math.random() * -BUBBLEDISTANCE;
    const randomY =
      Math.sqrt(BUBBLEDISTANCE ** 2 - randomX ** 2) *
      (prevDirection === "top" ? -1 : 1);
    setPrevDirection(prevDirection === "top" ? "bottom" : "top");
    const randomRotate = `${Math.random() * 90 - 45}deg`;

    const randomSound = chooseRandomSound();

    const key = "bubble" + Date.now();

    const newBubble = (
      <div
        key={key}
        className="absolute -z-1 opacity-70 flex items-center justify-center moving-bubble"
        style={{
          animation: `moveBubble 3.5s cubic-bezier(0.01, 0.2, 0.9, 0.1) forwards`,
          transform: `translate(${randomX}px, ${randomY}px) scale(0.1)`,
          "--randomX": `${randomX}px`,
          "--randomY": `${randomY}px`,
          "--randomRotate": randomRotate,
        }}
        onAnimationEnd={() => removeBubble(key)}
      >
        <p className="text-gray-400 text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
          {word}
        </p>
        <Howler src={randomSound} playing={true} volume={soundEffectsVolume} />
      </div>
    );
    setWordBubbles((prevBubbles) => {
      prevBubbles[key] = newBubble;
      return prevBubbles;
    });
  };

  const removeBubble = (key) => {
    setWordBubbles((prevBubbles) => {
      delete prevBubbles[key];
      return prevBubbles;
    });
  };

  // TODO optimize this

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center -mt-16 typing-container">
      <div className="fixed bottom-8 right-8">
        <button
          className="text-zinc-600 lg:text-zinc-900 hover:text-zinc-400 transition-colors duration-300 ease-in-out"
          onClick={handleSettingsClick}
        >
          {SettingsPanelOpen ? (
            <IoSettingsOutline className="w-16 h-16 md:w-24 md:h-24 animate-spin-slow-reverse" />
          ) : (
            <IoSettingsSharp className="w-16 h-16 md:w-24 md:h-24 animate-finish-spin" />
          )}
        </button>
      </div>
      <div className="bg-zinc-100 shadow-inner-lg flex flex-col gap-32 pt-8 pb-16">
        <div className="z-10 absolute top-0 right-0 h-full w-8 md:w-[15%] lg:w-[20%] xl:w-[25%] bg-gradient-to-r from-transparent to-zinc-100 pointer-events-none"></div>
        <div className="flex flex-row justify-center">
          <h1 className="text-center text-8xl font-semibold text-zinc-500">
            {Math.max(timeLeft, 0).toFixed(0)} s
          </h1>
        </div>
        <div className="flex flex-row items-center ml-4 md:ml-[5%] lg:ml/[10%] xl:ml/[15%]">
          <div className="flex flex-row items-center justify-start">
            <div>
              <div className="absolute">{Object.values(wordBubbles)}</div>
              <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-600">
                {typedText}
              </span>
              {upcomingText.replace(/\$/g, "").length > 0 && (
                <span className="my-0 rounded-lg ring-offset-1 ring ring-emerald-500 p-1 m-1 text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-emerald-400">
                  {upcomingText.replace(/\$/g, "").charAt(0) === " "
                    ? "•"
                    : upcomingText.replace(/\$/g, "").charAt(0)}
                </span>
              )}
              <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-500">
                {upcomingText.replace(/\$/g, "").length > SLIDINGWINDOWSIZE
                  ? upcomingText
                      .replace(/\$/g, "")
                      .slice(0, SLIDINGWINDOWSIZE)
                      .slice(
                        1,
                        penultimateIndexOf(
                          upcomingText
                            .replace(/\$/g, "")
                            .slice(0, SLIDINGWINDOWSIZE),
                          " ",
                        ) === -1
                          ? upcomingText
                              .replace(/\$/g, "")
                              .slice(0, SLIDINGWINDOWSIZE).length
                          : penultimateIndexOf(
                              upcomingText
                                .replace(/\$/g, "")
                                .slice(0, SLIDINGWINDOWSIZE),
                              " ",
                            ),
                      ) + " "
                  : upcomingText
                      .replace(/\$/g, "")
                      .slice(0, SLIDINGWINDOWSIZE)
                      .slice(1)}
              </span>
              {upcomingText.replace(/\$/g, "").length > SLIDINGWINDOWSIZE &&
                lastWordElem}
            </div>
          </div>
        </div>
      </div>
      <ResultsCard
        isOpen={resultsCardOpen}
        closePopup={closeResultsCard}
        resetTime={resetTime}
        typedChars={typedChars}
        typedWords={typedWords}
        time={timerValue}
        errors={errors}
      />
      <SettingsPanel
        isOpen={SettingsPanelOpen}
        closePopup={closeSettingsPanel}
      />
    </div>
  );
};

export default TypingExperience;
