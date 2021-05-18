import {
    ISSUE_CERTIFICATE,
    ISSUE_CERTIFICATE_FAILURE,
    ISSUE_CERTIFICATE_SUCCESS,
    RESET_CERTIFICATE_ISSUED
} from '../../commons/Constants';

const INITIAL_STATE = {
    issueCertificatePayload: null,
    loader: false,
    errMessage: undefined,
    isCertificateIssued: false
};

export default function issueCertificateReducer() {
    return function reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
            case ISSUE_CERTIFICATE:
                return {
                    ...state,
                    loader: true,
                    errMessage: undefined
                }

            case ISSUE_CERTIFICATE_SUCCESS:
                return {
                    ...state,
                    loader: false,
                    isCertificateIssued: true,
                    issueCertificatePayload: action.payload,
                    errMessage: undefined
                }

            case ISSUE_CERTIFICATE_FAILURE:
                return {
                    ...state,
                    loader: false,
                    errMessage: action.errMessage
                }

            case RESET_CERTIFICATE_ISSUED:
                return {
                    ...state,
                    isCertificateIssued: false
                }

            default:
                return state;
        }
    };
}
