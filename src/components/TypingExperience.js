import React, { useEffect, useState } from "react";
import "./styles/bubble.css";

const COLORWINDOW = 10;
const SLIDINGWINDOW = 50;
const STARTCOLORS = [200, 140, 0];
const COLORSTEP = [10, 20, 30];
const GRAYTONE = 180;
const WHITEMAX = 240;
const BUBBLEDISTANCE = 1500;

const TypingExperience = () => {
  const typeTextplaceHolder =
    "Spüre den Atemfluss, lasse deine Gedanken los und finde Ruhe in jedem Tastenanschlag. Atme tief ein und aus, und lass dich von der Schönheit des Augenblicks tragen. Du bist hier und jetzt, und das ist alles, was zählt.";

  const [typedText, setTypedText] = useState("");
  const [slidingWindowStart, setSlidingWindowStart] = useState(0);
  const [wordBubbles, setWordBubbles] = useState([]);

  const handleKeyDown = (event) => {
    if (typeTextplaceHolder[typedText.length] === event.key) {
      setTypedText(typedText + event.key);

      if (event.key === " " || typedText.length + 1 === typeTextplaceHolder.length ) {
        const word = typeTextplaceHolder.slice(
          slidingWindowStart,
          typedText.length + 1,
        );
        setSlidingWindowStart(slidingWindowStart + word.length);
        launchWordBubble(word.trim().replace(/[,!?;:.\-]/g, ""));
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
    const randomX = Math.random() * - BUBBLEDISTANCE;
    const randomY = Math.sqrt(BUBBLEDISTANCE ** 2 - randomX ** 2) * (Math.random() < 0.5 ? 1 : -1);
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
        onAnimationEnd={(e) => (e.target.style.display = "none")}
      >
        <p className="text-gray-400 text-5xl">{word}</p>
      </div>
    );

    setWordBubbles([...wordBubbles, newBubble]);
  };

  const formattedTypedText = typeTextplaceHolder
    .slice(slidingWindowStart, slidingWindowStart + SLIDINGWINDOW)
    .split("")
    .map((char, index) => {
      index += slidingWindowStart;
      const typedLength = typedText.length;
      const distance = index - typedLength;

      if (index < typedLength) {
        return (
          <span key={index} className="text-5xl text-gray-600">
            {char}
          </span>
        );
      } else if (index === typedLength) {
        return (
          <span key={index} className="text-5xl underline font-bold text-amber-600">
            {char === " " ? "•" : char}
          </span>
        );
      } else if (index < typedLength + COLORWINDOW) {
        const red = Math.min(
          STARTCOLORS[0] + distance * COLORSTEP[0],
          WHITEMAX,
        );
        const green = Math.min(
          STARTCOLORS[1] + distance * COLORSTEP[1],
          WHITEMAX,
        );
        const blue = Math.min(
          STARTCOLORS[2] + distance * COLORSTEP[2],
          WHITEMAX,
        );
        const maxed = red === blue && red === green && red === WHITEMAX;
        const minim = maxed ? GRAYTONE : WHITEMAX;
        const inlineColor = `rgb(${Math.min(red, minim)}, ${Math.min(green, minim)}, ${Math.min(blue, minim)})`;
        return (
          <span key={index} style={{ color: inlineColor }} className="text-5xl">
            {char === " " ? "•" : char}
          </span>
        );
      } else {
        return (
          <span key={index} className="text-5xl text-gray-400">
            {char}
          </span>
        );
      }
    });

  return (
    <>
      <div className="min-h-screen bg-gray-300 flex flex-row items-center justify-center">
        <div>
          <div className="absolute">{wordBubbles}</div>
          <p className="text-5xl font-semibold">
            {formattedTypedText}
          </p>
        </div>
      </div>
    </>
  );
};

export default TypingExperience;
