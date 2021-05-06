import {Alert, Platform, ToastAndroid} from 'react-native';

export const LOAD_INIT = 'LOAD_INIT';
export const LOAD_INIT_SUCCESS = 'LOAD_INIT_SUCCESS';
export const LOAD_INIT_FAILURE = 'LOAD_INIT_FAILURE';
export const SHOW_INIT_LOADER = 'SHOW_INIT_LOADER';

export const SEND_OTP = 'SEND_OTP';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_OTP_FAILURE';

export const VERIFY_OTP = 'VERIFY_OTP';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCES = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const RESET_USER_CREATED = 'RESET_USER_CREATED';

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const ADD_FAMILY_MEMBER = 'ADD_FAMILY_MEMBER';
export const ADD_FAMILY_MEMBER_SUCCES = 'ADD_FAMILY_MEMBER_SUCCES';
export const ADD_FAMILY_MEMBER_FAILURE = 'ADD_FAMILY_MEMBER_FAILURE';
export const RESET_FAMILY_MEMBER_ADDED = 'RESET_FAMILY_MEMBER_ADDED';

export const GET_FAMILY_MEMBER = 'GET_FAMILY_MEMBER';
export const GET_FAMILY_MEMBER_SUCCESS = 'GET_FAMILY_MEMBER_SUCCESS';
export const GET_FAMILY_MEMBER_FAILURE = 'GET_FAMILY_MEMBER_FAILURE';

export const REMOVE_FAMILY_MEMBER = 'REMOVE_FAMILY_MEMBER';
export const REMOVE_FAMILY_MEMBER_SUCCESS = 'REMOVE_FAMILY_MEMBER_SUCCESS';
export const REMOVE_FAMILY_MEMBER_FAILURE = 'REMOVE_FAMILY_MEMBER_FAILURE';

export const EDIT_FAMILY_MEMBER = 'EDIT_FAMILY_MEMBER';
export const EDIT_FAMILY_MEMBER_SUCCES = 'EDIT_FAMILY_MEMBER_SUCCES';
export const EDIT_FAMILY_MEMBER_FAILURE = 'EDIT_FAMILY_MEMBER_FAILURE';

export const GET_LANG = 'GET_LANG';
export const GET_LANG_SUCCESS = 'GET_LANG_SUCCESS';
export const GET_LANG_FAILURE = 'GET_LANG_FAILURE';

export const GET_DEFAULT_LANG = 'GET_DEFAULT_LANG';
export const GET_DEFAULT_LANG_SUCCESS = 'GET_DEFAULT_LANG_SUCCESS';
export const GET_DEFAULT_LANG_FAILURE = 'GET_DEFAULT_LANG_FAILURE';

export const GET_LANG_BY_LANG = 'GET_LANG_BY_LANG';
export const GET_LANG_BY_LANG_SUCCESS = 'GET_LANG_BY_LANG_SUCCESS';
export const GET_LANG_BY_LANG_FAILURE = 'GET_LANG_BY_LANG_FAILURE';

export const GET_ABOUT_APP = 'ABOUT_APP ';
export const GET_ABOUT_APP_SUCCESS = 'GET_ABOUT_APP_SUCCESS';
export const GET_ABOUT_APP_FAILURE = 'GET_ABOUT_APP_FAILURE';

export const GET_TERMS = 'GET_TERMS';
export const GET_TERMS_SUCCESS = 'GET_TERMS_SUCCESS';
export const GET_TERMS_FAILURE = 'GET_TERMS_FAILURE ';

export const GET_TEST_CENTERS = 'GET_TEST_CENTERS';
export const GET_TEST_CENTERS_SUCCESS = 'GET_TEST_CENTERS_SUCCESS';
export const GET_TEST_CENTERS_FAILURE = 'GET_TEST_CENTERS_FAILURE ';

export const GET_APPOINTMENT_SLOT = 'GET_APPOINTMENT_SLOT';
export const GET_APPOINTMENT_SLOT_SUCCESS = 'GET_APPOINTMENT_SLOT_SUCCESS';
export const GET_APPOINTMENT_SLOT_FAILURE = 'GET_APPOINTMENT_SLOT_FAILURE';

export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const CREATE_APPOINTMENT_FAILURE = 'CREATE_APPOINTMENT_FAILURE';

export const GET_REGION = 'GET_REGION';
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_REGION_FAILURE = 'GET_REGION_FAILURE ';

export const GET_POLICY = 'GET_POLICY';
export const GET_POLICY_SUCCESS = 'GET_POLICY_SUCCESS';
export const GET_POLICY_FAILURE = 'GET_POLICY_FAILURE ';

export const GET_ACTIVE_APPOINTMENTS = 'GET_ACTIVE_APPOINTMENTS';
export const GET_ACTIVE_APPOINTMENTS_SUCCESS =
  'GET_ACTIVE_APPOINTMENTS_SUCCESS';
export const GET_ACTIVE_APPOINTMENTS_FAILURE =
  'GET_ACTIVE_APPOINTMENTS_FAILURE ';

export const GET_ACTIVE_CERTIFICATES = 'GET_ACTIVE_CERTIFICATES';
export const GET_ACTIVE_CERTIFICATES_SUCCESS =
  'GET_ACTIVE_CERTIFICATES_SUCCESS';
export const GET_ACTIVE_CERTIFICATES_FAILURE =
  'GET_ACTIVE_CERTIFICATES_FAILURE ';

export const GET_EXPIRED_CERTIFICATES = 'GET_EXPIRED_CERTIFICATES';
export const GET_EXPIRED_CERTIFICATES_SUCCESS =
  'GET_EXPIRED_CERTIFICATES_SUCCESS';
export const GET_EXPIRED_CERTIFICATES_FAILURE =
  'GET_EXPIRED_CERTIFICATES_FAILURE ';

export const APP_INIT_LINK = '';

export const SET_LOADER_MAIN_SCREEN = 'SET_LOADER_MAIN_SCREEN';

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const IS_VERIFIER_APP = false;
export const STORAGE_KEY = 'default_lang';

export const GET_LANG_BY_SELECTED_KEY = 'GET_LANG_BY_SELECTED_KEY';
export const GET_LANG_BY_SELECTED_KEY_SUCCESS =
  'GET_LANG_BY_SELECTED_KEY_SUCCESS';
export const GET_LANG_BY_SELECTED_KEY_FAILURE =
  'GET_LANG_BY_SELECTED_KEY_FAILURE';

export const SET_TEST_CENTER = 'SET_TEST_CENTER';

export const SET_LOADER_CERTIFICATES_SCREEN = 'SET_LOADER_CERTIFICATES_SCREEN';

export const RESET_ERROR_MAIN = 'RESET_ERROR_MAIN';
export const RESET_ERROR_CERTIFICATES = 'RESET_ERROR_CERTIFICATES';

export const RESET_MAKE_APPOINTMENT = 'RESET_MAKE_APPOINTMENT';

export const postCall = ({url, body: data}) => {
  return axios({url, method: 'post', data})
    .then(data => ({data}))
    .catch(ex => {
      return ex;
    });
};

export const showToast = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};
