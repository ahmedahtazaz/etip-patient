import {put, takeLatest, call} from 'redux-saga/effects';

import {
  GET_POLICY,
  GET_POLICY_SUCCESS,
  GET_POLICY_FAILURE,
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* policySaga(action) {
  try {
    const {data: res} = yield call(AxiosInstance.get, action.payload);
    yield put({type: GET_POLICY_SUCCESS, payload: res});
  } catch (error) {
    yield put({type: GET_POLICY_FAILURE, errMessage: error});
  }
}

export default function* getPolicyData() {
  yield takeLatest(GET_POLICY, policySaga);
}
