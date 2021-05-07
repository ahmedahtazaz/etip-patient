import {put, takeLatest, call} from 'redux-saga/effects';
import {
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
  UPDATE_EMAIL,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* updateEmail(action) {
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

    if (res.success)
      yield put({
        type: UPDATE_EMAIL_SUCCESS,
        payload: res.success,
      });
    else {
      yield put({type: UPDATE_EMAIL_FAILURE, errMessage: res.error.message});
    }
  } catch (error) {
    yield put({type: UPDATE_EMAIL_FAILURE, errMessage: error});
  }
}

export function* updateEmailActionWatcher() {
  yield takeLatest(UPDATE_EMAIL, updateEmail);
}
