
  
  import { put, takeLatest, call } from 'redux-saga/effects';

  import {
    GET_LANG,
    GET_LANG_SUCCESS,
    GET_LANG_FAILURE,
    GET_LANG_BY_LANG,
    GET_LANG_BY_LANG_FAILURE,
    GET_LANG_BY_LANG_SUCCESS
  } from '../../commons/Constants';
  
  import DeviceInfo from 'react-native-device-info';
  
  import axios from 'axios';
  
  import AxiosInstance from '../../commons/AxiosInstance';
 
  
  function* changeLanguage(action) {
    try {
        const { data: res } = yield call(AxiosInstance.get, action.payload);
        yield put({ type: GET_LANG_SUCCESS, payload: res.data });
    } catch (error) {
        // console.log("error: ", error);
        yield put({ type: GET_LANG_FAILURE, errMessage: error });
    }
  }
  
  export  function* getchangeLanguage() {
    yield takeLatest(GET_LANG, changeLanguage);
  }
  
  function* getLanguagebyKeys(action) {
    try {
        const { data: res } = yield call(AxiosInstance.get, action.payload);
        yield put({ type: GET_LANG_BY_LANG_SUCCESS, langData: res.data });
        // console.log(langData);
     
    } catch (error) {
        // console.log("error: ", error);
        yield put({ type: GET_LANG_BY_LANG_FAILURE, errMessage: error });
    }
  }
  
  
  export function* getLanguageByKeysSaga() {
    yield takeLatest(GET_LANG_BY_LANG, getLanguagebyKeys);
  }
  