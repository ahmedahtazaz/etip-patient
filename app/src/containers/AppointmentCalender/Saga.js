
  
  import { put, takeLatest, call } from 'redux-saga/effects';

  import { GET_REGION, GET_REGION_FAILURE, GET_REGION_SUCCESS } from '../../commons/Constants';
  
  import DeviceInfo from 'react-native-device-info';
  
  import axios from 'axios';
  
  import AxiosInstance from '../../commons/AxiosInstance';
 
  
  function*  getRegion(action) {
    try {
        const { data: res } = yield call(AxiosInstance.get, action.payload);
      
        yield put({ type: GET_REGION_SUCCESS, regionData: res.data });
    } catch (error) {
        // console.log("error: ", error);
        yield put({ type: GET_REGION_FAILURE, errMessage: error });
    }
  }
  
  export  function* getRegionSaga() {
    yield takeLatest(GET_REGION, getRegion);
  }
  