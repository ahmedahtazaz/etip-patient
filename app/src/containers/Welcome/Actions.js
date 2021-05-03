import {LOAD_INIT, SHOW_INIT_LOADER,GET_DEFAULT_LANG,GET_LANG_BY_SELECTED_KEY} from '../../commons/Constants';

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



export const GetDefaultLanguage = (payload) => {
  return {
    type: GET_DEFAULT_LANG,
    payload
  };
};




export const GetLanguageKeysByKey = (payload) => {
  return {
    type: GET_LANG_BY_SELECTED_KEY,
    payload
  };
};