import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  
  const transition = newMode => setMode(newMode);

  return {
    mode,
    transition
  }
}