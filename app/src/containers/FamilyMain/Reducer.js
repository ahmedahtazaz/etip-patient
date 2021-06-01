import {
  GET_FAMILY_MEMBER_FAILURE,
  GET_FAMILY_MEMBER_SUCCESS,
  GET_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER,
  REMOVE_FAMILY_MEMBER_SUCCESS,
  REMOVE_FAMILY_MEMBER_FAILURE,
  LOGOUT_SUCCESS
} from '../../commons/Constants';

const INITIAL_STATE = {
  familyMembers: [],
  loader: false,
  errMessage: undefined,
};

export default function familyReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_FAMILY_MEMBER:
        return {
          ...state,
          loader: true,
        };

      case GET_FAMILY_MEMBER_SUCCESS:
        return {
          ...state,
          loader: false,
          familyMembers: action.payload,
          errMessage: undefined,
        };

      case GET_FAMILY_MEMBER_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          familyMembers: [],
        };

      case REMOVE_FAMILY_MEMBER:
        return {
          ...state,
          loader: true,
          errMessage: undefined,
        };

      case REMOVE_FAMILY_MEMBER_SUCCESS:
        let familyMembers = state.familyMembers;
        familyMembers = familyMembers.filter(
          member => member._id !== action.payload.id,
        );
        return {
          ...state,
          loader: false,
          familyMembers,
        };

      case REMOVE_FAMILY_MEMBER_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };
        case LOGOUT_SUCCESS:
          return{
            ...state,
            familyMembers: [],
            loader: false,
            errMessage: undefined,
          }
      default:
        return state;
    }
  };
}
