import React, { useEffect, useState } from 'react';

const COLORWINDOW = 20;
const STARTCOLORS = [200, 140, 0];
const COLORINCREASE = [10, 20, 30];
const GRAYTONE = 200;
const GRAYMAX = 240;

const TypingExperience = () => {

  const typeTextplaceHolder = "Spüre den Atemfluss, lasse deine Gedanken los und finde Ruhe in jedem Tastenanschlag.";

  const [typedText, setTypedText] = useState("");

  const handleKeyDown = (event) => {
    if (typeTextplaceHolder[typedText.length] !== event.key) {
      return;
    } else if (event.key === " ") {
      setTypedText(typedText + " ");
    } else {
      setTypedText(typedText + event.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText]);


  const formattedTypedText = typeTextplaceHolder.split('').map((char, index) => {
    const typedLength = typedText.length;
    const distance = index - typedLength;

    if (index < typedLength) {
      return <span key={index} className="text-5xl text-gray-800">{char}</span>;
    } else if (index === typedLength ) {
      return <span key={index} className="text-5xl text-amber-600">{char === ' ' ? '•' : char}</span>;
    } else if (index < typedLength + COLORWINDOW) {
      const red = Math.min(STARTCOLORS[0] + distance * COLORINCREASE[0], GRAYMAX)
      const green = Math.min(STARTCOLORS[1] + distance * COLORINCREASE[1], GRAYMAX)
      const blue = Math.min(STARTCOLORS[2] + distance * COLORINCREASE[2], GRAYMAX)
      const maxed = red === blue && red === green && red === GRAYMAX;
      const minim = maxed ? GRAYTONE : GRAYMAX;

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
