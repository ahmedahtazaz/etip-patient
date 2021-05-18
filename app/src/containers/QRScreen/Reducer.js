import {
    GET_START_APPLICATION,
    GET_START_APPLICATION_FAILURE,
    GET_START_APPLICATION_SUCCESS,
    RESET_IS_APPLICATION_STARTED
} from '../../commons/Constants';

const INITIAL_STATE = {
    startApplicationPayload: null,
    isApplicationStarted: false,
    loader: false,
    errMessage: undefined
};

export default function qrScreenReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case GET_START_APPLICATION:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case GET_START_APPLICATION_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    isApplicationStarted: true,
                    startApplicationPayload: action.payload,
                    errMessage: undefined
                }

            case GET_START_APPLICATION_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }

            case RESET_IS_APPLICATION_STARTED:
                return {
                    ...state,
                    isApplicationStarted: false
                }



            default:
                return state;
        }
    };
}
