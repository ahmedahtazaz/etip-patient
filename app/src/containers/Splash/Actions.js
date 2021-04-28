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

export const moveToWelcomeScreenAction = navigation => {
  return navigation.replace('WelcomeScreen');
};

export const moveToPincodeScreenAction = navigation => {
  return navigation.replace('PincodeScreen');
};
