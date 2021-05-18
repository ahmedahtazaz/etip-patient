import { put, takeLatest, call } from 'redux-saga/effects';
import {
    CREATE_USRE,
    CREATE_USRE_FAILURE,
    CREATE_USRE_SUCCESS,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* createUser(action) {
    try {
        const res = yield call(
            AxiosInstance.post,
            action.payload.url,
            action.payload.body,
        );
        if (res.error) {
            yield put({ type: CREATE_USRE_FAILURE, errMessage: res.error.message });
        } else {
            yield put({ type: CREATE_USRE_SUCCESS, payload: res?.success?.data?.data });
        }
    } catch (error) {
        yield put({ type: CREATE_USRE_FAILURE, errMessage: error });
    }
}

export function* createUserActionWatcher() {
    yield takeLatest(CREATE_USRE, createUser);
}
