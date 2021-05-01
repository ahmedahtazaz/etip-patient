import { SEND_OTP, VERIFY_OTP } from "../../commons/Constants";

export const moveToUserInfoScreenAction = navigation => {
  return navigation.replace('UserInfoScreen');
};

export const sendOTPAction = (payload) => {
  return {
    type: SEND_OTP,
    payload
  }
}


export const verifyOTPAction = (payload) => {
  return {
    type: VERIFY_OTP,
    payload
  }
}