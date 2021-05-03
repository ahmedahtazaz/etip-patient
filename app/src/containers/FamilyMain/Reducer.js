import {
    GET_FAMILY_MEMBER_FAILURE,
    GET_FAMILY_MEMBER_SUCCESS,
    GET_FAMILY_MEMBER
} from '../../commons/Constants';

const INITIAL_STATE = {
    familyMembers: [],
    loader: false,
    errMessage: undefined
};

export default function familyReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case GET_FAMILY_MEMBER:
                return {
                    ...state,
                    loader: true
                }

            case GET_FAMILY_MEMBER_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    familyMembers: action.payload
                }

            case GET_FAMILY_MEMBER_FAILURE:
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
