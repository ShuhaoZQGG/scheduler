export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(user => user.name === day);
  const filteredAppointments = [];
  if (!state.days) {
    return [];
  }

  if(!state.days.day) {
    return [];
  }
  for (const id of filteredDay[0].appointments) {
    filteredAppointments.push(state.appointments[id]);
  }
  return filteredAppointments;
}
