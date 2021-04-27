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
 import {StyleSheet, Text, TextInput, Image} from 'react-native';
 import {Provider} from 'react-redux';
 import {Icon} from 'react-native-elements';
 
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 
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
 const menuIcon = require('../app/src/assets/images/menu-icon.png');
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
           
             <Stack.Screen
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
 
             <Stack.Screen
               name="MainScreen"
               component={MainScreen}
               options={{
                 title: '',
                 headerStyle: {
                   backgroundColor: 'white',
                 },
                 headerTintColor: 'black',
                 headerLeft: () => <Image source={menuIcon} style={{marginLeft:25}} />,
               }}
             />
             <Stack.Screen
               name="UpdateSettingScreen"
               component={UpdateSettings}
               options={{headerShown: false}}
             />



<Stack.Screen

name="Make an Appointment"
component={Appointment}
options={{
  title: 'Make an Appointment',
  headerTitleAlign: 'center',

  headerStyle: {
    backgroundColor: 'white',
  },


}} />
<Stack.Screen

name="AppointmentCalender"
component={AppointmentCalender}
options={{
  title: 'Make an Appointment',
  headerTitleAlign: 'center',

  headerStyle: {
    backgroundColor: 'white',
  },


}} />

<Stack.Screen

name="testCenter"
component={TestCenter}
options={{
  title: 'Select Test Center',
  headerTitleAlign: 'center',

  headerStyle: {
    backgroundColor: 'white',
  },


}} />
<Stack.Screen

name="appointmentSlot"
component={AppointmentTimeSlot}
options={{
  title: 'Make an Appointment',
  headerTitleAlign: 'center',

  headerStyle: {
    backgroundColor: 'white',
  },


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