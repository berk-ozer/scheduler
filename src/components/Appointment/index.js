import React from "react";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss"



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );



  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }



  function deleteInterview() {
    transition(DELETE);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  } 



  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}

      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        /> 
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SAVE && (
        <Status
          message="Saving"
        />
      )}

      {mode === DELETE && (
        <Status
          message="Deleting"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this interview?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}

    </article>
  )
}