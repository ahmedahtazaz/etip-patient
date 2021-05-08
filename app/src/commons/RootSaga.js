import {all} from 'redux-saga/effects';
import getABoutData from '../containers/AboutApp/Saga';
import getPolicyData from '../containers/Policy/Saga';
import {
  getchangeLanguage,
  getLanguageByKeysSaga,
} from '../containers/ChangeLanguage/Saga';
import {getProfileActionWatcher} from '../containers/AppointmentDetails/Saga';
import {
  getFamilyMembersActionWatcher,
  removeFamilyMembersActionWatcher,
} from '../containers/FamilyMain/Saga';
import {
  sendOTPActionWatcher,
  updatePhoneActionWatcher,
  verifyOTPActionWatcher,
} from '../containers/Phone/Saga';
import splashActionWatcher from '../containers/Splash/Saga';
import getTermsData from '../containers/Terms/Saga';
import {
  addFamilyMemberActionWatcher,
  editFamilyMemberActionWatcher,
  getRelationsActionWatcher,
  getUserInfoRegionActionWatcher,
  signupActionWatcher,
  updateUserActionWatcher,
} from '../containers/UserInfo/Saga';
import welcomeActionWatcher, {
  getDefaultLanguageSaga,
  getLanguageByKeySaga,
  getLanguagesKeysSaga,
} from '../containers/Welcome/Saga';
import {getTestCentersSaga} from '../containers/TestCenter/Saga';
import {
  createAppointmentSaga,
  getAppointmentSlotSaga,
  getRegionSaga,
} from '../containers/AppointmentCalender/Saga';
import { getCertificatesActionWatcher } from '../containers/Certificates/Saga';
import { updateEmailActionWatcher } from '../containers/MainScreen/Saga';

export default function* rootSaga() {
  yield all([
    welcomeActionWatcher(),
    splashActionWatcher(),
    sendOTPActionWatcher(),
    verifyOTPActionWatcher(),
    signupActionWatcher(),
    updateUserActionWatcher(),
    updateEmailActionWatcher(),
    updatePhoneActionWatcher(),

    addFamilyMemberActionWatcher(),
    editFamilyMemberActionWatcher(),
    removeFamilyMembersActionWatcher(),

    getTermsData(),
    getPolicyData(),
    getABoutData(),
    getchangeLanguage(),
    getDefaultLanguageSaga(),
    getLanguageByKeySaga(),
    getLanguageByKeysSaga(),
    getLanguagesKeysSaga(),
    getRelationsActionWatcher(),
    getUserInfoRegionActionWatcher(),

    getFamilyMembersActionWatcher(),
    getProfileActionWatcher(),
    getTestCentersSaga(),
    getRegionSaga(),

    getAppointmentSlotSaga(),
    createAppointmentSaga(),

    getCertificatesActionWatcher(),
  ]);
}
