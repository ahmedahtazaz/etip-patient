
  
  import { put, takeLatest, call } from 'redux-saga/effects';

  import {
    GET_POLICY,
    GET_POLICY_SUCCESS,
    GET_POLICY_FAILURE
    } from '../../commons/Constants';
    
  import DeviceInfo from 'react-native-device-info';
  
  import axios from 'axios';
  
  import AxiosInstance from '../../commons/AxiosInstance';
 
  
  function* policySaga(action) {
    console.log('action');
    console.log(action);
    try {
        const { data: res } = yield call(AxiosInstance.get, action.payload);
        console.log(res);
        yield put({ type: GET_POLICY_SUCCESS, payload: res });
    } catch (error) {
        console.log("error: ", error);
        yield put({ type: GET_POLICY_FAILURE, errMessage: error });
    }
  }
  
  export default function* getPolicyData() {
    yield takeLatest(GET_POLICY, policySaga);
  }
  