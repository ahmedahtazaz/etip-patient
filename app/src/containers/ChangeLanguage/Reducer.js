


import {
  GET_LANG,
  GET_LANG_FAILURE,
  GET_LANG_SUCCESS
} from '../../commons/Constants';

const INITIAL_STATE = {
    textCode: 'en',
    initLoaded: false,
    loader: false,
    errMessage: undefined,
    initPayLoad: undefined,
    getLang: false
  
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

  
        default:
          return state;
      }
    };
  }
  