import { put, takeLatest, call } from 'redux-saga/effects';
import { VERIFY_PIN, VERIFY_PIN_FAILURE, VERIFY_PIN_SUCCESS } from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';


function* verifyPin(action) {
    try {
        const res = yield call(AxiosInstance.get, action.payload.url);
        if (res.error) {
            yield put({ type: VERIFY_PIN_FAILURE, errMessage: res.error?.message });
        } else {
            yield put({
                type: VERIFY_PIN_SUCCESS,
                payload: res.success?.data?.data,
            });
        }
    } catch (error) {
        yield put({ type: VERIFY_PIN_FAILURE, errMessage: error });
    }
}



export function* verifyPinActionWatcher() {
    yield takeLatest(VERIFY_PIN, verifyPin);
}
