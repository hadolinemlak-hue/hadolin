let appointments = [];

export function setAppointments(arr = []) {
  appointments = Array.isArray(arr) ? arr : [];
}

export function addAppointment(app) {
  appointments.push(app);
  console.log("Appointments:", appointments);
}

export function getAppointments() {
  return appointments;
}
