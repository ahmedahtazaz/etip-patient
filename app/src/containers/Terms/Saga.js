import { put, takeLatest, call } from 'redux-saga/effects';

import {
  GET_TERMS,
  GET_TERMS_SUCCESS,
  GET_TERMS_FAILURE
  } from '../../commons/Constants';
  
import DeviceInfo from 'react-native-device-info';

import axios from 'axios';

import AxiosInstance from '../../commons/AxiosInstance';
function* loadInit(action) {
  let error = undefined;
  let payLoad = undefined;
  let payLoad1 = undefined;
  let deviceId = DeviceInfo.getUniqueId();
 
  yield fetch(action.url, {
    method: 'GET',
   
  })
    .then(response => {
      payLoad = response;

    })
    .catch(err => {
      error = err;
    });

  if (payLoad) {
    payLoad1 = yield payLoad.json();
  }

  if (payLoad)
  {
  
    yield put({type: GET_TERMS_SUCCESS, payLoad: payLoad1});
  }
  else 
  {
    yield put({type: GET_TERMS_FAILURE, errMessage: error});
  }
}

function* termSaga(action) {
 
  try {
      const { data: res } = yield call(AxiosInstance.get, action.payload);
      yield put({ type: GET_TERMS_SUCCESS, payload: res });
  } catch (error) {
      yield put({ type: GET_TERMS_FAILURE, errMessage: error });
  }
}

export default function* getTermsData() {
  yield takeLatest(GET_TERMS, termSaga);
}
