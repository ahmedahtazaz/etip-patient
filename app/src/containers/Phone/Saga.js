import { put, takeLatest } from 'redux-saga/effects';
import {
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILURE,
} from '../../commons/Constants';


function* sendOTP( action ) {
    let error = undefined;
    let res = undefined;

    yield fetch(action.payload.url, {
        method: 'POST',
        body: action.payload.body,
    })
        .then(response => {
            res = response;
        })
        .catch(err => {
            error = err;
        });

    if (res) {
        res = yield res.json();
    }

    if (res) yield put({ type: SEND_OTP_SUCCESS, payload: res });
    else yield put({ type: SEND_OTP_FAILURE, errMessage: error });
}

export default function* sendOTPActionWatcher() {
    yield takeLatest(`${SEND_OTP}`, sendOTP);
}
