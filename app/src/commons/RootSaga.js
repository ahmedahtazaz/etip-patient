import {all} from 'redux-saga/effects';
import splashActionWatcher from '../containers/Splash/Saga';
import welcomeActionWatcher from '../containers/Welcome/Saga';

export default function* rootSaga() {
  yield all([welcomeActionWatcher(), splashActionWatcher()]);
}
