import { LOAD_INIT, ADD_FAMILY_MEMBER, SIGNUP, EDIT_FAMILY_MEMBER } from '../../commons/Constants';

export const signUpAction = payload => {
  return {
    type: SIGNUP,
    payload,
  };
};

export const addFamilyMemberAction = payload => {
  return {
    type: ADD_FAMILY_MEMBER,
    payload,
  };
};

export const updateFamilyMemberAction = payload => {
  return {
    type: EDIT_FAMILY_MEMBER,
    payload,
  };
};



export const moveToMainScreenAction = navigation => {
  return navigation.replace('MainScreen');
};
