import {LOAD_INIT, SHOW_INIT_LOADER} from '../../commons/Constants';

export const initialiseAppAction = url => {
  return {
    type: `${LOAD_INIT}`,
    url,
  };
};

export const showLoaderAction = status => {
  return {
    type: `${SHOW_INIT_LOADER}`,
    status,
  };
};

export const moveToSignInAction = navigation => {
  return navigation.replace('SignIn');
};

export const moveToMainScreenAction = navigation => {
  return navigation.replace('MainScreen');
};

export const moveToPhoneScreenAction = navigation => {
  return navigation.replace('PhoneScreen');
};
