export const moveToUserUpdateSettingScreenAction = (
  path,
  navigation,
  title,
) => {
  return navigation.navigate(path, {title: title});
};

export const moveToAppointmentDetailsAction = (navigation, path, userInfo) => {
  return navigation.navigate('AppointmentDetailsScreen', {
    path,
    userInfoParam: userInfo,
  });
};
