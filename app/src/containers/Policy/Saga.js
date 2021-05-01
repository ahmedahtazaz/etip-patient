import {put, takeLatest} from 'redux-saga/effects';

import {
    GET_POLICY,
    GET_POLICY_FAILURE,
    GET_POLICY_SUCCESS
  } from '../../commons/Constants';
  
import DeviceInfo from 'react-native-device-info';

function* loadInit(action) {
  let error = undefined;
  let payLoad = undefined;
  let deviceId = DeviceInfo.getUniqueId();

  yield fetch(action.url, {
    method: 'GET',
    headers: {
      device_id: deviceId,
    },
  })
    .then(response => {
      payLoad = response;
    })
    .catch(err => {
      error = err;
    });

  if (payLoad) {
    payLoad = yield payLoad.json();
  }

  if (payLoad) yield put({type: GET_POLICY_SUCCESS, payLoad: payLoad});
  else yield put({type: GET_POLICY_FAILURE, errMessage: error});
}

export default function* welcomeActionWatcher() {
  yield takeLatest(`${GET_POLICY}`, loadInit);
}
