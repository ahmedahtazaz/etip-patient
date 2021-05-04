import {GET_PROFILE, SET_LOADER_MAIN_SCREEN} from '../../commons/Constants';

export const moveToSettingsScreenAction = navigation => {
  return navigation.navigate('Settings');
};

export const moveToMakeAppointsAction = navigation => {
  return navigation.navigate('Make an Appointment');
};

export const moveToAppointmentDetailsAction = (navigation, path, userInfo) => {
  return navigation.navigate('AppointmentDetailsScreen', {path, userInfoParam: userInfo});
};

export const getProfileAction = payload => {
  return {
    type: GET_PROFILE,
    payload,
  };
};

export const setLoaderAction = status => {
  return {
    type: SET_LOADER_MAIN_SCREEN,
    status,
  };
};
