import {put, takeLatest, call} from 'redux-saga/effects';

import {
  GET_POLICY,
  GET_POLICY_SUCCESS,
  GET_POLICY_FAILURE,
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* policySaga(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload);

    if (res.success)
      yield put({type: GET_POLICY_SUCCESS, payload: res.success});
    else yield put({type: GET_POLICY_FAILURE, errMessage: res.error.message});
  } catch (error) {
    yield put({type: GET_POLICY_FAILURE, errMessage: error});
  }
}

export default function* getPolicyData() {
  yield takeLatest(GET_POLICY, policySaga);
}
