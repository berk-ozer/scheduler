import { useState } from "react";

// Custom hook to handle the visual modes of <Appointment> component

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Handles transtioning into a new visual mode
  // Keeps track of the previous mode in "history", unless "replace" was passed in as true
  const transition = (newMode, replace = false) => {
    setMode(newMode);

    setHistory(history => {
      if (replace) {
        const newHistory = [...history];
        newHistory.splice(-1, 1, newMode);
        return newHistory;
      } else {
        return [...history, newMode];
      }
    });
  };

  // Handles going back to the previous visual mode
  // Won't go back further if current visual mode is the only one in history
  const back = () => {
    setHistory(history => {
      const newHistory =
        history.length > 1 ? [...history].slice(0, -1) : [...history];

      setMode(newHistory[newHistory.length - 1]);

      return newHistory;
    });
  };

  // Returns state and functions to be used in Appointment/index.js
  return {
    mode,
    transition,
    back
  };
}
