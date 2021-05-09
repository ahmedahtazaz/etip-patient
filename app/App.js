/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {compose, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/commons/RootSaga';
import createRootReducer from './src/commons/RootReducer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Policy from './src/containers/Policy/Policy';
import Terms from './src/containers/Terms/Terms';

import Welcome from './src/containers/Welcome/Welcome';
import Splash from './src/containers/Splash/Splash';
import Phone from './src/containers/Phone/Phone';
import UserInfo from './src/containers/UserInfo/UserInfo';
import UpdateSettings from './src/containers/UpdateSettings/UpdateSettings';
import MainScreen from './src/containers/MainScreen/MainScreen';
import Settings from './src/containers/Settings/Settings';
import Appointment from './src/containers/Appointment/Appointment';
import AppointmentCalender from './src/containers/AppointmentCalender/AppointmentCalender';
import TestCenter from './src/containers/TestCenter/TestCenter';
import AppointmentTimeSlot from './src/containers/AppointmentTimeSlot/AppointmentTimeSlot';
import AppointmentMainScreen from './src/containers/AppointmentMainScreen/AppointmentMainScreen';
import Certificates from './src/containers/Certificates/Certificates';
import FamilyMain from './src/containers/FamilyMain/FamilyMain';
import AppointmentDetails from './src/containers/AppointmentDetails/AppointmentDetails';
import UpdateOtherSettings from './src/containers/UpdateOtherSettings/UpdateOtherSettings';
import ChangeLanguage from './src/containers/ChangeLanguage/ChangeLanguage';
import AboutApp from './src/containers/AboutApp/AboutApp';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  createRootReducer(),
  compose(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {/*<Stack.Screen
              name="SplahScreen"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WelcomeScreen"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PhoneScreen"
              component={Phone}
              options={{headerShown: false}}
            />*/}
            <Stack.Screen
              name="UserInfoScreen"
              component={UserInfo}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Make an Appointment"
              component={Appointment}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="AppointmentCalender"
              component={AppointmentCalender}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="testCenter"
              component={TestCenter}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="appointmentSlot"
              component={AppointmentTimeSlot}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="appointmentMainScreen"
              component={AppointmentMainScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="certificateMain"
              component={Certificates}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="familyMain"
              component={FamilyMain}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AppointmentDetailsScreen"
              component={AppointmentDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UpdateSettingsScreen"
              component={UpdateSettings}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UpdateOtherSettingsScreen"
              component={UpdateOtherSettings}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ChangeLanguage"
              component={ChangeLanguage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="aboutApp"
              component={AboutApp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="policy"
              component={Policy}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="terms"
              component={Terms}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default App;
