import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_APPOINTMENT,
  CREATE_APPOINTMENT_FAILURE,
  CREATE_APPOINTMENT_SUCCESS,
  GET_APPOINTMENT_SLOT,
  GET_APPOINTMENT_SLOT_FAILURE,
  GET_APPOINTMENT_SLOT_SUCCESS,
  GET_REGION,
  GET_REGION_FAILURE,
  GET_REGION_SUCCESS,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* getRegion(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload);
    if (res.error) {
      yield put({ type: GET_REGION_FAILURE, errMessage: res.error?.message });
    } else {
      yield put({ type: GET_REGION_SUCCESS, regionData: res?.success?.data?.data });
    }
  } catch (error) {
    yield put({ type: GET_REGION_FAILURE, errMessage: error });
  }
}

function* getAppointmentSlots(action) {
  try {
    const res = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
    );
    if (res.error) {
      yield put({ type: GET_APPOINTMENT_SLOT_FAILURE, errMessage: res.error.message });
    } else {
      yield put({ type: GET_APPOINTMENT_SLOT_SUCCESS, payload: res?.success?.data?.data });
    }
  } catch (error) {
    yield put({ type: GET_APPOINTMENT_SLOT_FAILURE, errMessage: error });
  }
}

function* createAppointment(action) {
  console.log('createAppointment action: ', action);
  let userId = action.payload.userId;
  delete action.payload.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
      config
    );
    console.log('createAppointment res: ', res?.success?.data?.data);
    if (res.error) {
      console.log('createAppointment error: ', res?.error);
      yield put({ type: CREATE_APPOINTMENT_FAILURE, errMessage: res.error.message });
    } else {
      yield put({ type: CREATE_APPOINTMENT_SUCCESS, payload: res?.success?.data?.data });
    }
  } catch (error) {
    yield put({ type: CREATE_APPOINTMENT_FAILURE, errMessage: error });
  }
}



export function* getRegionSaga() {
  yield takeLatest(GET_REGION, getRegion);
}

export function* getAppointmentSlotSaga() {
  yield takeLatest(GET_APPOINTMENT_SLOT, getAppointmentSlots);
}

export function* createAppointmentSaga() {
  yield takeLatest(CREATE_APPOINTMENT, createAppointment);
}
