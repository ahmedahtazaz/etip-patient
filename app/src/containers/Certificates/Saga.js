import {put, takeLatest, call} from 'redux-saga/effects';
import {
  GET_ACTIVE_CERTIFICATES,
  GET_ACTIVE_CERTIFICATES_FAILURE,
  GET_ACTIVE_CERTIFICATES_SUCCESS,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* getActiveCertificates(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload.url);
    if (res.error) {
      yield put({
        type: GET_ACTIVE_CERTIFICATES_FAILURE,
        errMessage: res.error.message,
      });
    } else {
      yield put({type: GET_ACTIVE_CERTIFICATES_SUCCESS, payload: res.success});
    }
  } catch (error) {
    yield put({type: GET_ACTIVE_CERTIFICATES_FAILURE, errMessage: error});
  }
}

export function* getCertificatesActionWatcher() {
  yield takeLatest(GET_ACTIVE_CERTIFICATES, getActiveCertificates);
}
