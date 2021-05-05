import {
  GET_FAMILY_MEMBER_FAILURE,
  GET_FAMILY_MEMBER_SUCCESS,
  GET_FAMILY_MEMBER,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_APPOINTMENT_SLOT,
  GET_APPOINTMENT_SLOT_SUCCESS,
  GET_APPOINTMENT_SLOT_FAILURE,
} from '../../commons/Constants';

const INITIAL_STATE = {
  userProfile: null,
  loader: false,
  errMessage: undefined,

};

export default function appointmentDetailsReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_PROFILE:
        return {
          ...state,
          loader: true,
        };

      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          loader: false,
          userProfile: action.payload,
        };

      case GET_PROFILE_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };

      
      default:
        return state;
    }
  };
}
