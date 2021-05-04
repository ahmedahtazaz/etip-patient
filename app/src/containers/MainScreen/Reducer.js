import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_LOADER_MAIN_SCREEN,
} from '../../commons/Constants';
const INITIAL_STATE = {
  loader: false,
  errMessage: undefined,
  userInfo: null,
};

export default function mainScreenReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          userInfo: action.payload,
        };

      case GET_PROFILE_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          userInfo: null,
        };

      case SET_LOADER_MAIN_SCREEN:
        return {
          ...state,
          loader: action.status,
        };

      default:
        return state;
    }
  };
}
