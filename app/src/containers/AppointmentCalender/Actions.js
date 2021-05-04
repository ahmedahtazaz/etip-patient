import { GET_APPOINTMENT_SLOT, GET_REGION } from "../../commons/Constants";

export const moveToTestCentersAction = navigation => {
  return navigation.navigate('testCenter');
};

export const moveToTimeSlotsAction = navigation => {
  return navigation.navigate('appointmentSlot');
};

export const moveToTimeTestCenter = (navigation, region, setTestCenterValue) => {
  return navigation.navigate('testCenter', { region, setTestCenterValue });
};

export const getAppointmentSlotsAction = (data) => {
  return {
    type: GET_APPOINTMENT_SLOT,
    payload: data
  }
}

export const GetRegions = (payload) => {
  return {
    type: GET_REGION,
    payload
  };
};