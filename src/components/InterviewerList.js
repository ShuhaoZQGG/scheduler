import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const {interviewers, onChange, value} = props;
  // iterate over the interviewers to create a listItem for each interviewer
  const InterviewerListItems = interviewers.map((eachInterviewer) => 
      <InterviewerListItem 
        key = {eachInterviewer.id}
        name = {eachInterviewer.name}
        avatar = {eachInterviewer.avatar}
        selected = {eachInterviewer.id === value}
        setInterviewer = {() => {
          onChange(eachInterviewer.id)
          }}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};