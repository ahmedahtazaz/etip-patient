import {
  ADD_FAMILY_MEMBER,
  ADD_FAMILY_MEMBER_FAILURE,
  ADD_FAMILY_MEMBER_SUCCES,
  EDIT_FAMILY_MEMBER,
  EDIT_FAMILY_MEMBER_FAILURE,
  EDIT_FAMILY_MEMBER_SUCCES,
  RESET_FAMILY_MEMBER_ADDED,
  RESET_USER_CREATED,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCES,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from '../../commons/Constants';

const INITIAL_STATE = {
  familyMembers: [],
  loader: false,
  errMessage: undefined,
  isUserCreated: false,
  isFamilyMemberAdded: false,
};

export default function userInfoReducer() {
  return function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          loader: true,
          errMessage: undefined,
        };

      case SIGNUP_SUCCES:
        return {
          ...state,
          loader: false,
          isUserCreated: true,
        };

      case RESET_USER_CREATED:
        return {
          ...state,
          isUserCreated: false,
        };

      case SIGNUP_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };

      case ADD_FAMILY_MEMBER:
        return {
          ...state,
          loader: true,
          errMessage: undefined,
        };

      case ADD_FAMILY_MEMBER_SUCCES:
        return {
          ...state,
          loader: false,
          familyMembers: [...state.familyMembers, ...action.payload],
          isFamilyMemberAdded: true,
        };

      case RESET_FAMILY_MEMBER_ADDED: {
        return {
          ...state,
          isFamilyMemberAdded: false,
        };
      }

      case ADD_FAMILY_MEMBER_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
        };

      case EDIT_FAMILY_MEMBER:
        return {
          ...state,
          loader: true,
        };

      case EDIT_FAMILY_MEMBER_SUCCES:
        return {
          ...state,
          loader: false,
          familyMembers: [...action.payload],
          isFamilyMemberAdded: true,
        };

      case EDIT_FAMILY_MEMBER_FAILURE:
        return {
          ...state,
          loader: false,
          errMessage: action.errMessage,
          isFamilyMemberAdded: false,
        };

      case UPDATE_USER:
        return {
          ...state,
          loader: true,
          errMessage: undefined,
        };

      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loader: false,
          errMessage: undefined,
          isUserCreated: true,
        };

      case UPDATE_USER_FAILURE:
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
