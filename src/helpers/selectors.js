export  function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(user => user.name === day);
  const filteredAppointments = [];
  if (!state.days) {
    return [];
  }

  if(!filteredDay[0]) {
    return [];
  }
  for (const id of filteredDay[0].appointments) {
    filteredAppointments.push(state.appointments[id]);
  }
  return filteredAppointments;
}

export  function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter(user => user.name === day);
  const filtereInterviewers = [];
  if (!state.days) {
    return [];
  }

  if (!state.interviewers) {
    return [];
  }

  if(!filteredDay[0]) {
    return [];
  }

  for (const id of filteredDay[0].interviewers) {
    filtereInterviewers.push(state.interviewers[id]);
  }

  return filtereInterviewers;
}

export  function getInterview(state, interview) {
  if (!interview) return null;
  let filteredInterview = {}

  filteredInterview.student = interview.student
  filteredInterview.interviewer = state.interviewers[interview.interviewer];

  return filteredInterview;
}

