import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_START_APPLICATION, GET_START_APPLICATION_FAILURE, GET_START_APPLICATION_SUCCESS } from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';


function* getStartApplication(action) {
    try {
        const res = yield call(AxiosInstance.get, action.payload.url);
        if (res.error) {
            yield put({ type: GET_START_APPLICATION_FAILURE, errMessage: res.error?.message });
        } else {
            yield put({
                type: GET_START_APPLICATION_SUCCESS,
                payload: res.success?.data?.data,
            });
        }
    } catch (error) {
        yield put({ type: GET_START_APPLICATION_FAILURE, errMessage: error });
    }
}



export function* getStartApplicationActionWatcher() {
    yield takeLatest(GET_START_APPLICATION, getStartApplication);
}
