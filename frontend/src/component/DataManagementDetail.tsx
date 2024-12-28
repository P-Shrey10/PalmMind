import React, { useEffect, useState, useRef } from "react";

const DataManagementDetail: React.FC = () => {
  const [text, setText] = useState<string>("");
  const indexRef = useRef<number>(0);
  useEffect(() => {
    const textToDisplay = "Data Management!";
    const typingSpeed = 300;

    const interval = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex < textToDisplay.length) {
        setText((prev) => prev + textToDisplay[currentIndex]);
        indexRef.current = currentIndex + 1;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[83vh] bg-gray-100 flex items-center justify-center">
      <div className="text-4xl font-bold text-gray-800">
        <span className="text-blue-500">{text}</span>
      </div>
    </div>
  );
};

export default DataManagementDetail;
