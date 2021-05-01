import {
    SEND_OTP,
    SEND_OTP_FAILURE,
    SEND_OTP_SUCCESS,
    VERIFY_OTP,
    VERIFY_OTP_FAILURE,
    VERIFY_OTP_SUCCESS
} from '../../commons/Constants';

const INITIAL_STATE = {
    initLoaded: false,
    loader: false,
    errMessage: undefined,
    initPayLoad: undefined,
    otpSend: false,
    otpVerified: false
};

export default function phoneReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case SEND_OTP_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    errMessage: undefined,
                    otpSend: true
                };

            case SEND_OTP_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage,
                    otpSend: false
                };

            case SEND_OTP:
            case VERIFY_OTP:
                return {
                    ...state,
                    loader: true,
                };


            case VERIFY_OTP_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    errMessage: undefined,
                    otpVerified: true
                };

            case VERIFY_OTP_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage,
                    otpVerified: false
                };


            default:
                return state;
        }
    };
}
