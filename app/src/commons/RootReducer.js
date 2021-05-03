import { combineReducers } from 'redux';
import LanguageReducer from '../containers/ChangeLanguage/Reducer';
import splashReducer from '../containers/Splash/Reducer';
import welcomeReducer from '../containers/Welcome/Reducer';
import userInfoReducer from '../containers/UserInfo/Reducer';
import phoneReducer from '../containers/Phone/Reducer';
import familyReducer from '../containers/FamilyMain/Reducer'
import appointmentDetailsReducer from "../containers/AppointmentDetails/Reducer"

const createRootReducer = () =>
  combineReducers({
    welcomeReducer: welcomeReducer(),
    splashReducer: splashReducer(),
    userInfoReducer: userInfoReducer(),
    LanguageReducer: LanguageReducer(),
    phoneReducer: phoneReducer(),
    familyReducer: familyReducer(),
    appointmentDetailsReducer: appointmentDetailsReducer()

  });

export default createRootReducer;
