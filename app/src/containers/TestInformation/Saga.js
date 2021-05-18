import { put, takeLatest, call } from 'redux-saga/effects';
import {
    ISSUE_CERTIFICATE,
    ISSUE_CERTIFICATE_FAILURE,
    ISSUE_CERTIFICATE_SUCCESS,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* issueCertificate(action) {
    let userid = action.payload.userId;
    delete action.payload.userId;
    try {
        const config = {
            headers: {
                userid,
            },
        };
        const res = yield call(
            AxiosInstance.post,
            action.payload.url,
            action.payload.body,
            config,
        );
        if (res.error) {
            yield put({
                type: ISSUE_CERTIFICATE_FAILURE,
                errMessage: res.error.message,
            });
        } else {
            yield put({
                type: ISSUE_CERTIFICATE_SUCCESS,
                payload: res?.success?.data?.data,
            });
        }
    } catch (error) {
        yield put({ type: ISSUE_CERTIFICATE_FAILURE, errMessage: error });
    }
}

export function* issueCertificateActionWatcher() {
    yield takeLatest(ISSUE_CERTIFICATE, issueCertificate);
}
