


import {
  GET_ABOUT_APP,
  GET_ABOUT_APP_SUCCESS,
  GET_ABOUT_APP_FAILURE
} from '../../commons/Constants';


const INITIAL_STATE = {
    textCode: 'en',
    initLoaded: false,
    loader: false,
    errMessage: undefined,
    initPayLoad: undefined,
    getLang: false
  
  };
  
export default function getPolicyReducer() {
  
    return function reducer(state = INITIAL_STATE, action) {
      console.log(action.payload);

      switch (action.type) {
      
          case GET_ABOUT_APP_SUCCESS:
            console.log('initPayLoad');

            console.log(action);
            return {
                ...state,
                loader: false,
                errMessage: undefined,
                initPayLoad: action.payload,

            };

        case GET_ABOUT_APP_FAILURE:
            return {
                ...state,
                loader: false,
                errMessage: action.errMessage,
                initPayLoad: undefined,
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
  