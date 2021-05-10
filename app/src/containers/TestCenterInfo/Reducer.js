import { GET_PENDING_APPLICATIONS, GET_PENDING_APPLICATIONS_FAILURE, GET_PENDING_APPLICATIONS_SUCCESS } from '../../commons/Constants';

const INITIAL_STATE = {
    pendingApplications: [],
    loader: false,
    errMessage: undefined,

};

export default function testCenterInfoReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case GET_PENDING_APPLICATIONS:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case GET_PENDING_APPLICATIONS_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    pendingApplications: action.payload,
                    errMessage: undefined
                }

            case GET_PENDING_APPLICATIONS_FAILURE:
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
