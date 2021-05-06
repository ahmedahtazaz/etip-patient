import {
  GET_ACTIVE_APPOINTMENTS,
  GET_ACTIVE_CERTIFICATES,
  GET_PROFILE,
  RESET_ERROR_MAIN,
  SET_LOADER_MAIN_SCREEN,
  UPDATE_EMAIL,
} from '../../commons/Constants';

export const moveToSettingsScreenAction = navigation => {
  return navigation.navigate('Settings');
};

export const moveToMakeAppointsAction = navigation => {
  return navigation.navigate('Make an Appointment');
};

export const moveToAppointmentDetailsAction = (navigation, path, userInfo) => {
  return navigation.navigate('AppointmentDetailsScreen', {
    path,
    userInfoParam: userInfo,
  });
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

export const getActiveAppointmentsAction = payload => {
  return {
    type: GET_ACTIVE_APPOINTMENTS,
    payload,
  };
};

export const updateEmailAction = (payload) => {
  return {
    type: UPDATE_EMAIL,
    payload
  }
}

export const resetErrorMainAction = () => {
  return {
    type: RESET_ERROR_MAIN,
  };
};

export const getActiveCertificatesAction = payload => {
  return {
    type: GET_ACTIVE_CERTIFICATES,
    payload,
  };
};
