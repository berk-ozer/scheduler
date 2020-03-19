import React, { useState, useEffect } from "react";


import DayList from "components/DayList";
import Appointment from "components/Appointment"

import axios from "axios";

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Berk Ozer",
      interviewer: {
        id: 2,
        name: "Jessica Jones",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Sarah English",
      interviewer: {
        id: 3,
        name: "Justin Goebow",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState(state => ({...state, day}));

  useEffect(() => {
    axios.get("/api/days")
      // .then(response =>);
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointment
            key={appointment.id}
            {...appointment}
          />
        ))}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
