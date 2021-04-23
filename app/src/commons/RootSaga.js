import {all} from 'redux-saga/effects';
import welcomeActionWatcher from '../containers/Welcome/Saga';

export default function* rootSaga() {
  yield all([welcomeActionWatcher()]);
}
