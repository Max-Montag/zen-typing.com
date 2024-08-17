import React, { useEffect, useState } from "react";
import "./styles/bubble.css";
import "./styles/typing.css";

const SLIDINGWINDOWSIZE = 50;
const BUBBLEDISTANCE = 1500;

function penultimateIndexOf(str, char) {
  let lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) return -1;
  let penultimateIndex = str.lastIndexOf(char, lastIndex - 1);
  return penultimateIndex;
}

const TypingExperience = () => {
  const [textToType, setTextToType] = useState(
    "Finde den Atem, lasse die Gedanken los und finde Ruhe, das ist alles was wichtig ist das was wichtig ist.",
  );

  const [typedText, setTypedText] = useState("");
  const [wordBubbles, setWordBubbles] = useState([]);
  const [lastWord, setLastWord] = useState("");
  const [lastWordElem, setLastWordElem] = useState(null);

  const currentWindow = textToType.slice(0, SLIDINGWINDOWSIZE);

  const handleKeyDown = (event) => {
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
        const uniqueKey = `${newLastWord}-${Date.now()}`;
        setLastWordElem(
          <span
            key={uniqueKey}
            className="text-5xl text-gray-500 text-focus-in"
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
        key={wordBubbles.length}
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
    <>
      <div className="min-h-screen bg-zinc-200 flex flex-row items-center justify-start ml-96">
        <div>
          <div className="absolute">{wordBubbles}</div>
          <span className="text-5xl text-gray-600">{typedText}</span>
          {textToType.length > 0 && (
            <span className="my-0 rounded-lg ring-offset-1 ring ring-emerald-500 p-1 m-1 text-6xl font-bold text-emerald-400">
              {textToType.charAt(0) === " " ? "•" : textToType.charAt(0)}
            </span>
          )}
          <span className="text-5xl text-gray-500">
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
    </>
  );
};

export default TypingExperience;
