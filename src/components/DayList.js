import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  // Build an array of day list items and render
  return (
    <ul>
      {props.days.map(day => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={props.day === day.name}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}
