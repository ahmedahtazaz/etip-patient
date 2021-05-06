import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_LOADER_MAIN_SCREEN,
  GET_ACTIVE_APPOINTMENTS_SUCCESS,
  GET_ACTIVE_APPOINTMENTS_FAILURE,
  RESET_ERROR_MAIN,
  GET_ACTIVE_CERTIFICATES_SUCCESS,
  GET_ACTIVE_CERTIFICATES_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE
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

      case UPDATE_USER:
        return {
          ...state,
          loader: true,
          errMessage: undefined
        }

      case UPDATE_USER_SUCCESS:
      case UPDATE_EMAIL_SUCCESS:
        return {
          ...state,
          loader: false,
          userInfo: { ...action.payload },
          errMessage: undefined
        }

      case UPDATE_USER_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage
        }

      case UPDATE_EMAIL_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage
        }

      default:
        return state;
    }
  };
}
