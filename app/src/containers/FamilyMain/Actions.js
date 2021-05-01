export const moveToSettingsScreenAction = navigation => {
  return navigation.navigate('Settings');
};

export const moveToMakeAppointsAction = navigation => {
  return navigation.navigate('Make an Appointment');
};

export const moveToAppointmentDetailsAction = (navigation, path, title, qrObj) => {
  return navigation.navigate('AppointmentDetailsScreen', {
    path: path,
    title: title,
    qrObj: qrObj
  });
};

export const moveToUserinfScreenAction = (navigation, data) => {
  return navigation.navigate("UserInfoScreen", {
    data
  })
}