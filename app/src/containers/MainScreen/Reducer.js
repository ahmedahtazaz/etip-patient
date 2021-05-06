import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_LOADER_MAIN_SCREEN,
  GET_ACTIVE_APPOINTMENTS_SUCCESS,
  GET_ACTIVE_APPOINTMENTS_FAILURE,
  RESET_ERROR_MAIN,
  GET_ACTIVE_CERTIFICATES_SUCCESS,
  GET_ACTIVE_CERTIFICATES_FAILURE,
  UPDATE_USER_SUCCESS,
  SIGNUP_SUCCES,
} from '../../commons/Constants';
const INITIAL_STATE = {
  loader: false,
  errMessage: undefined,
  userInfo: null,
  activeAppointments: null,
  activeCertificates: null,
};

export default function mainScreenReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          userInfo: action.payload,
        };

      case GET_PROFILE_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          userInfo: null,
        };

      case GET_ACTIVE_APPOINTMENTS_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          activeAppointments: action.payload,
        };

      case GET_ACTIVE_APPOINTMENTS_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          activeAppointments: null,
        };
      case GET_ACTIVE_CERTIFICATES_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          activeCertificates: action.payload,
        };

      case GET_ACTIVE_CERTIFICATES_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          activeCertificates: null,
        };

      case SET_LOADER_MAIN_SCREEN:
        return {
          ...state,
          loader: action.status,
        };

      case RESET_ERROR_MAIN:
        return {
          ...state,
          errMessage: undefined,
        };

      case UPDATE_USER_SUCCESS:
      case SIGNUP_SUCCES:
        return {
          ...state,
          userInfo: action.payload,
        };

      default:
        return state;
    }
  };
}
