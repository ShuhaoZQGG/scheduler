import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import Button from "./Button";
import DayList from './DayList';
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData"

// const dailyAppointments = [];


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentListItems = getAppointmentsForDay(state, state.day).map((appointment) => {
    
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
        key={appointment.id}
        id={appointment.id}
        time = {appointment.time}
        interview={interview}
        interviewers = {interviewers}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
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
