import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

// Custom Hook to handle the states for scheduled interview
export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  
  // reducer function used for useReducer
  
  
  const setDay = day => dispatch({ type: SET_DAY, day });


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setDay(state.day);
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({type: SET_APPLICATION_DATA, days, appointments, interviewers})
    });

  }, []);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const id = data.id;
      const interview = data.interview;
       if (typeof data === "object" && data.type === "SET_INTERVIEW") {
        dispatch({type: SET_INTERVIEW, id: id, interview: interview });
       }
    };

    return () => socket.close();
  }, [dispatch]);
  
  // Calculate the remaining spots by interating over the days array and check how many
  // appointments.interview is NOT NULL for eachDay.

  //function to setState when add a new interview
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };


    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    //Update the API:id and setState
    return axios.put(`/api/appointments/${id}`, appointments[id])
         .then((res) => {
           dispatch({ type: SET_INTERVIEW, id, interview });
         })
  }

  function cancelInterview(id) {

    //Delete the API:id (set appointments.interview to be null) and setState
    return axios.delete(`/api/appointments/${id}`)
         .then((res) => {
          dispatch({ type: SET_INTERVIEW, id, interview: null});
         })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}