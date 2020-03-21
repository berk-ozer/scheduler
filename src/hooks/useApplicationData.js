import { useReducer, useEffect } from "react";
import axios from "axios";



// Constants used with the reducer
const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APP_DATA = "SET_APP_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";




// Reducer function which handles state
function reducer(state, action) {

  const reducers = {
    [SET_DAY]: function(state, value) {
      return ({ ...state, ...value });
    },

    [SET_APP_DATA]: function(state, value) {
      return ({ ...state, ...value});
    }, 

    [SET_DAYS]: function(state, value) {
      return ({ ...state, days: value})
    },

    [SET_INTERVIEW]: function(state, value) {
      const appointment = {
        ...state.appointments[value.id],
        interview: {...value.interview}
      }
      const appointments = {
        ...state.appointments,
        [value.id]: appointment
      }
      return ({ ...state, appointments});
    }
  }

  return reducers[action.type](state, action.value) || state;
}





export default function useApplicationData() {

  // State management
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })




  // Updates state for day
  const setDay = day => dispatch({ type: SET_DAY, value: {day} });




  // Gets data from db to set state, ran on initial render
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => dispatch({ type: SET_APP_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data }}));
  }, []);




  // Updates remaining spots in days after an interview is set
  useEffect(() => {
    axios.get("/api/days")
      .then(days => dispatch({ type: SET_DAYS, value: days.data }));
  }, [state.appointments])




  // Books or updates an interview, updates db and state
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => dispatch({ type: SET_INTERVIEW, value: {id, interview} }));
  }




  // Cancels an interview, updates db and state
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(response => dispatch({ type: SET_INTERVIEW, value: {id, interview: null} }));
  }



  
  // Returns state and functions to be used in Application
  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }
}