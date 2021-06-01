import { LOGOUT,LOGOUT_IS_RESET,RESET_ERROR_MESSAGE } from "../../commons/Constants";

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
export const logoutActionReset = () => {
  return {
    type: LOGOUT_IS_RESET,
  };
};

export const resetErrorMessageAction=()=>{
  return {
    type: RESET_ERROR_MESSAGE
  };
}