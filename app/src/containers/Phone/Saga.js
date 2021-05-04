import { put, takeLatest, call } from 'redux-saga/effects';
import {
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILURE,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    VERIFY_OTP,
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';


function* sendOTP(action) {
    console.log('action: ', action)
    try {
        const res = yield call(AxiosInstance.post, action.payload.url, action.payload.body);
        console.log('res: ', res);
        if (res.error) {
            yield put({ type: SEND_OTP_FAILURE, errMessage: res.error.message });
        } else {
            console.log('sendOTP res: ', res.success);
            yield put({ type: SEND_OTP_SUCCESS, payload: res.success });
        }
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: SEND_OTP_FAILURE, errMessage: error });
    }
}


function* verifyOTP(action) {
    console.log('action: ', action)
    try {
        const res = yield call(AxiosInstance.post, action.payload.url, action.payload.body);
        console.log('res: ', res);
        if (res.error) {
            yield put({ type: VERIFY_OTP_FAILURE, errMessage: res.error.message });
        } else {
            console.log('verify OTP res: ', res.success);
            yield put({ type: VERIFY_OTP_SUCCESS, payload: res.success });
        }
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: VERIFY_OTP_FAILURE, errMessage: error });
    }
}

export function* sendOTPActionWatcher() {
    yield takeLatest(`${SEND_OTP}`, sendOTP);
}


export function* verifyOTPActionWatcher() {
    yield takeLatest(`${VERIFY_OTP}`, verifyOTP);
}
