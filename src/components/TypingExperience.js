import React, { useEffect, useState } from "react";
import "./styles/bubble.css";

const SLIDINGWINDOWSIZE = 50;
const BUBBLEDISTANCE = 1500;

const TypingExperience = () => {
  const [textToType, setTextToType] = useState(
    "Spüre den Atemfluss, lasse deine Gedanken los und finde Ruhe in jedem Tastenanschlag. Atme tief ein und aus, und lass dich von der Schönheit des Augenblicks tragen. Du bist hier und jetzt, und das ist alles, was zählt.",
  );
  const [typedText, setTypedText] = useState("");
  const [wordBubbles, setWordBubbles] = useState([]);

  const handleKeyDown = (event) => {
    if (textToType[0] === event.key) {
      setTypedText(typedText + event.key);
      setTextToType(textToType.slice(1));
      if (event.key === " " || textToType.length <= 1) {
        launchWordBubble(typedText.trim().replace(/[,!?;:.\-]/g, ""));
        setTypedText("");
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
      <div className="min-h-screen bg-zinc-200 flex flex-row items-center justify-center">
        <div>
          <div className="absolute">{wordBubbles}</div>
          <span className="text-5xl text-gray-600">{typedText}</span>
          {textToType.length > 0 && (
            <span className="my-0 rounded-lg ring-offset-1 ring ring-emerald-500 p-1 m-1 text-6xl font-bold text-emerald-400">
              {textToType.charAt(0) === " " ? "•" : textToType.charAt(0)}
            </span>
          )}
          <span className="text-5xl text-gray-500">
            {textToType.slice(1, SLIDINGWINDOWSIZE)}
          </span>
        </div>
      </div>
    </>
  );
};

export default TypingExperience;
