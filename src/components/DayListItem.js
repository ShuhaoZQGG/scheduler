import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { spots, name, setDay, selected } = props;
  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = () => {
      return (
        spots === 0 ? "no spots remaining" :
        spots === 1 ? `${spots} spot remaining` :
      `${spots} spots remaining`
      )
    }

  return (
    <li className={DayListItemClass} onClick={() => setDay(name)} selected={selected} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}