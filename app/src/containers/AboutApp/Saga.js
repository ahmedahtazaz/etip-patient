import {put, takeLatest, call} from 'redux-saga/effects';

import {
  GET_ABOUT_APP,
  GET_ABOUT_APP_FAILURE,
  GET_ABOUT_APP_SUCCESS,
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* AboutAppSaga(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload);
    if (res.success)
      yield put({type: GET_ABOUT_APP_SUCCESS, payload: res.success});
    else
      yield put({type: GET_ABOUT_APP_FAILURE, errMessage: res.error.message});
  } catch (error) {
    yield put({type: GET_ABOUT_APP_FAILURE, errMessage: error});
  }
}

export default function* getABoutData() {
  yield takeLatest(GET_ABOUT_APP, AboutAppSaga);
}
