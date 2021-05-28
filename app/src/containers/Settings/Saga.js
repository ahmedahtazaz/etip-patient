import { put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
   
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* logout(action) {
  let userId = action.payload.userId;
  delete action.payload.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(AxiosInstance.get, action.payload.url, config);
    if (res.success)
      yield put({
        type: LOGOUT_SUCCESS,
        payload: res.success?.data?.data
      });
    else {
      yield put({
        type: LOGOUT_FAILURE,
        errMessage: res.error.message,
      });
    }
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, errMessage: error });
  }
}


export function* logoutActionWatcher() {
  yield takeLatest(LOGOUT, logout);
}

