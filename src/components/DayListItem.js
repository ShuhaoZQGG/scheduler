import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {
      return (
      props.spots === 0 ? <h3 className="text--light">no spots remaining</h3> :
      props.spots === 1 ? <h3 className="text--light">{props.spots} spot remaining</h3> :
      <h3 className="text--light">{props.spots} spots remaining</h3> 
      )
    }

  return (
    <li className = {DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      {formatSpots()}
    </li>
  );
}