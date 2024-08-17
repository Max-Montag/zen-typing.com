import React, { useEffect, useState } from "react";
import "./styles/bubble.css";

const SLIDINGWINDOWSIZE = 50;
const BUBBLEDISTANCE = 1500;

const TypingExperience = () => {
  const typeTextplaceHolder =
    "Spüre den Atemfluss, lasse deine Gedanken los und finde Ruhe in jedem Tastenanschlag. Atme tief ein und aus, und lass dich von der Schönheit des Augenblicks tragen. Du bist hier und jetzt, und das ist alles, was zählt.";

  const [typedText, setTypedText] = useState("");
  const [slidingWindowStart, setslidingWindowStart] = useState(0);
  const [wordBubbles, setWordBubbles] = useState([]);

  const handleKeyDown = (event) => {
    if (typeTextplaceHolder[typedText.length] === event.key) {
      setTypedText(typedText + event.key);

      if (
        event.key === " " ||
        typedText.length + 1 === typeTextplaceHolder.length
      ) {
        const word = typeTextplaceHolder.slice(
          slidingWindowStart,
          typedText.length + 1,
        );
        setslidingWindowStart(slidingWindowStart + word.length);
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


  const formattedTypedText = typeTextplaceHolder
    .slice(slidingWindowStart, slidingWindowStart + SLIDINGWINDOWSIZE)
    .split("")
    .map((char, index) => {
      index += slidingWindowStart;
      const typedLength = typedText.length;




      if (index - typedLength === SLIDINGWINDOWSIZE - 1) { //!!!!!!
        return (
          <span key={index} className="text-5xl text-blue-500">
            {char}
          </span>
        );

      } else if (index < typedLength) {
        return (
          <span key={index} className="text-5xl text-gray-600">
            {char}
          </span>
        );
      } 
      else if (index > typedLength) {
        return (
          <span key={index} className="text-5xl text-gray-500">
            {char}
          </span>
        );
      } else {
          return (
            <span key={index} className="my-0 rounded-lg ring-offset-1 ring ring-emerald-500 p-1 m-1 text-6xl font-bold text-emerald-400">
              {char === " " ? "•" : char}
            </span>
          );
      }
    });

  return (
    <>
      <div className="min-h-screen bg-zinc-200 flex flex-row items-center justify-center">
        <div>
          <div className="absolute">{wordBubbles}</div>
          <p className="text-5xl font-semibold">
            {/* {formattedTypedText(
              typeTextplaceHolder.slice(
                slidingWindowStart,
                slidingWindowStart + SLIDINGWINDOWSIZE,
              ),
            )} */}
            {formattedTypedText}
          </p>
        </div>
      </div>
    </>
  );
};

export default TypingExperience;
