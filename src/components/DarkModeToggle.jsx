import React from "react";
import { gsap } from "gsap";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const toggleMode = () => {
    gsap.to("body", { backgroundColor: darkMode ? "#ffffff" : "#000000", duration: 0.5 });
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleMode}
      className="fixed top-4 right-4 w-12 h-12 rounded-full bg-blue-500 dark:bg-yellow-500 flex items-center justify-center shadow-lg"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;
