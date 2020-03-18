export const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find(elem => elem.name === day);

  if (!dayObj) {
    return [];
  }

  const appointmentIds = dayObj.appointments;

  const appointmentsForDay = [];

  for (const id in state.appointments) {
    if (appointmentIds.includes(Number(id))) {
      appointmentsForDay.push(state.appointments[id])
    }
  }

  return appointmentsForDay;
}