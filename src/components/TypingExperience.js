import React, { useEffect, useState } from 'react';

const COLORWINDOW = 10;

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
      const inlineColor = `rgb(${200 + distance * 10}, ${140 + distance * 20}, ${0 + distance * 30})`;
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
      return <span key={index} className="text-5xl text-gray-400">{char}</span>;
    }
  });

  return (
    <div className='min-h-screen place-content-center bg-gray-500 flex items-center justify-center'>
      <p className='text-5xl font-semibold text-gray-300'>{formattedTypedText}</p>
    </div>
  );
};

export default TypingExperience;
