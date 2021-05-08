import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_PENDING_APPLICATIONS, GET_PENDING_APPLICATIONS_FAILURE, GET_PENDING_APPLICATIONS_SUCCESS } from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';


function* getPendingApplications(action) {
    console.log('getPendingApplications action::: ', action)
    try {
        const res = yield call(AxiosInstance.get, action.payload.url);
        console.log("getPendingApplications res::: ", res.success?.data?.data);
        if (res.error) {
            yield put({ type: GET_PENDING_APPLICATIONS_FAILURE, errMessage: res.error?.message });
        } else {
            yield put({
                type: GET_PENDING_APPLICATIONS_SUCCESS,
                payload: res.success?.data?.data,
            });
        }
    } catch (error) {
        console.log('getPendingApplications catch error:: ', error)
        yield put({ type: GET_TEST_POINTS_FAILURE, errMessage: error });
    }
}



export function* getPendingApplicationsActionWatcher() {
    yield takeLatest(GET_PENDING_APPLICATIONS, getPendingApplications);
}
