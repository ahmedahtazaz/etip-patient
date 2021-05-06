import {
  CREATE_APPOINTMENT,
  GET_APPOINTMENT_SLOT,
  GET_REGION,
  SET_TEST_CENTER,
  RESET_MAKE_APPOINTMENT,
} from '../../commons/Constants';

export const moveToTestCentersAction = navigation => {
  return navigation.navigate('testCenter');
};

export const moveToTimeSlotsAction = navigation => {
  return navigation.navigate('appointmentSlot');
};

export const moveToTimeTestCenter = (navigation, region) => {
  return navigation.navigate('testCenter', {region});
};

export const getAppointmentSlotsAction = data => {
  return {
    type: GET_APPOINTMENT_SLOT,
    payload: data,
  };
};

export const bookAppointmentAction = data => {
  return {
    type: CREATE_APPOINTMENT,
    payload: data,
  };
};

export const GetRegions = payload => {
  return {
    type: GET_REGION,
    payload,
  };
};

export const setTestCenterAction = center => {
  return {
    type: SET_TEST_CENTER,
    center,
  };
};

export const resetMakeAppointmentAction = () => {
  return {
    type: RESET_MAKE_APPOINTMENT,
  };
};

export const moveToTMainScreenAction = navigation => {
  return navigation.replace('MainScreen');
};
