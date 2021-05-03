
  
  import { put, takeLatest, call } from 'redux-saga/effects';

  import { GET_TEST_CENTERS, GET_TEST_CENTERS_FAILURE, GET_TEST_CENTERS_SUCCESS } from '../../commons/Constants';
  
  import DeviceInfo from 'react-native-device-info';
  
  import axios from 'axios';
  
  import AxiosInstance from '../../commons/AxiosInstance';
 
  
  function*  getTestCenters(action) {
    try {
        const { data: res } = yield call(AxiosInstance.get, action.payload);
        console.log('BERLin');
        console.log(res);

        yield put({ type: GET_TEST_CENTERS_SUCCESS, testCenterData: res.data });
    } catch (error) {
        // console.log("error: ", error);
        yield put({ type: GET_TEST_CENTERS_FAILURE, errMessage: error });
    }
  }
  
  export  function* getTestCentersSaga() {
    yield takeLatest(GET_TEST_CENTERS, getTestCenters);
  }
  