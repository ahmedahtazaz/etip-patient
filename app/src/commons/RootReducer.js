import {combineReducers} from 'redux';
import LanguageReducer from '../containers/ChangeLanguage/Reducer';
import splashReducer from '../containers/Splash/Reducer';
import welcomeReducer from '../containers/Welcome/Reducer';
import userInfoReducer from '../containers/UserInfo/Reducer';
import phoneReducer from '../containers/Phone/Reducer';
import getTermsReducer from '../containers/Terms/Reducers';
import getPolicyReducer from '../containers/Policy/Reducers';
import getAboutApp from '../containers/AboutApp/Reducers';



const createRootReducer = () =>
  combineReducers({
    welcomeReducer: welcomeReducer(),
    splashReducer: splashReducer(),
    userInfoReducer: userInfoReducer(),
    LanguageReducer:LanguageReducer(),
    phoneReducer: phoneReducer(),
    getTermsReducer:getTermsReducer(),
    getPolicyReducer:getPolicyReducer(),
    getPolicyReducer:getPolicyReducer(),
    getAboutApp:getAboutApp(),
    
    
    

  });

export default createRootReducer;
