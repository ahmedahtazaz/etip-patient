import {
  RESET_IS_PHONE_UPDATED,
  SEND_OTP,
  SEND_OTP_FAILURE,
  SEND_OTP_SUCCESS,
  UPDATE_PHONE,
  UPDATE_PHONE_FAILURE,
  UPDATE_PHONE_SUCCESS,
  VERIFY_OTP,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
} from '../../commons/Constants';

const INITIAL_STATE = {
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  initPayLoad: undefined,
  otpSend: false,
  otpVerified: false,
  verifyOptPayload: null,
  sendOptPayload: null,
  isPhoneUpdated: false
};

export default function phoneReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case SEND_OTP_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          otpSend: true,
          sendOptPayload: action.payload,
        };

      case SEND_OTP_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          otpSend: false,
          sendOptPayload: null,
        };

      case SEND_OTP:
      case VERIFY_OTP:
        return {
          ...state,
          errMessage: undefined,
          loader: true,
          sendOptPayload: null,
          verifyOptPayload: null,
        };

      case VERIFY_OTP_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          otpVerified: true,
          verifyOptPayload: action.payload,
        };

      case VERIFY_OTP_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          otpVerified: false,
        };

      case UPDATE_PHONE:
        return {
          ...state,
          loader: true,
          errMessage: undefined
        }

      case UPDATE_PHONE_SUCCESS:
        return {
          ...state,
          loader: false,
          isPhoneUpdated: true
        }

      case UPDATE_PHONE_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage
        }

      case RESET_IS_PHONE_UPDATED:
        return {
          ...state,
          isPhoneUpdated: false
        }

      default:
        return state;
    }
  };
}
