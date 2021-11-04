/* This is the useApplicationData hook written by using useState,
   It is updated to useReducer in the newest file

import React, {useState, useEffect} from "react";
import axios from "axios";

// Custom Hook to handle the states for scheduled interview
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      // console.log(all)
      setDay(state.day);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
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

    setState({...state, appointments});

    //Update the API:id and setState
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
         .then((res) => {
           setState({...state, appointments, days: spotsRemaininig(appointments)});
           console.log(res);
         })
        //  .catch((err) => {
        //    console.log(err);
        //   });
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
    
    //Delete the API:id (set appointments.interview to be null) and setState
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
         .then((res) => {
           setState({...state, appointments, days: spotsRemaininig(appointments)});
           console.log(res);
         })
        //  .catch((err) => {
        //    console.log(err);
        //   });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
*/