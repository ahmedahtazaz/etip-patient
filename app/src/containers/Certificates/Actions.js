import {
  GET_EXPIRED_CERTIFICATES,
  SET_LOADER_CERTIFICATES_SCREEN,
} from '../../commons/Constants';

export const moveToSettingsScreenAction = navigation => {
  return navigation.navigate('Settings');
};

export const moveToMakeAppointsAction = navigation => {
  return navigation.navigate('Make an Appointment');
};

export const moveToAppointmentDetailsAction = (navigation, path) => {
  return navigation.navigate('AppointmentDetailsScreen', {path: path});
};

export const setLoaderAction = status => {
  return {
    type: SET_LOADER_CERTIFICATES_SCREEN,
    status,
  };
};

export const getExpiredCertificatesAction = payload => {
  return {
    type: GET_EXPIRED_CERTIFICATES,
    payload,
  };
};
