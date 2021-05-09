import { RESET_IS_PHONE_UPDATED, SEND_OTP, UPDATE_PHONE, VERIFY_OTP } from "../../commons/Constants";

export const moveToUserInfoScreenAction = (navigation,phone) => {
  return navigation.replace('UserInfoScreen',{phone});
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


export const updatePhoneAction = (payload) => {
  return {
    type: UPDATE_PHONE,
    payload
  }
}

export const resetIsPhoneUpdatedAction = () =>{
  return {
    type: RESET_IS_PHONE_UPDATED
  }
}