/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button } from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/commons/RootSaga';
import createRootReducer from './src/commons/RootReducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements'

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Welcome from './src/containers/Welcome/Welcome';
import Splash from './src/containers/Splash/Splash';
import Phone from './src/containers/Phone/Phone';
import UserInfo from './src/containers/UserInfo/UserInfo';
import MainScreen from './src/containers/MainScreen/MainScreen';

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
          <Stack.Navigator>
            {/* <Stack.Screen
              name="SplashScreen"
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
            />
            <Stack.Screen
              name="UserInfoScreen"
              component={UserInfo}
              options={{headerShown: false}}
            /> */}

            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{
                title: 'MainScreen',
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: 'black',
                headerLeft: () => (

                  <Icon
                    name='rowing'
                    size={35} />

                ),

              }} />


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
