import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next) { 
    setMode(next);
    history.push(next)
    setHistory(history)
    console.log(history);

  }
  function back() { 
    history.pop(); 
    setMode(history[history.length-1]);
  }

  return { mode, transition, back };
}

// function transition() {
//   function action() {}

//   return { action };
// }