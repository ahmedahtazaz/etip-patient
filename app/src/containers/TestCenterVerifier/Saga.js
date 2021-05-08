import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_TEST_POINTS, GET_TEST_POINTS_FAILURE, GET_TEST_POINTS_SUCCESS } from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';


function* getTestPoints(action) {
    console.log('getTestPoints action::: ', action)
    try {
        const res = yield call(AxiosInstance.get, action.payload.url);
        console.log("getTestPoints res::: ", res.success?.data?.data);
        if (res.error) {
            yield put({ type: GET_TEST_POINTS_FAILURE, errMessage: res.error?.message });
        } else {
            yield put({
                type: GET_TEST_POINTS_SUCCESS,
                payload: res.success?.data?.data,
            });
        }
    } catch (error) {
        console.log('getTestPoints catch error:: ', error)
        yield put({ type: GET_TEST_POINTS_FAILURE, errMessage: error });
    }
}



export function* getTestPointsActionWatcher() {
    yield takeLatest(GET_TEST_POINTS, getTestPoints);
}
