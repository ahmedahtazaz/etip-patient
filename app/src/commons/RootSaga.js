import { all } from 'redux-saga/effects';
import { getProfileActionWatcher } from '../containers/AppointmentDetails/Saga';
import { getFamilyMembersActionWatcher } from '../containers/FamilyMain/Saga';
import { sendOTPActionWatcher, verifyOTPActionWatcher } from '../containers/Phone/Saga';
import splashActionWatcher from '../containers/Splash/Saga';
import { addFamilyMemberActionWatcher, editFamilyMemberActionWatcher, signupActionWatcher } from '../containers/UserInfo/Saga';
import welcomeActionWatcher from '../containers/Welcome/Saga';

export default function* rootSaga() {
  yield all([
    welcomeActionWatcher(),
    splashActionWatcher(),
    sendOTPActionWatcher(),
    verifyOTPActionWatcher(),
    signupActionWatcher(),
    addFamilyMemberActionWatcher(),
    editFamilyMemberActionWatcher(),
    getFamilyMembersActionWatcher(),
    getProfileActionWatcher()
  ]);
}
