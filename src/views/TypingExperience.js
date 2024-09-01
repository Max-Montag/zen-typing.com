import React, { useEffect, useState, useRef, useContext } from "react";
import { Helmet } from "react-helmet";
import Howler from "react-howler";
import { Howl } from "howler";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import ResultsCard from "./ResultsCard";
import SettingsPanel from "./settings/SettingsPanel";
import HeaderMenu from "./components/HeaderMenu";
import { SettingsContext } from "./settings/SettingsContext";
import { penultimateIndexOf } from "./../utils/utility";
import Footer from "./components/Footer";
import "./styles/typing.css";

const SLIDINGWINDOWSIZE = 40;
const BUFFERSIZE = 20;
const BUBBLEDISTANCE = 1500;

const TypingExperience = () => {
  const {
    timerValue,
    selectedSentencesFile,
    soundEffectsVolume,
    sounds,
    timerDisabled,
  } = useContext(SettingsContext);
  const [timerActive, setTimerActive] = useState(false);
  const [sessionFinnished, setSessionFinnished] = useState(false);
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [resultsCardOpen, setResultsCardOpen] = useState(false);
  const [SettingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [lastPlayedSound, setLastPlayedSound] = useState(null);
  const [upcomingText, setUpcomingText] = useState("");
  const containerRef = useRef(null);
  const stateRef = useRef({ upcomingText, typedText, timerActive });
  const ableToBegRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) return;
      if (inputRef.current && event.target !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    stateRef.current = {
      upcomingText,
      typedText,
      timerActive,
      sessionFinnished,
    };
  }, [upcomingText, typedText, timerActive, sessionFinnished]);

  useEffect(() => {
    ableToBegRef.current =
      !timerActive && !SettingsPanelOpen && !resultsCardOpen && !menuOpen;
  }, [timerActive, SettingsPanelOpen, resultsCardOpen, menuOpen]);

  useEffect(() => {
    let interval = null;
    if (timerActive && !timerDisabled) {
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
    setUpcomingText(newSentence() + " " + newSentence());
  }, []);

  const newSentence = () => {
    const sentencesData = require(`../assets/data/${selectedSentencesFile}`);
    return sentencesData[Math.floor(Math.random() * sentencesData.length)];
  };

  const chooseRandomSound = () => {
    let randomInt = null;
    do {
      randomInt = Math.floor(Math.random() * sounds.length);
    } while (lastPlayedSound !== null && randomInt === lastPlayedSound);

    setLastPlayedSound(randomInt);
    return sounds[randomInt];
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeResultsCard = () => {
    setResultsCardOpen(false);
    prepareNextSession();
  };

  const closeSettingsPanel = () => {
    setSettingsPanelOpen(false);
    prepareNextSession();
  };

  const handleSettingsClick = () => {
    setSettingsPanelOpen(true);
    abortTypingSession();
  };

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (event) => {
    proccesChar(event.target.value.slice(-1));
  };

  const proccesChar = (key) => {
    const { upcomingText, typedText, timerActive, sessionFinnished } =
      stateRef.current;

    if (sessionFinnished) return;

    if (
      upcomingText[0] === key ||
      (upcomingText[0] === "$" && upcomingText[1] === key)
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
      setTypedText(typedText + key);

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
      if (key === " " || upcomingText.length <= 1) {
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

  const prepareNextSession = () => {
    setUpcomingText(newSentence() + " " + newSentence());
    setTimeLeft(timerValue);
    focusInput();
    setSessionFinnished(false);
  };

  const wrapUpSession = () => {
    setTypedText("");
    setLastWord("");
    setWordBubbles({});
    setLastWordElem(null);
    setUpcomingText(newSentence() + " " + newSentence());
    inputRef.current.value = "";
  };

  const abortTypingSession = () => {
    setTimerActive(false);
    setTimeLeft(timerValue);
    wrapUpSession();
  };

  const completeTypingSession = () => {
    setSessionFinnished(true);
    setTimerActive(false);
    setSettingsPanelOpen(false);
    setResultsCardOpen(true);
    wrapUpSession();
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

  return (
    <>
      <div
        className={`min-h-screen bg-zinc-50 typing-container hover:cursor-pointer ${timerDisabled ? "pt-56" : "pt-32"}`}
        ref={containerRef}
      >
        <Helmet>
          <title>Zen Typing Experience</title>
        </Helmet>
        <div
          className={`fixed top-3 lg:top-6 left-3 lg:left-6 ${timerActive && !menuOpen ? "opacity-20" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HeaderMenu
            ableToBegRef={ableToBegRef}
            isOpen={menuOpen}
            closePopup={closeMenu}
          />
        </div>
        <div className="bg-zinc-100 shadow-inner-lg flex flex-col gap-12 sm:gap-16 md:gap-32 py-16">
          <div className="z-10 absolute top-0 right-0 h-full w-8 md:w-[15%] lg:w-[20%] xl:w-[25%] bg-gradient-to-r from-transparent to-zinc-100 pointer-events-none"></div>
          {!timerDisabled && (
            <div className="flex flex-row justify-center">
              <h1 className="text-center text-8xl font-semibold text-zinc-500">
                {Math.max(timeLeft, 0).toFixed(0)} s
              </h1>
            </div>
          )}
          <div className="flex flex-row items-center ml-4 md:ml-[5%] lg:ml-[10%] xl:ml-[15%]">
            <div className="flex flex-row items-center justify-start">
              <div>
                <div className="absolute">{Object.values(wordBubbles)}</div>
                <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-600">
                  {typedText}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  onChange={handleInputChange}
                  className="w-0.5 max-w-0.5 h-0.5 max-h-0.5 text-zinc-50 bg-zinc-50 text-sm focus:outline-none hover:cursor-default"
                  autoFocus
                />
                {upcomingText.replace(/\$/g, "").length > 0 && (
                  <span className="my-0 rounded-lg ring ring-emerald-300 p-1 m-1 text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-emerald-300">
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
        <div className="fixed bottom-3 right-4">
          <button
            className="text-zinc-600 lg:text-zinc-800 hover:text-zinc-400 transition-colors duration-300 ease-in-out"
            onClick={handleSettingsClick}
          >
            {SettingsPanelOpen ? (
              <IoSettingsOutline className="w-16 h-16 md:w-24 md:h-24 animate-spin-slow-reverse" />
            ) : (
              <IoSettingsSharp
                className={`w-16 h-16 md:w-24 md:h-24 animate-finish-spin ${timerActive ? "opacity-20" : ""}`}
              />
            )}
          </button>
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
      <Footer />
    </>
  );
};

export default TypingExperience;
