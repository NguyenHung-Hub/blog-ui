"use client";
import { useEffect, useState } from "react";
import MoonIcon from "~/components/Icons/MoonIcon";
import SunIcon from "~/components/Icons/SunIcon";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="rounded">
      {darkMode ? (
        <span>
          <MoonIcon color="#fff" />
        </span>
      ) : (
        <span>
          <SunIcon color="#000" />
        </span>
      )}
    </button>
  );
}
