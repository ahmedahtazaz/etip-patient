import {
  GET_ABOUT_APP,
  GET_ABOUT_APP_FAILURE,
  GET_ABOUT_APP_SUCCESS,
} from '../../commons/Constants';

const INITIAL_STATE = {
  textCode: 'en',
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  about: undefined,
  getLang: false,
};

export default function getAboutApp() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_ABOUT_APP_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          about: action.payload,
        };

      case GET_ABOUT_APP_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          about: undefined,
        };

      case GET_ABOUT_APP:
        return {
          ...state,
          loader: true,
        };

      default:
        return state;
    }
  };
}
