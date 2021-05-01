import {
    SEND_OTP,
    SEND_OTP_FAILURE,
    SEND_OTP_SUCCESS
} from '../../commons/Constants';

const INITIAL_STATE = {
    initLoaded: false,
    loader: false,
    errMessage: undefined,
    initPayLoad: undefined,
    otpSend: false
};

export default function phoneReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case SEND_OTP_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    errMessage: undefined,
                    initPayLoad: action.payload,

                };

            case SEND_OTP_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage,
                    initPayLoad: undefined,
                };

            case SEND_OTP:
                return {
                    ...state,
                    loader: true,
                };

            default:
                return state;
        }
    };
}
