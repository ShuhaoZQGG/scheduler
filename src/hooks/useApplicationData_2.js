import React, {useEffect} from "react";

export default function useApplicationData_2(dispatch) {
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    
    // socket.onopen = function (event) {
    //   socket.send("ping")
    // }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const id = data.id;
      const interview = data.interview;
      if (typeof data === "object" && data.type === "SET_INTERVIEW") {
        console.log(data);
        dispatch(data);
      }
    };

    return () => socket.close();
  }, [dispatch])
}