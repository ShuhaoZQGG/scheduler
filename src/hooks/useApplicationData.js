import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { actions } from "@storybook/addon-actions";

const SET_DAY = "SET_DAY";

  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

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
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        return { ...state, id: action.id, interview: action.interiew }
      }
      case SET_SPOTS: {
        return {...state, appointments: action.appointments, days: action.days}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  
  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setDay(state.day);
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({type: SET_APPLICATION_DATA, days, appointments, interviewers})
    }) 
    
  }, [])

  // Calculate the remaining spots by interating over the days array and check how many
  // appointments.interview is NOT NULL for eachDay.
  function spotsRemaininig(appointments) {
    return state.days.map(eachDay => {
      let spotsRemaininig = 0;
      for (let id of eachDay.appointments) {
        if (!appointments[id].interview) {
          spotsRemaininig ++;
        }
      }

      return {...eachDay, spots: spotsRemaininig};
    })
  }

  //function to setState when add a new interview
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    console.log(appointment);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    dispatch({ type: SET_INTERVIEW, id, interview });

    //Update the API:id and setState
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
         .then((res) => {
           dispatch({type: SET_SPOTS, appointments, days: spotsRemaininig(appointments)})
           console.log(res);
         })
  }

  function cancelInterview(id, interview) {
    console.log(id, interview.interviewer.id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    dispatch({ type: SET_INTERVIEW, id, interview: null });

    //Delete the API:id (set appointments.interview to be null) and setState
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
         .then((res) => {
          dispatch({type: SET_SPOTS, appointments, days: spotsRemaininig(appointments)})
           console.log(res);
         })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}