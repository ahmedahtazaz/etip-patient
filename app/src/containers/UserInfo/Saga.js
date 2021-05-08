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
  showToast,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
  UPDATE_EMAIL,
  GET_RELATIONS_SUCCESS,
  GET_RELATIONS_FAILURE,
  GET_RELATIONS,
  GET_USERINFO_REGION_FAILURE,
  GET_USERINFO_REGION_SUCCESS,
  GET_USERINFO_REGION,
} from '../../commons/Constants';
import AxiosInstance from '../../commons/AxiosInstance';

function* signUp(action) {
  try {
    const res = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
    );
    if (res.error) {
      yield put({ type: SIGNUP_FAILURE, errMessage: res.error.message });
    } else {
      yield put({ type: SIGNUP_SUCCES, payload: res.success });
    }
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, errMessage: error });
  }
}

function* getRegion(action) {
  try {
    const res = yield call(AxiosInstance.get, action.payload.url);
    if (res.error) {
      yield put({ type: GET_USERINFO_REGION_FAILURE, errMessage: res.error?.message });
    } else {
      let modifiedRegions = res?.success?.data?.data.map(region => {
        return {
          label: region.name,
          value: region.name
        }
      })
      yield put({
        type: GET_USERINFO_REGION_SUCCESS,
        payload: modifiedRegions,
      });
    }
  } catch (error) {
    yield put({ type: GET_REGION_FAILURE, errMessage: error });
  }
}

function* getRelations(action) {
  try {
    const res = yield call(
      AxiosInstance.get,
      action.payload.url
    );
    if (res.error) {
      yield put({ type: GET_RELATIONS_FAILURE, errMessage: res.error?.message });
    } else {
      let modfiedRes = res.success?.data?.data.map(rel => {
        return {
          label: rel,
          value: rel
        }
      })
      yield put({ type: GET_RELATIONS_SUCCESS, payload: modfiedRes });
    }
  } catch (error) {
    yield put({ type: GET_RELATIONS_FAILURE, errMessage: error });
  }
}

function* addFamilyMember(action) {
  let userId = action.payload.body.userId;
  delete action.payload.body.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(
      AxiosInstance.post,
      action.payload.url,
      action.payload.body,
      config,
    );
    if (res.error) {
      yield put({
        type: ADD_FAMILY_MEMBER_FAILURE,
        errMessage: res.error.message,
      });
    } else {
      yield put({
        type: ADD_FAMILY_MEMBER_SUCCES,
        payload: res?.success?.data?.data?.familyUsers,
      });
    }
  } catch (error) {
    yield put({ type: ADD_FAMILY_MEMBER_FAILURE, errMessage: error });
  }
}

function* editFamilyMember(action) {
  let userId = action.payload.body.userId;
  delete action.payload.body.userId;
  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(
      AxiosInstance.put,
      action.payload.url,
      action.payload.body,
      config,
    );
    if (res.success)
      yield put({
        type: EDIT_FAMILY_MEMBER_SUCCES,
        payload: res.success.data.data.familyUsers,
      });
    else {
      showToast(res.error.message);
      yield put({
        type: EDIT_FAMILY_MEMBER_FAILURE,
        errMessage: res.error.message,
      });
    }
  } catch (error) {
    yield put({ type: EDIT_FAMILY_MEMBER_FAILURE, errMessage: error });
  }
}

function* updateUser(action) {
  let userId = action.payload.body.userId;
  delete action.payload.body.userId;

  try {
    const config = {
      headers: {
        userId,
      },
    };
    const res = yield call(
      AxiosInstance.put,
      action.payload.url,
      action.payload.body,
      config,
    );

    if (res.success)
      yield put({
        type: UPDATE_USER_SUCCESS,
        payload: res.success,
      });
    else {
      yield put({ type: UPDATE_USER_FAILURE, errMessage: res.error.message });
    }
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, errMessage: error });
  }
}


export function* updateUserActionWatcher() {
  yield takeLatest(UPDATE_USER, updateUser);
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

export function* getRelationsActionWatcher() {
  yield takeLatest(GET_RELATIONS, getRelations);
}

export function* getUserInfoRegionActionWatcher() {
  yield takeLatest(GET_USERINFO_REGION, getRegion);
}
