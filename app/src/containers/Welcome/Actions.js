import {
  LOAD_INIT,
  SHOW_INIT_LOADER,
  GET_DEFAULT_LANG,
  GET_LANG_BY_SELECTED_KEY,
  GET_LANG_KEYS,
  LANGUAGE_UPDATED,
} from '../../commons/Constants';

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

export const moveToUserInfoScreenAction = navigation => {
  return navigation.replace('UserInfoScreen');
};

export const moveToPPScreenAction = navigation => {
  return navigation.navigate('policy');
};

export const moveToTTScreenAction = navigation => {
  return navigation.navigate('terms');
};

export const getDefaultLanguageAction = payload => {
  return {
    type: GET_DEFAULT_LANG,
    payload,
  };
};

export const getLanguageByKeyAction = payload => {
  return {
    type: GET_LANG_BY_SELECTED_KEY,
    payload,
  };
};

export const getLanguagesKeysAction = payload => {
  return {
    type: GET_LANG_KEYS,
    payload,
  };
};

export const setLanguageUpdatedAction = status => {
  return {
    type: LANGUAGE_UPDATED,
    status,
  };
};
