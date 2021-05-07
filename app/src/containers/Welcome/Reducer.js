import {
  LOAD_INIT_FAILURE,
  LOAD_INIT_SUCCESS,
  SHOW_INIT_LOADER,
  GET_DEFAULT_LANG,
  GET_DEFAULT_LANG_SUCCESS,
  GET_DEFAULT_LANG_FAILURE,
  GET_LANG_BY_SELECTED_KEY,
  GET_LANG_BY_SELECTED_KEY_SUCCESS,
  GET_LANG_BY_SELECTED_KEY_FAILURE,
  GET_LANG_KEYS,
  GET_LANG_KEYS_SUCCESS,
  GET_LANG_KEYS_FAILURE,
} from '../../commons/Constants';

const INITIAL_STATE = {
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  initPayLoad: undefined,
  defaultLangData: null,
  languageKeys: [],
  languageBySelectedKey: '',
  selectedLanguage: ""
};

export default function welcomeReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case LOAD_INIT_SUCCESS:
        return {
          ...state,
          initLoaded: true,
          loader: false,
          errMessage: undefined,
          initPayLoad: action.payLoad,
        };

      case LOAD_INIT_FAILURE:
        return {
          ...state,
          initLoaded: false,
          loader: false,
          errMessage: action.errMessage,
          initPayLoad: undefined,
        };

      case SHOW_INIT_LOADER:
        return {
          ...state,
          loader: action.status,
        };

      case GET_DEFAULT_LANG:
      case GET_LANG_BY_SELECTED_KEY:
        return {
          ...state,
          loader: true,
          errMessage: undefined
        }

      case GET_DEFAULT_LANG_SUCCESS:
      case GET_LANG_BY_SELECTED_KEY_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          defaultLangData: action.payload,
        };

      case GET_DEFAULT_LANG_FAILURE:
      case GET_LANG_BY_SELECTED_KEY_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage
        };

      case GET_LANG_KEYS:
        return {
          ...state,
          loader: true
        }

      case GET_LANG_KEYS_SUCCESS:
        return {
          ...state,
          loader: false,
          languageKeys: action.payload,
          errMessage: undefined
        }

      case GET_LANG_KEYS_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          languageKeys: []
        }


      case GET_LANG_BY_SELECTED_KEY:
        return {
          ...state,
          loader: true,
        };

      default:
        return state;
    }
  };
}
