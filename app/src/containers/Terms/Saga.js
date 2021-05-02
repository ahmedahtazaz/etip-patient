import {put, takeLatest} from 'redux-saga/effects';

import {
  GET_TERMS,
  GET_TERMS_SUCCESS,
  GET_TERMS_FAILURE
  } from '../../commons/Constants';
  
import DeviceInfo from 'react-native-device-info';

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
    console.log('payload true');
    console.log(payLoad1);
    yield put({type: GET_TERMS_SUCCESS, payLoad: payLoad1});
  }
  else 
  {
    yield put({type: GET_TERMS_FAILURE, errMessage: error});
  }
}

export default function* getTermsData() {
  yield takeLatest(GET_TERMS, loadInit);
}
