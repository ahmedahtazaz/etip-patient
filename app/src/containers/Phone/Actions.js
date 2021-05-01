import { SEND_OTP } from "../../commons/Constants";

export const moveToUserInfoScreenAction = navigation => {
  return navigation.replace('UserInfoScreen');
};

export const sendOTPAction = (payload) => {
  return {
    type: SEND_OTP,
    payload
  }
}