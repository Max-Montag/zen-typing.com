import React, { useEffect, useState } from "react";
import "./styles/bubble.css";
import "./styles/typing.css";
import sentencesData from "./../assets/data/sentences.json";

const SLIDINGWINDOWSIZE = 40;
const BUBBLEDISTANCE = 1500;

function penultimateIndexOf(str, char) {
  let lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) return -1;
  let penultimateIndex = str.lastIndexOf(char, lastIndex - 1);
  return penultimateIndex;
}

const TypingExperience = () => {
  const [textToType, setTextToType] = useState(
    "Finde den Atem, lasse die Gedanken los. Atme tief ein und aus. Spüre die Luft in deinen Lungen."
  );

  const [typedText, setTypedText] = useState("");
  const [wordBubbles, setWordBubbles] = useState([]);
  const [lastWord, setLastWord] = useState("");
  const [lastWordElem, setLastWordElem] = useState(null);

  const currentWindow = textToType.slice(0, SLIDINGWINDOWSIZE);

  const handleKeyDown = (event) => {

    // TODO 1: Use random sentences from the sentencesData array
    // TODO 2: Add a space after each sentence
    // TODO 3: refactor this function 
    // TODO 4: why does the word appearing not work anymore? 

    if (textToType[0] === event.key) {
      setTypedText(typedText + event.key);
      setTextToType(textToType.slice(1));
      if (event.key === " " || textToType.length <= 1) {
        launchWordBubble(typedText.trim().replace(/[,!?;:.\-]/g, ""));
        setTypedText("");
      }

      const newLastWord = (
        textToType.charAt(SLIDINGWINDOWSIZE) === " "
          ? ""
          : currentWindow.slice(
              penultimateIndexOf(currentWindow, " ") + 1,
              currentWindow.lastIndexOf(" "),
            )
      ).trim();
      if (lastWord !== newLastWord) {
        setLastWord(newLastWord);
        setLastWordElem(
          <span
            className="text-lg md:text-2xl lg:text-3xl xl:text-5xl text-red-500 text-focus-in"
          >
            {newLastWord}
          </span>,
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText]);

  const launchWordBubble = (word) => {
    const randomX = Math.random() * -BUBBLEDISTANCE;
    const randomY =
      Math.sqrt(BUBBLEDISTANCE ** 2 - randomX ** 2) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomRotate = `${Math.random() * 90 - 45}deg`;

    const newBubble = (
      <div
        key={Date.now()}
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
        <p className="text-gray-400 text-5xl">{word}</p>
      </div>
    );

    setWordBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  };

  const removeBubble = (index) => {
    setWordBubbles((prevBubbles) => prevBubbles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex flex-row items-center">
      <div  className="flex flex-row items-center justify-start ml-4 md:ml-[5%] lg:ml-[10%] xl:ml-[15%]">
        <div>
          <div className="absolute">{wordBubbles}</div>
          <span className="text-lg md:text-2xl lg:text-3xl xl:text-5xl text-gray-600">{typedText}</span>
          {textToType.length > 0 && (
            <span className="my-0 rounded-lg ring-offset-1 ring ring-emerald-500 p-1 m-1 text-xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-emerald-400">
              {textToType.charAt(0) === " " ? "•" : textToType.charAt(0)}
            </span>
          )}
          <span className="text-lg md:text-2xl lg:text-3xl xl:text-5xl text-gray-500">
            {textToType.length > SLIDINGWINDOWSIZE
              ? currentWindow.slice(
                  1,
                  penultimateIndexOf(currentWindow, " ") === -1
                    ? currentWindow.length
                    : penultimateIndexOf(currentWindow, " "),
                ) + " "
              : currentWindow.slice(1)}
          </span>
          {textToType.length > SLIDINGWINDOWSIZE && lastWordElem}
        </div>
      </div>
    </div>
  );
};

export default TypingExperience;
