import React, { useEffect} from "react";
import Header from "./Header"
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

import "./style.scss";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

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
         .catch(err =>{
           console.log(err);
           transition(ERROR_SAVE, true);
         });

  }

  function onDelete() {        
    transition(DELETING, true);

    props.cancelInterview(props.id, props.interview)
         .then(() => transition(EMPTY))
         .catch(err => {
           console.log(err);
           transition(ERROR_DELETE, true)
          });
  }
  
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);

  return (
    <article className="appointment" data-testid = "appointment">
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && (
     <Show
       student={props.interview.student}
       interviewer={props.interview.interviewer}
       onDelete={() => transition(CONFIRM)}
       onEdit={() => transition(EDIT)}
    />
    )} 
    {mode === CREATE && <Form interviewers = {props.interviewers} onCancel={back} 
      onSave = {save}
    />}
    
    {mode === SAVING && <Status message = "Saving"/>}
    {mode === DELETING && <Status message = "Deleting"/>}
    {mode === CONFIRM && <Confirm message="Are you sure to cancel the interview?" onCancel={back} onConfirm={onDelete}/>}
    {mode === EDIT && 
    <Form 
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers} 
      onCancel={back} 
      onSave={save}
    />}

    {mode === ERROR_SAVE && <Error message="Could not save the appointment" onClose={back}/>}
    {mode === ERROR_DELETE && <Error message="Could not cancel the appointment" onClose={back}/>}
    </article>

  )
}