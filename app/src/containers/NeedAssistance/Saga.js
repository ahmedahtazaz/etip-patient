import { put, takeLatest, call } from 'redux-saga/effects';

import {
    GET_NEED_ASSISTANCE,
    GET_NEED_ASSISTANCE_FAILURE,
    GET_NEED_ASSISTANCE_SUCCESS
} from '../../commons/Constants';

import AxiosInstance from '../../commons/AxiosInstance';

function* getNeedAssistance(action) {
    try {
        const res = yield call(AxiosInstance.get, action.payload.url);
        if (res.success)
            yield put({ type: GET_NEED_ASSISTANCE_SUCCESS, payload: res.success?.data?.data });
        else
            yield put({ type: GET_NEED_ASSISTANCE_FAILURE, errMessage: res.error.message });
    } catch (error) {
        yield put({ type: GET_NEED_ASSISTANCE_FAILURE, errMessage: error });
    }
}

export default function* getNeedAssistanceActionWatcher() {
    yield takeLatest(GET_NEED_ASSISTANCE, getNeedAssistance);
}
