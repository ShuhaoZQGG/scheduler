import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const {interviewers, setInterviewer, interviewer} = props;
  const InterviewerListItems = interviewers.map((eachInterviewer) => 
      <InterviewerListItem 
        key = {eachInterviewer.id}
        name = {eachInterviewer.name}
        avatar = {eachInterviewer.avatar}
        selected = {eachInterviewer.id === interviewer}
        setInterviewer = {() => setInterviewer(eachInterviewer.id)}
      />
  )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListItems}
      </ul>
    </section>
  )
}