import { all } from 'redux-saga/effects';
import getABoutData from '../containers/AboutApp/Saga';
import getPolicyData from '../containers/AboutApp/Saga';
import {getchangeLanguage,getLanguageByKeysSaga} from '../containers/ChangeLanguage/Saga';
import { getProfileActionWatcher } from '../containers/AppointmentDetails/Saga';
import { getFamilyMembersActionWatcher, removeFamilyMembersActionWatcher } from '../containers/FamilyMain/Saga';
import { sendOTPActionWatcher, verifyOTPActionWatcher } from '../containers/Phone/Saga';
import splashActionWatcher from '../containers/Splash/Saga';
import getTermsData from '../containers/Terms/Saga';
import { addFamilyMemberActionWatcher, editFamilyMemberActionWatcher, signupActionWatcher } from '../containers/UserInfo/Saga';
import welcomeActionWatcher, { getDefaultLanguageSaga, getSelectedLanguageByKeySaga } from '../containers/Welcome/Saga';
import { getTestCentersSaga } from '../containers/TestCenter/Saga';
import { getAppointmentSlotSaga, getRegionSaga } from '../containers/AppointmentCalender/Saga';

export default function* rootSaga() {
  yield all([
    welcomeActionWatcher(),
    splashActionWatcher(),
    sendOTPActionWatcher(),
    verifyOTPActionWatcher(),
    signupActionWatcher(),

    addFamilyMemberActionWatcher(),
    editFamilyMemberActionWatcher(),
    removeFamilyMembersActionWatcher(),

    getTermsData(),
    getPolicyData(),
    getABoutData(),
    getchangeLanguage(),
    getDefaultLanguageSaga(),
    getSelectedLanguageByKeySaga(),
    getLanguageByKeysSaga(),
  
    getFamilyMembersActionWatcher(),
    getProfileActionWatcher(),
    getTestCentersSaga(),
    getRegionSaga(),

    getAppointmentSlotSaga()
  ]);
}
