import {
  UPDATE_EMAIL,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
  RESET_EMAIL_UPDATED,
} from '../../commons/Constants';

const INITIAL_STATE = {
  loader: false,
  errMessage: undefined,
  emailUpdated: false,
};

export default function updateEmailReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case UPDATE_EMAIL:
        return {
          ...state,
          loader: true,
          errMessage: undefined,
        };

      case UPDATE_EMAIL_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          emailUpdated: true,
        };

      case UPDATE_EMAIL_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };

      case RESET_EMAIL_UPDATED:
        return {
          ...state,
          emailUpdated: false,
        };

      default:
        return state;
    }
  };
}
