import {
  GET_ACTIVE_CERTIFICATES_SUCCESS,
  GET_ACTIVE_CERTIFICATES_FAILURE,
  SET_LOADER_CERTIFICATES_SCREEN,
  RESET_ERROR_CERTIFICATES,
  GET_EXPIRED_CERTIFICATES_FAILURE,
  GET_EXPIRED_CERTIFICATES_SUCCESS,
} from '../../commons/Constants';
const INITIAL_STATE = {
  loader: false,
  errMessage: undefined,
  activeCertificates: null,
  expiredCertificates: null,
};

export default function certificatesReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_ACTIVE_CERTIFICATES_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          activeCertificates: action.payload,
        };

      case GET_ACTIVE_CERTIFICATES_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          activeCertificates: null,
        };

      case GET_EXPIRED_CERTIFICATES_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          expiredCertificates: action.payload,
        };

      case GET_EXPIRED_CERTIFICATES_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          expiredCertificates: null,
        };

      case SET_LOADER_CERTIFICATES_SCREEN:
        return {
          ...state,
          loader: action.status,
        };

      case RESET_ERROR_CERTIFICATES:
        return {
          ...state,
          errMessage: undefined,
        };

      default:
        return state;
    }
  };
}
