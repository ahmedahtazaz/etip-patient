import {
    ADD_FAMILY_MEMBER,
    ADD_USER_INFO
} from '../../commons/Constants';

const INITIAL_STATE = {
    userInfo: {}
};

export default function userInfoReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case ADD_USER_INFO:
                return {
                    ...state,
                    userInfo: action.payload
                };

            case ADD_FAMILY_MEMBER:
                let userInfo = state.userInfo;
                userInfo.familyMembers.push(action.payload);
                return {
                    ...state,
                    userInfo: {...userInfo}
                }

            default:
                return state;
        }
    };
}
