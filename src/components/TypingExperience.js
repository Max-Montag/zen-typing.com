import React, { useEffect, useState } from 'react';

const COLORWINDOW = 20;
const SLIDINGTHRESHOLD = 15;
const SLIDINGWINDOW = 50;
const STARTCOLORS = [200, 140, 0];
const COLORINCREASE = [10, 20, 30];
const GRAYTONE = 200;
const WHITEMAX = 240;

const TypingExperience = () => {

  const typeTextplaceHolder = "Spüre den Atemfluss, lasse deine Gedanken los und finde Ruhe in jedem Tastenanschlag. Atme tief ein und aus, und lass dich von der Schönheit des Augenblicks tragen. Du bist hier und jetzt, und das ist alles, was zählt.";

  const [typedText, setTypedText] = useState("");
  const [slidingWindowStart, setSlidingWindowStart] = useState(0);

  const handleKeyDown = (event) => {
    if (typeTextplaceHolder[typedText.length] !== event.key) {
      return;
    }
    setTypedText(typedText + event.key);
    if (typedText.length > SLIDINGTHRESHOLD) {
      setSlidingWindowStart( slidingWindowStart + 1);

    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText]);


  const formattedTypedText = typeTextplaceHolder.slice(slidingWindowStart, slidingWindowStart + SLIDINGWINDOW).split('').map((char, index) => {
    index += slidingWindowStart;
    const typedLength = typedText.length;
    const distance = index - typedLength;

    if (index < typedLength) {
      return <span key={index} className="text-5xl text-gray-800">{char}</span>;
    } else if (index === typedLength ) {
      return <span key={index} className="text-5xl text-amber-600">{char === ' ' ? '•' : char}</span>;
    } else if (index < typedLength + COLORWINDOW) {
      const red = Math.min(STARTCOLORS[0] + distance * COLORINCREASE[0], WHITEMAX)
      const green = Math.min(STARTCOLORS[1] + distance * COLORINCREASE[1], WHITEMAX)
      const blue = Math.min(STARTCOLORS[2] + distance * COLORINCREASE[2], WHITEMAX)
      const maxed = red === blue && red === green && red === WHITEMAX;
      const minim = maxed ? GRAYTONE : WHITEMAX;
      const inlineColor = `rgb(${Math.min(red, minim)}, ${Math.min(green, minim)}, ${Math.min(blue, minim)})`;
      return (
        <span
          key={index}
          style={{ color: inlineColor }}
          className="text-5xl"
        >
          {char === ' ' ? '•' : char}
        </span>
      );
    } else {
      return <span key={index} className="text-5xl text-gray-300">{char}</span>;
    }
  });

  return (
    <div className='min-h-screen place-content-center bg-gray-500 flex items-center justify-center'>
      <p className='text-5xl font-semibold text-gray-300'>{formattedTypedText}</p>
    </div>
  );
};

export default TypingExperience;
