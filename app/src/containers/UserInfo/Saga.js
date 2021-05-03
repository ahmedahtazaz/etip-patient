import { put, takeLatest, call } from 'redux-saga/effects';
import {
    ADD_FAMILY_MEMBER,
    ADD_FAMILY_MEMBER_FAILURE,
    ADD_FAMILY_MEMBER_SUCCES,
    EDIT_FAMILY_MEMBER,
    EDIT_FAMILY_MEMBER_SUCCES,
    EDIT_FAMILY_MEMBER_FAILURE,
    SIGNUP,
    SIGNUP_FAILURE,
    SIGNUP_SUCCES,
    showToast
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';



function* signUp(action) {
    console.log('action: ', action)
    try {
        const { data: res } = yield call(AxiosInstance.post, action.payload.url, action.payload.body);
        console.log('res: ', res);
        yield put({ type: SIGNUP_SUCCES, payload: res.data });
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: SIGNUP_FAILURE, errMessage: error });
    }
}


function* addFamilyMember(action) {
    console.log('action: ', action)
    let userId = action.payload.body.userId;
    delete action.payload.body.userId;
    console.log("userId: ", userId, action.payload.body.userId);
    try {
        const config = {
            headers: {
                userId
            }
        }
        const { data: res } = yield call(AxiosInstance.post, action.payload.url, action.payload.body, config);
        console.log('res: ', res);
        if (res.data && res.data.familyUsers.length)
            yield put({ type: ADD_FAMILY_MEMBER_SUCCES, payload: res.data.familyUsers });
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: ADD_FAMILY_MEMBER_FAILURE, errMessage: error });
    }
}


function* editFamilyMember(action) {
    let userId = action.payload.body.userId;
    delete action.payload.body.userId;
    try {
        const config = {
            headers: {
                userId
            }
        }
        const { data: res } = yield call(AxiosInstance.post, action.payload.url, action.payload.body, config);
        console.log('update family res: ', res);
        if (res.data)
            yield put({ type: EDIT_FAMILY_MEMBER_SUCCES, payload: res.data.familyUsers });
        else {
            showToast(res.message)
            yield put({ type: EDIT_FAMILY_MEMBER_FAILURE, errMessage: res.message });
        }
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: EDIT_FAMILY_MEMBER_FAILURE, errMessage: error });
    }

}


export function* editFamilyMemberActionWatcher() {
    yield takeLatest(EDIT_FAMILY_MEMBER, editFamilyMember);
}


export function* addFamilyMemberActionWatcher() {
    yield takeLatest(ADD_FAMILY_MEMBER, addFamilyMember);
}


export function* signupActionWatcher() {
    yield takeLatest(SIGNUP, signUp);
}

