import { put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_CONDUCTED_TESTS,
    GET_CONDUCTED_TESTS_FAILURE,
    GET_CONDUCTED_TESTS_SUCCESS
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';


function* getConductedTest(action) {
    try {
        console.log("getConductedTest action:: ", action)
        const res = yield call(AxiosInstance.get, action.payload.url);
        console.log("getconductedTest res:: ", res.success?.data?.data);
        if (res.error) {
            yield put({ type: GET_CONDUCTED_TESTS_FAILURE, errMessage: res.error?.message });
        } else {
            yield put({
                type: GET_CONDUCTED_TESTS_SUCCESS,
                payload: res.success?.data?.data,
            });
        }
    } catch (error) {
        yield put({ type: GET_CONDUCTED_TESTS_FAILURE, errMessage: error });
    }
}



export function* getConductedTestActionWatcher() {
    yield takeLatest(GET_CONDUCTED_TESTS, getConductedTest);
}
