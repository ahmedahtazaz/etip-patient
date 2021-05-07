import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP,
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_FAILURE,
  UPDATE_PHONE,
  UPDATE_USER_SUCCESS,
  UPDATE_PHONE_SEND_OTP_SUCCESS
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* sendOTP(action) {
  try {
    const res = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
    );
    if (res.error) {
      yield put({ type: SEND_OTP_FAILURE, errMessage: res.error.message });
    } else {
      if (action.payload.editMode) {
        yield put({ type: UPDATE_PHONE_SEND_OTP_SUCCESS, payload: res.success });
      } else {
        yield put({ type: SEND_OTP_SUCCESS, payload: res.success });
      }
    }
  } catch (error) {
    yield put({ type: SEND_OTP_FAILURE, errMessage: error });
  }
}

function* verifyOTP(action) {
  try {
    const res = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
    );

    if (res.error) {
      yield put({ type: VERIFY_OTP_FAILURE, errMessage: res.error.message });
    } else {
      yield put({ type: VERIFY_OTP_SUCCESS, payload: res.success });
    }
  } catch (error) {
    yield put({ type: VERIFY_OTP_FAILURE, errMessage: error });
  }
}


function* updatePhone(action) {
  let userId = action.payload.body.userId;
  delete action.payload.body.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(
      AxiosInstance.put,
      action.payload.url,
      action.payload.body,
      config,
    );
    if (res.success) {
      yield put({
        type: UPDATE_USER_SUCCESS,
        payload: res.success
      })
      yield put({
        type: UPDATE_PHONE_SUCCESS,
        payload: res.success,
      });
    }
    else {

      yield put({ type: UPDATE_PHONE_FAILURE, errMessage: res.error.message });
    }
  } catch (error) {
    console.log('error: ', error)
    yield put({ type: UPDATE_PHONE_FAILURE, errMessage: error });
  }
}

export function* updatePhoneActionWatcher() {
  yield takeLatest(UPDATE_PHONE, updatePhone);
}

export function* sendOTPActionWatcher() {
  yield takeLatest(`${SEND_OTP}`, sendOTP);
}

export function* verifyOTPActionWatcher() {
  yield takeLatest(`${VERIFY_OTP}`, verifyOTP);
}
