import React, { useEffect, useState, useRef } from "react";

const WorkspaceDetail: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(0);
  const indexRef = useRef<number>(0);

  useEffect(() => {
    const textToDisplay = "Work Space Detail!";
    const typingSpeed = 300;

    const typingInterval = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex < textToDisplay.length) {
        setText((prev) => prev + textToDisplay[currentIndex]);
        indexRef.current = currentIndex + 1;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    const fadeInInterval = setInterval(() => {
      setOpacity((prev) => {
        if (prev < 1) {
          return prev + 0.05;
        } else {
          clearInterval(fadeInInterval);
          return 1;
        }
      });
    }, 50);

    return () => {
      clearInterval(typingInterval);
      clearInterval(fadeInInterval);
    };
  }, []);

  return (
    <div className="min-h-[83vh] bg-gray-100 flex items-center justify-center">
      <div
        className="text-4xl font-bold text-gray-800"
        style={{ opacity: opacity, transition: "opacity 0.5s ease-in-out" }}
      >
        <span className="text-blue-500">{text}</span>
      </div>
    </div>
  );
};

export default WorkspaceDetail;
