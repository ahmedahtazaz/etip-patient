import {
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_IS_RESET,
    RESET_ERROR_MESSAGE
   
  } from '../../commons/Constants';
  
  const INITIAL_STATE = {
    logoutData: null,
    errMessage: undefined,
    isLogout:false
  };
  
  export default function logoutReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {
        case LOGOUT:
          return {
            ...state,
          };
  
        case LOGOUT_SUCCESS:
          return {
            ...state,
            logoutData: action.payload,
            errMessage: undefined,
            isLogout:true

          };
  
        case LOGOUT_FAILURE:
          return {
            ...state,
            errMessage: action.errMessage,
            logoutData: null,
            isLogout:false

          };

          case LOGOUT_IS_RESET:
              return {
                logoutData: null,
                errMessage: undefined,
                isLogout:false
              }
          
          case RESET_ERROR_MESSAGE:
            return {
              ...state,
              errMessage:undefined
            }
          
        default:
          return state;
      }
    };
  }
  