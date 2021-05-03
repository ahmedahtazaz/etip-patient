
import {
  GET_LANG,
  GET_LANG_FAILURE,
  GET_LANG_SUCCESS,

  GET_LANG_BY_LANG,GET_LANG_BY_LANG_SUCCESS,GET_LANG_BY_LANG_FAILURE
} from '../../commons/Constants';

const INITIAL_STATE = {
    textCode: 'en',
    initLoaded: false,
    loader: false,
    errMessage: undefined,
    initPayLoad: undefined,
    getLang: false,
    langData:undefined,
    langCode:'',
  
  };
  
export default function LanguageReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {
        case 'LANGUAGE_CHANGE':
          return {
            ...state,
            textCode: action.payLoad,
            
          };
          case GET_LANG_SUCCESS:
            return {
                ...state,
                loader: false,
                errMessage: undefined,
                initPayLoad: action.payload,

            };

        case GET_LANG_FAILURE:
            return {
                ...state,
                loader: false,
                errMessage: action.errMessage,
                initPayLoad: undefined,
            };

        case GET_LANG:
            return {
                ...state,
                loader: true,
            };


            case GET_LANG_BY_LANG_SUCCESS:
              return {
                  ...state,
                  loader: false,
                  errMessage: undefined,
                  langData: action.langData,
                  langCode:action.langData.lang
  
              };
  
          case GET_LANG_BY_LANG_FAILURE:
              return {
                  ...state,
                  loader: false,
                  errMessage: action.errMessage,
                  langData: 'error',
                  langCode:'error'
              };
  
          case GET_LANG_BY_LANG:
              return {
                  ...state,
                  loader: true,
              };
  
        default:
          return state;
      }
    };
  }
  