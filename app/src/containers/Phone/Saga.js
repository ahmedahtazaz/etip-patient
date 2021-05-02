import { put, takeLatest, call } from 'redux-saga/effects';
import {
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILURE,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    VERIFY_OTP,
    postCall
} from '../../commons/Constants';
import axios from 'axios';

import AxiosInstance from '../../commons/AxiosInstance';

function* sendOTP(action) {
    try {
        const { data: res } = yield call(AxiosInstance.post, action.payload.url, action.payload.body);
        if (res.message === "OTP sent to phone number")
            yield put({ type: SEND_OTP_SUCCESS, payload: res })
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: SEND_OTP_FAILURE, errMessage: error });
    }
}


function* verifyOTP(action) {
    try {
        const { data: res } = yield call(AxiosInstance.post, action.payload.url, action.payload.body);
        yield put({ type: VERIFY_OTP_SUCCESS, payload: res });
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
