import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      setHistory(history => {
        const newHistory = [...history];
        newHistory.splice(- 1, 1, newMode);
        return newHistory;
      }) 
    } else {
      setHistory(history => [...history, newMode]);
    }
  } 



  const back = () => {
    setHistory(history => {
      const newHistory = history.length > 1 ? [...history].slice(0, -1) : [...history];

      setMode(newHistory[newHistory.length - 1]);

      return newHistory;
    })
  }



  return {
    mode,
    transition,
    back
  }
}