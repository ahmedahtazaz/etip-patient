import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_FAMILY_MEMBER,
  GET_FAMILY_MEMBER_SUCCESS,
  GET_FAMILY_MEMBER_FAILURE,
  showToast,
  REMOVE_FAMILY_MEMBER_SUCCESS,
  REMOVE_FAMILY_MEMBER_FAILURE,
  REMOVE_FAMILY_MEMBER,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* getFamilyMembers(action) {
  let userId = action.payload.userId;
  delete action.payload.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(AxiosInstance.get, action.payload.url, config);
    if (res.success)
      yield put({
        type: GET_FAMILY_MEMBER_SUCCESS,
        payload: res.success.data.data.familyUsers,
      });
    else {
      yield put({
        type: GET_FAMILY_MEMBER_FAILURE,
        errMessage: res.error.message,
      });
    }
  } catch (error) {
    yield put({ type: GET_FAMILY_MEMBER_FAILURE, errMessage: error });
  }
}

function* removeFamilyMembers(action) {
  let userId = action.payload.userId;
  delete action.payload.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const { data: res } = yield call(
      AxiosInstance.delete,
      action.payload.url,
      config,
    );
    if (res.message === 'User removed successfully.')
      yield put({
        type: REMOVE_FAMILY_MEMBER_SUCCESS,
        payload: { id: action.payload.id },
      });
    else {
      showToast(res.message);
    }
  } catch (error) {
    yield put({ type: REMOVE_FAMILY_MEMBER_FAILURE, errMessage: error });
  }
}

export function* getFamilyMembersActionWatcher() {
  yield takeLatest(GET_FAMILY_MEMBER, getFamilyMembers);
}

export function* removeFamilyMembersActionWatcher() {
  yield takeLatest(REMOVE_FAMILY_MEMBER, removeFamilyMembers);
}
