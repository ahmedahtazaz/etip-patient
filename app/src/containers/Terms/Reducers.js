


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
        console.log(action.payload);

        switch (action.type) {
        
            case GET_TERMS_SUCCESS:
              console.log('initPayLoad');

              console.log(action);
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
            console.log('initPayLoad only');

              return {
                  ...state,
                  loader: true,
              };
  
    
          default:
            return state;
        }
      };
    }
    