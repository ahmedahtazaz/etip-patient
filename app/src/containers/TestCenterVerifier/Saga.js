import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_TEST_POINTS, GET_TEST_POINTS_FAILURE, GET_TEST_POINTS_SUCCESS } from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';


function* getTestPoints(action) {
    try {
        const res = yield call(AxiosInstance.get, action.payload.url);
        if (res.error) {
            yield put({ type: GET_TEST_POINTS_FAILURE, errMessage: res.error?.message });
        } else {
            yield put({
                type: GET_TEST_POINTS_SUCCESS,
                payload: res.success?.data?.data,
            });
        }
    } catch (error) {
        yield put({ type: GET_TEST_POINTS_FAILURE, errMessage: error });
    }
}



export function* getTestPointsActionWatcher() {
    yield takeLatest(GET_TEST_POINTS, getTestPoints);
}
