import { GET_REGION } from "../../commons/Constants";

export const moveToTestCentersAction = navigation => {
  return navigation.navigate('testCenter');
};

export const moveToTimeSlotsAction = navigation => {
  return navigation.navigate('appointmentSlot');
};

export const moveToTimeTestCenter = (navigation, region) => {
  return navigation.navigate('testCenter', { region });
};

export const GetRegions = (payload) => {
  return {
    type: GET_REGION,
    payload
  };
};