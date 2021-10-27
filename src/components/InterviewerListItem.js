import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames("interviewers_item", {
    "interviewers__item--selected": props.selected
  })
  return (
    <li className= {InterviewerListItemClass} onClick = {() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src= {props.avatar}
        alt= {props.name}
      />
      {props.name}
    </li>
  )
}