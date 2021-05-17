import {
  LOAD_INIT,
  ADD_FAMILY_MEMBER,
  SIGNUP,
  EDIT_FAMILY_MEMBER,
  RESET_USER_CREATED,
  RESET_FAMILY_MEMBER_ADDED,
  UPDATE_USER,
  GET_RELATIONS,
  GET_USERINFO_REGION
} from '../../commons/Constants';

export const signUpAction = payload => {
  return {
    type: SIGNUP,
    payload,
  };
};

export const updateUserAction = (payload) => {
  return {
    type: UPDATE_USER,
    payload
  }
}

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


export const resetIsUserCreatedAction = () => {
  return {
    type: RESET_USER_CREATED
  }
}

export const resetIsFamilyMemberAddedAction = () => {
  return {
    type: RESET_FAMILY_MEMBER_ADDED
  }
}

export const getRelationsAction = (payload) => {
  return {
    type: GET_RELATIONS,
    payload
  }
}

export const getRegionsAction = (payload) => {
  return {
    type: GET_USERINFO_REGION,
    payload
  }
}


export const moveToMainScreenAction = navigation => {
  return navigation.replace('MainScreen');
};

export const moveToOtpScreen = (navigation,data) => {
  return navigation.replace('phone');
};