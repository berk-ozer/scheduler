import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // Build and array of interviewer list items and render
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            setInterviewer={(event) => props.onChange(interviewer.id)}
            selected={interviewer.id === props.value}
          />
        ))}
      </ul>
    </section>
  );
}

// Runtime test to restrict prop types to only accept specific data types
InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
