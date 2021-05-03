import { put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_FAMILY_MEMBER,
    GET_FAMILY_MEMBER_SUCCESS,
    GET_FAMILY_MEMBER_FAILURE,
    showToast
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';



function* getFamilyMembers(action) {
    console.log('getfamily action: ', action)
    let userId = action.payload.userId;
    delete action.payload.userId;
    try {
        const config = {
            headers: {
                userId
            }
        }
        const { data: res } = yield call(AxiosInstance.get, action.payload.url, config);
        console.log('get family res: ', res)
        if (res.data && res.data.familyUsers.length)
            yield put({ type: GET_FAMILY_MEMBER_SUCCESS, payload: res.data.familyUsers });
        else {
            showToast(res.data.message)
        }
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: GET_FAMILY_MEMBER_FAILURE, errMessage: error });
    }
}




export function* getFamilyMembersActionWatcher() {
    yield takeLatest(GET_FAMILY_MEMBER, getFamilyMembers);
}

