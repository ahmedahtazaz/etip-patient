
  
  import { put, takeLatest, call } from 'redux-saga/effects';

  import {
    GET_ABOUT_APP,
    GET_ABOUT_APP_FAILURE,
    GET_ABOUT_APP_SUCCESS
  } from '../../commons/Constants';
  
  import DeviceInfo from 'react-native-device-info';
  
  import axios from 'axios';
  
  import AxiosInstance from '../../commons/AxiosInstance';
 
  
  function* AboutAppSaga(action) {
   
    try {
        const { data: res } = yield call(AxiosInstance.get, action.payload);
        yield put({ type: GET_ABOUT_APP_SUCCESS, payload: res });
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: GET_ABOUT_APP_FAILURE, errMessage: error });
    }
  }
  
  export default function* getABoutData() {
    yield takeLatest(GET_ABOUT_APP, AboutAppSaga);
  }
  