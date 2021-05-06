


import {
  GET_TERMS,
  GET_TERMS_FAILURE,
  GET_TERMS_SUCCESS
  } from '../../commons/Constants';
  
  const INITIAL_STATE = {
      textCode: 'en',
      initLoaded: false,
      loader: false,
      errMessage: undefined,
      initPayLoad: undefined,
      getLang: false
    
    };
    
  export default function getTermsReducer() {
    
      return function reducer(state = INITIAL_STATE, action) {

        switch (action.type) {
        
            case GET_TERMS_SUCCESS:
            
              return {
                  ...state,
                  loader: false,
                  errMessage: undefined,
                  initPayLoad: action.payload,
  
              };
  
          case GET_TERMS_FAILURE:
              return {
                  ...state,
                  loader: false,
                  errMessage: action.errMessage,
                  initPayLoad: undefined,
              };
  
          case GET_TERMS:

              return {
                  ...state,
                  loader: true,
              };
  
    
          default:
            return state;
        }
      };
    }
    