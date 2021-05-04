import {
  GET_DEFAULT_LANG,
  GET_DEFAULT_LANG_FAILURE,
  GET_DEFAULT_LANG_SUCCESS,
  GET_LANG_BY_SELECTED_KEY,
  LOAD_INIT,
  LOAD_INIT_FAILURE,
  LOAD_INIT_SUCCESS,
  GET_LANG_BY_SELECTED_KEY_SUCCESS,
  GET_LANG_BY_SELECTED_KEY_FAILURE,
} from '../../commons/Constants';
import DeviceInfo from 'react-native-device-info';

import {put, takeLatest, call} from 'redux-saga/effects';

import AxiosInstance from '../../commons/AxiosInstance';

import axios from 'axios';

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

  if (payLoad) yield put({type: LOAD_INIT_SUCCESS, payLoad: payLoad});
  else yield put({type: LOAD_INIT_FAILURE, errMessage: error});
}

export default function* welcomeActionWatcher() {
  yield takeLatest(`${LOAD_INIT}`, loadInit);
}

function* getDefaultLanguages(action) {
  try {
    const {data: res} = yield call(AxiosInstance.get, action.payload);
    yield put({type: GET_DEFAULT_LANG_SUCCESS, defaultLangData: res.data});
  } catch (error) {
    yield put({type: GET_DEFAULT_LANG_FAILURE, errMessage: error});
  }
}

function* getSelectedLanguagesByKey(action) {
  try {
    const {data: res} = yield call(AxiosInstance.get, action.payload);
    yield put({
      type: GET_LANG_BY_SELECTED_KEY_SUCCESS,
      languageBySelectedKey: res.data,
    });
  } catch (error) {
    yield put({type: GET_LANG_BY_SELECTED_KEY_FAILURE, errMessage: error});
  }
}

export function* getDefaultLanguageSaga() {
  yield takeLatest(GET_DEFAULT_LANG, getDefaultLanguages);
}

export function* getSelectedLanguageByKeySaga() {
  yield takeLatest(GET_LANG_BY_SELECTED_KEY, getSelectedLanguagesByKey);
}
