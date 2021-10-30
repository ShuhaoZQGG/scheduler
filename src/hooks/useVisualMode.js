import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace = false) { 
    if (replace === true) {
      back();
      setMode(next);
      history.push(next);
      setHistory(history) ;
    } else {
      setMode(next);
      history.push(next) 
      setHistory(history)
    }
  }

  function back() { 
    if (history.length <= 1) {
      setMode(history[0])
    } else {
    history.pop(); 
    setMode(history[history.length-1]);
    }
  }

  return { mode, transition, back };
}

// function transition() {
//   function action() {}

//   return { action };
// }