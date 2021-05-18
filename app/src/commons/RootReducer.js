import { combineReducers } from 'redux';
import LanguageReducer from '../containers/ChangeLanguage/Reducer';
import splashReducer from '../containers/Splash/Reducer';
import welcomeReducer from '../containers/Welcome/Reducer';
import userInfoReducer from '../containers/UserInfo/Reducer';
import phoneReducer from '../containers/Phone/Reducer';
import getTermsReducer from '../containers/Terms/Reducers';
import getPolicyReducer from '../containers/Policy/Reducers';
import getAboutApp from '../containers/AboutApp/Reducers';

import TestCenterReducer from '../containers/TestCenter/Reducer';

import familyReducer from '../containers/FamilyMain/Reducer';
import appointmentDetailsReducer from '../containers/AppointmentDetails/Reducer';
import RegionReducer from '../containers/AppointmentCalender/Reducers';
import mainScreenReducer from '../containers/MainScreen/Reducer';
import certificatesReducer from '../containers/Certificates/Reducer';
import updateEmailReducer from '../containers/UpdateOtherSettings/Reducer';
import pinScreenReducer from '../containers/PinScreen/Reducer';
import testCenterVerifierReducer from '../containers/TestCenterVerifier/Reducer';
import testCenterInfoReducer from '../containers/TestCenterInfo/Reducer';
import qrScreenReducer from '../containers/QRScreen/Reducer';
import verifierUserInfoReducer from '../containers/VerifierUserInfo/Reducer';
import issueCertificateReducer from '../containers/TestInformation/Reducer';

const createRootReducer = () =>
  combineReducers({
    welcomeReducer: welcomeReducer(),
    splashReducer: splashReducer(),
    userInfoReducer: userInfoReducer(),
    LanguageReducer: LanguageReducer(),
    phoneReducer: phoneReducer(),
    getTermsReducer: getTermsReducer(),
    getPolicyReducer: getPolicyReducer(),
    getAboutApp: getAboutApp(),
    phoneReducer: phoneReducer(),
    familyReducer: familyReducer(),
    appointmentDetailsReducer: appointmentDetailsReducer(),
    TestCenterReducer: TestCenterReducer(),
    RegionReducer: RegionReducer(),
    mainScreenReducer: mainScreenReducer(),
    certificatesReducer: certificatesReducer(),
    updateEmailReducer: updateEmailReducer(),

    /* verifier app reducers */

    pinScreenReducer: pinScreenReducer(),
    testCenterVerifierReducer: testCenterVerifierReducer(),
    testCenterInfoReducer: testCenterInfoReducer(),
    qrScreenReducer: qrScreenReducer(),
    verifierUserInfoReducer: verifierUserInfoReducer(),
    issueCertificateReducer: issueCertificateReducer()

  });

export default createRootReducer;
