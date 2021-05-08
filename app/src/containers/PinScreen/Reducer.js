import { VERIFY_PIN, VERIFY_PIN_FAILURE, VERIFY_PIN_SUCCESS } from '../../commons/Constants';

const INITIAL_STATE = {
    verifyPinPayload: null,
    loader: false,
    errMessage: undefined,
    isPinVerified: false
};

export default function pinScreenReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case VERIFY_PIN:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case VERIFY_PIN_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    isPinVerified: true,
                    verifyPinPayload: action.payload,
                    errMessage: undefined
                }

            case VERIFY_PIN_FAILURE:
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
