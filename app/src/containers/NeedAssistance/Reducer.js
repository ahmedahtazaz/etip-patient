import {
    GET_NEED_ASSISTANCE,
    GET_NEED_ASSISTANCE_FAILURE,
    GET_NEED_ASSISTANCE_SUCCESS,
} from '../../commons/Constants';

const INITIAL_STATE = {
    loader: false,
    errMessage: undefined,
    needAssistancePayload: null
};

export default function getNeedAssistanceReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case GET_NEED_ASSISTANCE:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                };

            case GET_NEED_ASSISTANCE_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    needAssistancePayload: action.payload
                }

            case GET_NEED_ASSISTANCE_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                };

            default:
                return state;
        }
    };
}
