import {combineReducers} from 'redux';
import welcomeReducer from '../containers/Welcome/Reducer';

const createRootReducer = () =>
  combineReducers({
    welcomeReducer: welcomeReducer(),
  });

export default createRootReducer;
