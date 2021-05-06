import {GET_FAMILY_MEMBER, REMOVE_FAMILY_MEMBER} from '../../commons/Constants';

export const moveToSettingsScreenAction = navigation => {
  return navigation.navigate('Settings');
};

export const moveToMakeAppointsAction = navigation => {
  return navigation.navigate('Make an Appointment');
};

export const moveToAppointmentDetailsAction = (navigation, path, userInfo) => {
  return navigation.navigate('AppointmentDetailsScreen', {
    path: path,
    userInfoParam: userInfo,
  });
};

export const moveToUserinfScreenAction = (navigation, data, addFamily) => {
  if (!addFamily)
    return navigation.navigate('UserInfoScreen', {
      data,
    });
  else
    return navigation.navigate('UserInfoScreen', {
      data,
      addFamily,
    });
};

export const getFamilyMembersAction = data => {
  return {
    type: GET_FAMILY_MEMBER,
    payload: data,
  };
};

export const removeFamilyMemberAction = data => {
  return {
    type: REMOVE_FAMILY_MEMBER,
    payload: data,
  };
};
