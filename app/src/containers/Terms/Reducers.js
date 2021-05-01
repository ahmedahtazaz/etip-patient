


import {
    GET_TERM_APP,
    GET_TERM_APP_FAILURE,
    GET_TERM_APP_SUCCESS
  } from '../../commons/Constants';
  
  const INITIAL_STATE = {
      textCode: 'en',
      initLoaded: false,
      loader: false,
      errMessage: undefined,
      initPayLoad: undefined,
      getLang: false
    
    };
    
  export default function getAboutApp() {
      return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
        
            case GET_TERM_APP_SUCCESS:
              return {
                  ...state,
                  loader: false,
                  errMessage: undefined,
                  initPayLoad: action.payload,
  
              };
  
          case GET_TERM_APP_FAILURE:
              return {
                  ...state,
                  loader: false,
                  errMessage: action.errMessage,
                  initPayLoad: undefined,
              };
  
          case GET_TERM_APP:
              return {
                  ...state,
                  loader: true,
              };
  
    
          default:
            return state;
        }
      };
    }
    