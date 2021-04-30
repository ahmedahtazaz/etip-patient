import { LOAD_INIT, ADD_USER_INFO, ADD_FAMILY_MEMBER } from '../../commons/Constants';

export const addUserInfo = userObj => {
  return {
    type: ADD_USER_INFO,
    payload: userObj,
  };
};

export const addFamilyMember = familyMember => {
  return {
    type: ADD_FAMILY_MEMBER,
    payload: familyMember,
  };
};



export const moveToMainScreenAction = navigation => {
  return navigation.replace('MainScreen');
};
