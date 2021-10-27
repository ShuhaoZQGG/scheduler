import React from "react";
import Header from "./Header"
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";

import "./style.scss";

export default function Appointment (props) {
  return (
    <article className="appointment">
    {props.time ? <h5>Appointment at {props.time}</h5> : <h5>No Appointments</h5>}
    </article>

  )
}