import { put, takeLatest, call } from 'redux-saga/effects';
import {
    ADD_FAMILY_MEMBER,
    ADD_FAMILY_MEMBER_FAILURE,
    ADD_FAMILY_MEMBER_SUCCES,
    EDIT_FAMILY_MEMBER,
    EDIT_FAMILY_MEMBER_SUCCES,
    SIGNUP,
    SIGNUP_FAILURE,
    SIGNUP_SUCCES
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';



function* signUp(action) {
    try {
        const res  = yield call(AxiosInstance.post, action.payload.url, action.payload.body);
        console.log("signup res: ", res)
        yield put({ type: SIGNUP_SUCCES, payload: res });
    } catch (error) {
        console.log("error: ", error);
        yield yield put({ type: SIGNUP_FAILURE, errMessage: error });
    }
}


function* addFamilyMember(action) {
    console.log('action: ', action)
    let error = undefined;
    let res = undefined;

    yield fetch(action.payload.url, {
        method: 'POST',
        body: action.payload.body,
    })
        .then(response => {
            res = response;
        })
        .catch(err => {
            error = err;
        });

    if (res) {
        res = yield res.json();
    }

    if (res) yield put({ type: ADD_FAMILY_MEMBER_SUCCES, payload: res });
    else yield put({ type: ADD_FAMILY_MEMBER_FAILURE, errMessage: error });
}


function* editFamilyMember(action) {
    console.log('action: ', action)
    let error = undefined;
    let res = undefined;

    yield fetch(action.payload.url, {
        method: 'POST',
        body: action.payload.body,
    })
        .then(response => {
            res = response;
        })
        .catch(err => {
            error = err;
        });

    if (res) {
        res = yield res.json();
    }

    if (res) yield put({ type: EDIT_FAMILY_MEMBER_SUCCES, payload: res });
    else yield put({ type: EDIT_FAMILY_MEMBER_FAILURE, errMessage: error });
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

