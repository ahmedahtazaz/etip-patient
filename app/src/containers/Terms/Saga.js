import {put, takeLatest, call} from 'redux-saga/effects';

import {
  GET_TERMS,
  GET_TERMS_SUCCESS,
  GET_TERMS_FAILURE,
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* termSaga(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload);
    if (res.success) yield put({type: GET_TERMS_SUCCESS, payload: res.success});
    else yield put({type: GET_TERMS_FAILURE, errMessage: res.error.message});
  } catch (error) {
    yield put({type: GET_TERMS_FAILURE, errMessage: error});
  }
}

export default function* getTermsData() {
  yield takeLatest(GET_TERMS, termSaga);
}
