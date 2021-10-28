import React, {useState} from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;
  const reset = function() {
    setStudent("");
    setInterviewer("");
  }

  const cancel = function() {
    onCancel();
    reset();
  }
  return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {student}
        interviewer = {interviewer}
        onChange={(event) => setStudent(event.target.value)}      
        />
    </form>
    <InterviewerList 
      interviewers = {interviewers}
      value = {interviewer}
      onChange = {(id) => setInterviewer(id)}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick = {cancel}/* your code goes here */>Cancel</Button>
      <Button confirm onClick = {onSave}/* your code goes here */>Save</Button>
    </section>
  </section>
  </main>
  )
}
