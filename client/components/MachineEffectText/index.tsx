import React, { useState, useEffect } from "react";

export const MachineEffectText = ({
  text,
  speed = 100,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setTypingComplete(false);

    const typeText = async () => {
      setDisplayedText("");
      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, speed));
        if (isMounted) setDisplayedText((prev) => prev + text[i]);
      }
      setTypingComplete(true);
    };

    typeText();

    // Cursor piscante enquanto digita
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      isMounted = false;
      clearInterval(cursorInterval);
    };
  }, [text, speed]);

  return (
    <span style={{ fontSize: "24px", fontFamily: "Saira, sans-serif" }}>
      {displayedText}
      {!typingComplete && showCursor && (
        <span style={{ fontWeight: "bold" }}>|</span>
      )}
    </span>
  );
};
