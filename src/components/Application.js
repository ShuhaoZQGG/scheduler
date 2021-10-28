import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import Button from "./Button";
import DayList from './DayList';
import Appointment from "./Appointment";



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
         .then((res) => {
           console.log(res);
           setDays([...res.data])
          });
  }, [])

  const appointmentListItems = appointments.map((appointment) => 
    <Appointment
        key={appointment.id}
        id={appointment.id}
        time = {appointment.time}
        interview={appointment.interview}
      />
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
        days={days}
        value={days}
        onChange={setDays}
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
      </section>
    </main>
  );
}
