
import { GET_TEST_CENTERS, GET_TEST_CENTERS_FAILURE, GET_TEST_CENTERS_SUCCESS } from '../../commons/Constants';
  
  const INITIAL_STATE = {
   
      loader: false,
      errMessage: undefined,
      initPayLoad: undefined,
      testCenterData:undefined,
   
    
    };
    
  export default function TestCenterReducer() {
      return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
          case 'LANGUAGE_CHANGE':
            return {
              ...state,
              textCode: action.payLoad,
              
            };
            case GET_TEST_CENTERS_SUCCESS:
              return {
                  ...state,
                  loader: false,
                  errMessage: undefined,
                  testCenterData: action.testCenterData,
  
              };
  
          case GET_TEST_CENTERS_FAILURE:
              return {
                  ...state,
                  loader: false,
                  errMessage: action.errMessage,
                  testCenterData: undefined,
              };
  
          case GET_TEST_CENTERS:
              return {
                  ...state,
                  loader: true,
              };
  
  
    
          default:
            return state;
        }
      };
    }
    