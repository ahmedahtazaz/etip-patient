export const moveToAppointmentCalenderAction = (
  navigation,
  candidate,
  userInfo,
) => {
  return navigation.replace('AppointmentCalender', {candidate, userInfo});
};
