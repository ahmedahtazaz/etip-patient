import {
  LOAD_INIT_FAILURE,
  LOAD_INIT_SUCCESS,
  SHOW_INIT_LOADER,
  GET_DEFAULT_LANG,
  GET_DEFAULT_LANG_SUCCESS,
  GET_DEFAULT_LANG_FAILURE,
  GET_LANG_BY_SELECTED_KEY,
  GET_LANG_BY_SELECTED_KEY_SUCCESS,
  GET_LANG_BY_SELECTED_KEY_FAILURE
} from '../../commons/Constants';

const INITIAL_STATE = {
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  initPayLoad: undefined,
  defaultLangData:'',
  languageBySelectedKey:'',
};

export default function welcomeReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    // console.log('reducer==============RRRRRRRRRR==============');
    // console.log(action.type);
    // console.log(action);
    // console.log('action.payLoad');
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
        case GET_DEFAULT_LANG_SUCCESS:
          return {
              ...state,
              loader: false,
              errMessage: undefined,
              defaultLangData: action.defaultLangData,

          };

      case GET_DEFAULT_LANG_FAILURE:
          return {
              ...state,
              loader: false,
              errMessage: action.errMessage,
              defaultLangData: 'error',
          };

      case GET_DEFAULT_LANG:
          return {
              ...state,
              loader: true,
          };


          case GET_LANG_BY_SELECTED_KEY_SUCCESS:
            return {
                ...state,
                loader: false,
                errMessage: undefined,
                languageBySelectedKey: action.languageBySelectedKey,
  
            };
  
        case GET_LANG_BY_SELECTED_KEY_FAILURE:
            return {
                ...state,
                loader: false,
                errMessage: action.errMessage,
                languageBySelectedKey: 'error',
            };
  
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
