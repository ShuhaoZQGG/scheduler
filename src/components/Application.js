import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import Button from "./Button";
import DayList from './DayList';
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"


// const dailyAppointments = [];


export default function Application(props) {
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

  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentListItems = getAppointmentsForDay(state, state.day).map((appointment) => {
    
  const interview = getInterview(state, appointment.interview);
  
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
         .then((res) => {
           setState({...state, appointments});
           console.log(res);
         })
         .catch((err) => {
           console.log(err);
          });
  }

    return (
    <Appointment
        key={appointment.id}
        id={appointment.id}
        time = {appointment.time}
        interview={interview}
        interviewers = {interviewers}
        bookInterview = {bookInterview}
      />
    )
    }
  )


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* <Button confirm = "hello" className = "button" onClick = {alert("hi")} dsiabled = "disabled"> Confirm</Button> */}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentListItems}
        <Appointment 
            time="5pm"
        />
      </section>
    </main>
  );
}
