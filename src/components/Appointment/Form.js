import React, {useState} from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;
  const [error, setError] = useState("");

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = function() {
    onCancel();
    reset();
    setError("");
  }

  const save = function(){
    validate();
    reset();
  }

  function validate() {
    if (student === "" || interviewer === null) {
      setError("Student and interviewer's name cannot be blank");
      return;
    }
    
    setError("");
    onSave(student, interviewer);
  }

  return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={student}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        interviewer={interviewer}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"      
        />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
      interviewers={interviewers}
      value={interviewer}
      onChange={(id) => setInterviewer(id)}
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}/* your code goes here */>Cancel</Button>
      <Button confirm onClick={save}/* your code goes here */>Save</Button>
    </section>
  </section>
  </main>
  )
}
