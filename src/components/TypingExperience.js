import React, {useEffect} from 'react';

const TypingExperience = () => {

  const typeTextplaceHolder = "Spüre den Atemfluss, lasse deine Gedanken los und finde Ruhe in jedem Tastenanschlag.";

  const [typedText, setTypedText] = React.useState("");

  const handleKeyDown = (event) => {
    setTypedText(typedText + event.key);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  return (
    <div className='min-h-screen place-content-center bg-gray-500'>
      <p className='text-xl font-semibold text-red-500'>{typeTextplaceHolder}</p>
    </div>
  );
};

export default TypingExperience;