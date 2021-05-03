import { put, takeLatest, call } from 'redux-saga/effects';
import {
    showToast,
    GET_PROFILE,
    GET_PROFILE_FAILURE,
    GET_PROFILE_SUCCESS
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';



function* getProfile(action) {
    console.log('getProfile action: ', action)
    let userId = action.payload.userId;
    delete action.payload.userId;
    try {
        const config = {
            headers: {
                userId
            }
        }
        const { data: res } = yield call(AxiosInstance.get, action.payload.url, config);
        if (res.data)
            yield put({ type: GET_PROFILE_SUCCESS, payload: res.data });
        else {
            showToast(res.data.message)
        }
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: GET_PROFILE_FAILURE, errMessage: error });
    }
}




export function* getProfileActionWatcher() {
    yield takeLatest(GET_PROFILE, getProfile);
}

