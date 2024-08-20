import React, { useEffect, useState, useRef } from "react";
import "./styles/bubble.css";
import "./styles/typing.css";
import sentencesData from "./../assets/data/sentences.json";
import ResultsCard from "./ResultsCard";

const SLIDINGWINDOWSIZE = 40; //40
const BUFFERSIZE = 20;
const BUBBLEDISTANCE = 1500;
const TIME = 10;

function penultimateIndexOf(str, char) {
  let lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) return -1;
  let penultimateIndex = str.lastIndexOf(char, lastIndex - 1);
  return penultimateIndex;
}

// TODO: errors are not counted correctly!!

const TypingExperience = () => {
  const newSentence = () => {return sentencesData[Math.floor(Math.random() * sentencesData.length)]}
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [typedWords, setTypedWords] = useState(0);
  const [errors, setErrors] = useState(0);
  const [upcomingText, setUpcomingText] = useState(newSentence() + " " + newSentence());
  const [typedText, setTypedText] = useState("");
  const [wordBubbles, setWordBubbles] = useState([]);
  const [lastWord, setLastWord] = useState("");
  const [lastWordElem, setLastWordElem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME);
  const [resultsCardOpen, setResultsCardOpen] = useState(false);

  const stateRef = useRef({ upcomingText, typedText, timerActive})

  const closeResultsCard = () => { setResultsCardOpen(false); }

  const handleKeyDown = (event) => {
    const { upcomingText, typedText, timerActive } = stateRef.current;
    if(timerActive && Date.now() > startTime + TIME * 1000)
      return;

    if (upcomingText[0] === event.key) {
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

      if (upcomingText.length <= SLIDINGWINDOWSIZE + BUFFERSIZE) {
        setUpcomingText(
          upcomingText.slice(1) +
            " " + newSentence()
        )
      } else {
        setUpcomingText(prevText => prevText.slice(1));
      }
      if (event.key === " " || upcomingText.length <= 1 ) {
        setTypedWords(typedWords + 1);
        launchWordBubble(typedText.trim().replace(/[,!?;:.\-]/g, ""));
        setTypedText(""); 
      }

      const newLastWord = (
        upcomingText.charAt(SLIDINGWINDOWSIZE) === " "
          ? ""
          : upcomingText.slice(0, SLIDINGWINDOWSIZE).slice(
              penultimateIndexOf(upcomingText.slice(0, SLIDINGWINDOWSIZE), " ") + 1,
              upcomingText.slice(0, SLIDINGWINDOWSIZE).lastIndexOf(" "),
            )
      ).trim();
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

  useEffect(() => {
    stateRef.current = { upcomingText, typedText, timerActive };
  }, [upcomingText, typedText, timerActive]);
  
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft(TIME - ((Date.now() - startTime) / 1000));
        if (Date.now() > startTime + TIME * 1000) {
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

  const completeTypingSession = () => {
    setResultsCardOpen(true);
    setTypedText("");
    setLastWord("");
    setWordBubbles([]);
    setLastWordElem(null);
    setUpcomingText(newSentence() + " " + newSentence());
  };

  const resetTime = () => {
    setTimeLeft(TIME);
    setTimerActive(false);
  };

  const launchWordBubble = (word) => {
    const randomX = Math.random() * -BUBBLEDISTANCE;
    const randomY =
      Math.sqrt(BUBBLEDISTANCE ** 2 - randomX ** 2) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomRotate = `${Math.random() * 90 - 45}deg`;

    const newBubble = (
      <div
        key={"bubble" + Date.now()}
        className="absolute -z-1 opacity-70 flex items-center justify-center moving-bubble"
        style={{
          animation: `moveBubble 3.5s cubic-bezier(0.01, 0.2, 0.9, 0.1) forwards`,
          transform: `translate(${randomX}px, ${randomY}px) scale(0.1)`,
          "--randomX": `${randomX}px`,
          "--randomY": `${randomY}px`,
          "--randomRotate": randomRotate,
        }}
        onAnimationEnd={() => removeBubble(wordBubbles.length)}
      >
        <p className="text-gray-400 text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">{word}</p>
      </div>
    );
    setWordBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  };

  const removeBubble = (index) => {
    setWordBubbles((prevBubbles) => prevBubbles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center -mt-16 typing-container">
            
      <div className="bg-zinc-100 flex flex-col gap-32 pt-4 pb-8">
        <div className="z-10 absolute top-0 right-0 h-full w-8 md:w-[15%] lg:w-[20%] xl:w-[25%] bg-gradient-to-r from-transparent to-zinc-100 pointer-events-none"></div>
        <div className="flex flex-row justify-center">
          <h1 className="text-start text-8xl font-semibold text-zinc-500 min-w-32">{Math.max(timeLeft, 0).toFixed(0)} s</h1>
        </div>
        <div className="flex flex-row items-center ml-4 md:ml-[5%] lg:ml-[10%] xl:ml-[15%]">
          <div className="flex flex-row items-center justify-start">
            <div className="max-w-full">
              <div className="absolute">{wordBubbles}</div>
              <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-600">
                {typedText}
              </span>
              {upcomingText.length > 0 && (
                <span className="my-0 rounded-lg ring-offset-1 ring ring-emerald-500 p-1 m-1 text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-emerald-400">
                  {upcomingText.charAt(0) === " " ? "•" : upcomingText.charAt(0)}
                </span>
              )}
              <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-500">
                {upcomingText.length > SLIDINGWINDOWSIZE
                  ? upcomingText.slice(0, SLIDINGWINDOWSIZE).slice(
                      1,
                      penultimateIndexOf(upcomingText.slice(0, SLIDINGWINDOWSIZE), " ") === -1
                        ? upcomingText.slice(0, SLIDINGWINDOWSIZE).length
                        : penultimateIndexOf(upcomingText.slice(0, SLIDINGWINDOWSIZE), " "),
                    ) + " "
                  : upcomingText.slice(0, SLIDINGWINDOWSIZE).slice(1)}
              </span>
              {upcomingText.length > SLIDINGWINDOWSIZE && lastWordElem}
            </div>
          </div>
        </div>
      </div>
      <ResultsCard isOpen={resultsCardOpen} closePopup={closeResultsCard} resetTime={resetTime} typedChars={typedChars} typedWords={typedWords} errors={errors} />
    </div>
  );
};

export default TypingExperience;
