import { LOGOUT,LOGOUT_IS_RESET } from "../../commons/Constants";

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
export const logoutAction = data => {
  return {
    type: LOGOUT,
    payload: data,
  };
};
export const logoutActionReset = data => {
  return {
    type: LOGOUT_IS_RESET,
  };
};