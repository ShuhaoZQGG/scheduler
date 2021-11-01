import React, {Fragment} from "react";
import Header from "./Header"
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import axios from "axios";

import "./style.scss";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props.bookInterview(props.id, interview)
         .then(()=>transition(SHOW))
         .catch((err)=>console.log(err));

  }


  return (
    <article className="appointment">
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
     <Show
       student={props.interview.student}
       interviewer={props.interview.interviewer}
    />
    )} 
    {mode === CREATE && <Form interviewers = {props.interviewers} onCancel = {() => back()} 
      onSave = {save}
    />}
    
    {mode === SAVING && <Status />}

    </article>

  )
}