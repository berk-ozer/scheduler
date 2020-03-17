import React from "react";

import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => 
          <InterviewerListItem
            key={interviewer.id}
            id={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            setInterviewer={props.setInterviewer}
            selected={interviewer.id === props.interviewer}
          />
          )}
      </ul>
    </section>
  )
}