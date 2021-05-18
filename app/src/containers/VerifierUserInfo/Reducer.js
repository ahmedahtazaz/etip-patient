import {
    CREATE_USRE,
    CREATE_USRE_SUCCESS,
    CREATE_USRE_FAILURE,
    RESET_IS_USER_CREATED
} from '../../commons/Constants';

const INITIAL_STATE = {
    userData: null,
    loader: false,
    errMessage: undefined,
    isUserCreated: false,

};

export default function verifierUserInfoReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {

            case CREATE_USRE:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case CREATE_USRE_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    isUserCreated: true,
                    userData: action.payload
                }

            case CREATE_USRE_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }

            case RESET_IS_USER_CREATED:
                return {
                    ...state,
                    isUserCreated: false
                }


            default:
                return state;
        }
    };
}
