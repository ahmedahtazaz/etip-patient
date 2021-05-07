import {put, takeLatest, call} from 'redux-saga/effects';
import {
  GET_ACTIVE_APPOINTMENTS,
  GET_ACTIVE_APPOINTMENTS_FAILURE,
  GET_ACTIVE_APPOINTMENTS_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* getProfile(action) {
  let userId = action.payload.userId;
  delete action.payload.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(AxiosInstance.get, action.payload.url, config);
    if (res.error) {
      yield put({type: GET_PROFILE_FAILURE, errMessage: res.error.message});
    } else {
      yield put({type: GET_PROFILE_SUCCESS, payload: res.success});
    }
  } catch (error) {
    yield put({type: GET_PROFILE_FAILURE, errMessage: error});
  }
}

function* getActiveAppointments(action) {
  const userId = action.payload.userId;
  const familyId = action.payload.familyId;
  try {
    const config = {
      headers: {
        userId,
        familyId,
      },
    };
    const res = yield call(AxiosInstance.get, action.payload.url, config);
    if (res.error) {
      yield put({
        type: GET_ACTIVE_APPOINTMENTS_FAILURE,
        errMessage: res.error.message,
      });
    } else {
      yield put({type: GET_ACTIVE_APPOINTMENTS_SUCCESS, payload: res.success});
    }
  } catch (error) {
    yield put({type: GET_ACTIVE_APPOINTMENTS_FAILURE, errMessage: error});
  }
}

export function* getProfileActionWatcher() {
  yield takeLatest(GET_PROFILE, getProfile);
  yield takeLatest(GET_ACTIVE_APPOINTMENTS, getActiveAppointments);
}
