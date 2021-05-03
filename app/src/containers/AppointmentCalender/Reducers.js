
import { GET_REGION, GET_REGION_FAILURE, GET_REGION_SUCCESS } from '../../commons/Constants';
  
const INITIAL_STATE = {
 
    loader: false,
    errMessage: undefined,
    initPayLoad: undefined,
    regionData:undefined,
 
  
  };
  
export default function RegionReducer() {
    return function reducer(state = INITIAL_STATE, action) {
      switch (action.type) {
        case 'LANGUAGE_CHANGE':
          return {
            ...state,
            textCode: action.payLoad,
            
          };
          case GET_REGION_SUCCESS:
            return {
                ...state,
                loader: false,
                errMessage: undefined,
                regionData: action.regionData,

            };

        case GET_REGION_FAILURE:
            return {
                ...state,
                loader: false,
                errMessage: action.errMessage,
                regionData: undefined,
            };

        case GET_REGION:
            return {
                ...state,
                loader: true,
            };


  
        default:
          return state;
      }
    };
  }
  