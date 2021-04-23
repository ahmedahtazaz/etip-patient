import {
  LOAD_INIT_FAILURE,
  LOAD_INIT_SUCCESS,
  SHOW_INIT_LOADER,
} from '../../commons/Constants';

const INITIAL_STATE = {
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  initPayLoad: undefined,
};

export default function welcomeReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case LOAD_INIT_SUCCESS:
        return {
          ...state,
          initLoaded: true,
          loader: false,
          errMessage: undefined,
          initPayLoad: action.payLoad,
        };

      case LOAD_INIT_FAILURE:
        return {
          ...state,
          initLoaded: false,
          loader: false,
          errMessage: action.errMessage,
          initPayLoad: undefined,
        };

      case SHOW_INIT_LOADER:
        return {
          ...state,
          loader: action.status,
        };

      default:
        return state;
    }
  };
}
