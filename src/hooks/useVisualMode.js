import React, {useState, useEffect} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState([]);
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    setMode(initial);
    setHistory([initial]);
  }, []);

  useEffect(() => {
    setMode(history[history.length -1]);
  }, [history])

  function transition(next, replace = false) { 
    if (replace) {
      back(); 
    } 

    setMode(next);
    setHistory(prevState => ([...prevState, next]));
  }

  function back() { 
    if (history.length >= 2) {
      let copyHistory = [...history];
      copyHistory.pop();
      setHistory(prevState => ([...copyHistory]));
      return;
    }
  }

  return { mode, transition, back };
}