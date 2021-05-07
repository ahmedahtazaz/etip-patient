import {
  GET_LANG_BY_SELECTED_KEY,
  GET_LANG_BY_SELECTED_KEY_SUCCESS,
  GET_LANG_BY_SELECTED_KEY_FAILURE,
} from '../../commons/Constants';

const INITIAL_STATE = {
  loader: false,
  errMessage: undefined,
};

export default function LanguageReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_LANG_BY_SELECTED_KEY:
        return {
          ...state,
          loader: true,
          errMessage: undefined,
        };

      case GET_LANG_BY_SELECTED_KEY_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
        };

      case GET_LANG_BY_SELECTED_KEY_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };

      default:
        return state;
    }
  };
}
