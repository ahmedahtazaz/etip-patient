import {
  RESET_IS_FAMILY_UPGRADED,
  RESET_IS_PHONE_UPDATED,
  RESET_PHONE,
  SEND_OTP,
  UPDATE_PHONE,
  VERIFY_OTP,
  VERIFY_OTP_UPGRADE_FAMILY,
} from '../../commons/Constants';

export const moveToUserInfoScreenAction = (navigation, phone) => {
  return navigation.replace('UserInfoScreen', {phone});
};

export const sendOTPAction = payload => {

  return {
    type: SEND_OTP,
    payload,
  };
};

export const verifyOTPAction = payload => {
  return {
    type: VERIFY_OTP,
    payload,
  };
};

export const updatePhoneAction = payload => {
  return {
    type: UPDATE_PHONE,
    payload,
  };
};

export const resetIsPhoneUpdatedAction = () => {
  return {
    type: RESET_IS_PHONE_UPDATED,
  };
};

export const resetPhoneAction = () => {
  return {
    type: RESET_PHONE,
  };

};

export const upgradeFamilyAction=payload=>{
  return {
    type:VERIFY_OTP_UPGRADE_FAMILY,
    payload
  };
} 

export const resetFamilyUpgradedAction=()=>{
  return {
   type:RESET_IS_FAMILY_UPGRADED,
  };

}

