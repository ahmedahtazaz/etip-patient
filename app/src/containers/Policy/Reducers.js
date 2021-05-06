import {
  GET_POLICY,
  GET_POLICY_SUCCESS,
  GET_POLICY_FAILURE,
} from '../../commons/Constants';

const INITIAL_STATE = {
  textCode: 'en',
  initLoaded: false,
  loader: false,
  errMessage: undefined,
  policy: undefined,
  getLang: false,
};

export default function getPolicyReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_POLICY_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          policy: action.payload,
        };

      case GET_POLICY_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          policy: undefined,
        };

      case GET_POLICY:
        return {
          ...state,
          loader: true,
        };

      default:
        return state;
    }
  };
}
