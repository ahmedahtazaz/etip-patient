export const moveToSettingsScreenAction = navigation => {
  return navigation.navigate('Settings');
};

export const moveToMakeAppointsAction = navigation => {
  return navigation.navigate('Make an Appointment');
};

export const moveToAppointmentDetailsAction = (navigation, path, userInfo) => {
  return navigation.navigate('AppointmentDetailsScreen', {
    path: path,
    userInfoParam: userInfo,
  });
};
