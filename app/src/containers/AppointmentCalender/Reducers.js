
import {
  GET_REGION,
  GET_REGION_FAILURE,
  GET_REGION_SUCCESS,
  GET_APPOINTMENT_SLOT,
  GET_APPOINTMENT_SLOT_SUCCESS,
  GET_APPOINTMENT_SLOT_FAILURE,
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE
} from '../../commons/Constants';

const INITIAL_STATE = {

  loader: false,
  errMessage: undefined,
  initPayLoad: undefined,
  regionData: undefined,
  appointmentSlotsData: null,

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


      case GET_APPOINTMENT_SLOT:
        return {
          ...state,
          loader: true,
        };

      case GET_APPOINTMENT_SLOT_SUCCESS:
        return {
          ...state,
          loader: false,
          appointmentSlotsData: action.payload,
        };

      case GET_APPOINTMENT_SLOT_FAILURE:
        return {
          ...state,
          loader: false,
        };


      case CREATE_APPOINTMENT:
        return {
          ...state,
          loader: true,
          errMessage: undefined
        }


      case CREATE_APPOINTMENT_SUCCESS:
        return {
          ...state,
          loader: false
        }

      case CREATE_APPOINTMENT_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage
        }




      default:
        return state;
    }
  };
}