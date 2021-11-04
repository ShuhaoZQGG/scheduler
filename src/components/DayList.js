import React from "react";
import DayListItem from "./DayListItem";
export default function DayList(props){
  const { days, value, onChange} = props;
  // Iterate days to display each day in DayListItem
  const dayListItem = days.length >= 1 && days.map((day) => 
    <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === value}
        setDay={onChange}  
      />
  )
  return (
    <ul>
      {dayListItem}
    </ul>
  )
}