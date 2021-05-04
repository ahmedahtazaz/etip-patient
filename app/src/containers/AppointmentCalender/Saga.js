import {put, takeLatest, call} from 'redux-saga/effects';
import {
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
    const {data: res} = yield call(AxiosInstance.get, action.payload);
    yield put({type: GET_REGION_SUCCESS, regionData: res.data});
  } catch (error) {
    yield put({type: GET_REGION_FAILURE, errMessage: error});
  }
}

function* getAppointmentSlots(action) {
  try {
    const {data: res} = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
    );
    yield put({type: GET_APPOINTMENT_SLOT_SUCCESS, payload: res.data});
  } catch (error) {
    yield put({type: GET_APPOINTMENT_SLOT_FAILURE, errMessage: error});
  }
}

export function* getRegionSaga() {
  yield takeLatest(GET_REGION, getRegion);
}

export function* getAppointmentSlotSaga() {
  yield takeLatest(GET_APPOINTMENT_SLOT, getAppointmentSlots);
}
