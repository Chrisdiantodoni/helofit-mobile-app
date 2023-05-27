import React, {Component, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Welcome from './Screen/Welcome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Signup from './Screen/Signup';
import Signin from './Screen/Signin';
import ForgetPassword from './Screen/ForgetPassword';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Meetup from './Screen/Meetup';
import Promo from './Screen/Promo';
import Task from './Screen/Task';
import Fasilitas from './Screen/Fasilitas';
import DetailMeetupPage from './Screen/DetailMeetupPage';
import Profile from './Screen/Profile';
import Tentang from './Screen/Profile/Tentang';
import Bantuan from './Screen/Profile/Bantuan';
import SyaratKetentuan from './Screen/Profile/SyaratKetentuan';
import ProfilSaya from './Screen/Profile/ProfilSaya';
import Notifikasi from './Screen/Notifikasi';
import PilihKategori from './Screen/Meetup/PilihKategori';
import {Ionicon} from 'react-native-vector-icons/Ionicons';
import BuatRoom from './Screen/Meetup/BuatRoom';
import Dompet from './Screen/Dompet';
import CreateRoom from './Screen/Meetup/CreateRoom';
import DetailTask from './Screen/Task/DetailTask';
import DetailFasilitasPage from './Screen/DetailFasilitasPage.';
import Pin from './Screen/Pin';
import FollowMeetup from './Screen/FollowMeetup';
import PromoList from './Screen/PromoList';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from './Screen/SplashScreen';
import ContextProvider, {Context} from './context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const {dispatch} = useContext(Context);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#C4F601',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#000000',
          alignItems: 'center',
          height: 70,
          paddingBottom: 12,
          paddingTop: 12,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('./src/Home.png')}
                style={{width: 21, height: 21, tintColor: color}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="List Meetup"
        component={Meetup}
        options={{
          headerStyle: {
            backgroundColor: '#C4F601',
          },
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerShown: false,
          tabBarLabel: 'Meetup',
          tabBarIcon: ({color, size}) => (
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('./src/Group.png')}
                style={{width: 32, height: 32, tintColor: color}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={Task}
        options={{
          headerShown: false,
          tabBarLabel: 'Task',
          tabBarIcon: ({color, size}) => (
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('./src/Task.png')}
                style={{width: 32, height: 32, tintColor: color}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Promo"
        component={Promo}
        options={{
          headerShown: false,
          tabBarLabel: 'Promo',
          tabBarIcon: ({color, size}) => (
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('./src/Promo.png')}
                style={{width: 24, height: 20, tintColor: color}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PilihKategori"
        component={PilihKategori}
        listeners={{
          tabPress: e => {
            dispatch({
              type: 'type_create_room',
              payload: '',
            });
          },
        }}
        options={{
          headerShown: false,
          tabBarLabel: 'Fasilitas',
          tabBarIcon: ({color, size}) => (
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('./src/Fasilitas.png')}
                style={{width: 24, height: 19, tintColor: color}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tentang"
            component={Tentang}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SyaratKetentuan"
            component={SyaratKetentuan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bantuan"
            component={Bantuan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfilSaya"
            component={ProfilSaya}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notifikasi"
            component={Notifikasi}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PilihKategori"
            component={PilihKategori}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BuatRoom"
            component={BuatRoom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dompet"
            component={Dompet}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateRoom"
            component={CreateRoom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailTask"
            component={DetailTask}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailMeetupPage"
            component={DetailMeetupPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailFasilitasPage"
            component={DetailFasilitasPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pin"
            component={Pin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Fasilitas"
            component={Fasilitas}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="FollowMeetup"
            component={FollowMeetup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PromoList"
            component={PromoList}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
