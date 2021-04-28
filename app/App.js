/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/commons/RootSaga';
import createRootReducer from './src/commons/RootReducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Welcome from './src/containers/Welcome/Welcome';
import Splash from './src/containers/Splash/Splash';
import Phone from './src/containers/Phone/Phone';
import UserInfo from './src/containers/UserInfo/UserInfo';
import UpdateSettings from './src/containers/UpdateSettings/UpdateSettings';
import MainScreen from './src/containers/MainScreen/MainScreen';
import Settings from './src/containers/Settings/Settings';
import { IS_VERIFIER_APP } from './src/commons/Constants';
import QRScreen from './src/containers/QRScreen/QRScreen';
import TestInformation from './src/containers/TestInformation/TestInformation';
import TestConducted from './src/containers/TestConducted/TestConducted';
import PinScreen from './src/containers/PinScreen/PinScreen';
import TestCenter from './src/containers/TestCenter/TestCenter';
import TestCenterInfo from './src/containers/TestCenterInfo/TestCenterInfo';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
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
          {
            IS_VERIFIER_APP ?
              <Stack.Navigator>
                {/* verifier app screens goes here */}
                <Stack.Screen
                  name="SplashScreen"
                  component={Splash}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TestCenterInfo"
                  component={TestCenterInfo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TestCenter"
                  component={TestCenter}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PincodeScreen"
                  component={PinScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="QRScreen"
                  component={QRScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TestInformationScreen"
                  component={TestInformation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TestConductedScreen"
                  component={TestConducted}
                  options={{ headerShown: false }}
                />

              </Stack.Navigator>
              :
              <Stack.Navigator>
                <Stack.Screen
                  name="SplashScreen"
                  component={Splash}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="WelcomeScreen"
                  component={Welcome}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneScreen"
                  component={Phone}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserInfoScreen"
                  component={UserInfo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    title: 'Settings',
                    headerStyle: {
                      backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                  }}
                />
              </Stack.Navigator>
          }
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
