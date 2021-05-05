import { put, takeLatest, call } from 'redux-saga/effects';

import {
  GET_TEST_CENTERS,
  GET_TEST_CENTERS_FAILURE,
  GET_TEST_CENTERS_SUCCESS,
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* getTestCenters(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload);
    if (res.error) {
      yield put({ type: GET_TEST_CENTERS_FAILURE, errMessage: res.error.message });
    } else {
      yield put({ type: GET_TEST_CENTERS_SUCCESS, testCenterData: res?.success?.data?.data });
    }
  } catch (error) {
    yield put({ type: GET_TEST_CENTERS_FAILURE, errMessage: error });
  }
}

export function* getTestCentersSaga() {
  yield takeLatest(GET_TEST_CENTERS, getTestCenters);
}
