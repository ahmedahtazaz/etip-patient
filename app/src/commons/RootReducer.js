import {combineReducers} from 'redux';
import splashReducer from '../containers/Splash/Reducer';
import welcomeReducer from '../containers/Welcome/Reducer';
import userInfoReducer from '../containers/UserInfo/Reducer';

const createRootReducer = () =>
  combineReducers({
    welcomeReducer: welcomeReducer(),
    splashReducer: splashReducer(),
    userInfoReducer: userInfoReducer()
  });

export default createRootReducer;
