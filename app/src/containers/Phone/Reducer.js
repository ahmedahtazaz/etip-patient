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
  UPDATE_PHONE_SEND_OTP_SUCCESS,
  RESET_PHONE,
} from '../../commons/Constants';

const INITIAL_STATE = {
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  initPayLoad: undefined,
  otpSend: false,
  updatePhoneOtpSend: false,
  otpVerified: false,
  verifyOptPayload: null,
  sendOptPayload: null,
  updatePhoneSendOptPayload: null,
  isPhoneUpdated: false,
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

      case UPDATE_PHONE_SEND_OTP_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          updatePhoneOtpSend: true,
          updatePhoneSendOptPayload: action.payload,
        };

      case SEND_OTP_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          otpSend: false,
          sendOptPayload: null,
        };

      case VERIFY_OTP:
        return {
          ...state,
          errMessage: undefined,
          loader: true,
          verifyOptPayload: null,
          otpVerified: false,
        };

      case SEND_OTP:
        return {
          ...state,
          errMessage: undefined,
          loader: true,
          sendOptPayload: null,
          otpSend: false,
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
          errMessage: undefined,
        };

      case UPDATE_PHONE_SUCCESS:
        return {
          ...state,
          loader: false,
          isPhoneUpdated: true,
        };

      case UPDATE_PHONE_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };

      case RESET_IS_PHONE_UPDATED:
        return {
          ...state,
          isPhoneUpdated: false,
          updatePhoneSendOptPayload: null,
          updatePhoneOtpSend: false,
        };

      case RESET_PHONE:
        return {
          ...state,
          isPhoneUpdated: false,
          updatePhoneSendOptPayload: null,
          updatePhoneOtpSend: false,
          otpSend: false,
          otpVerified: false,
          loader: false,
          errMessage: false,
        };

      default:
        return state;
    }
  };
}
