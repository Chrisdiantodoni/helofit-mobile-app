import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {currency} from '../utils';

function Profile({navigation: {goBack, navigate, popToTop}}) {
  const [dataUser, setDataUser] = useState({});

  const handleLogout = () => {
    const removeToken = AsyncStorage.removeItem('token');
    BackHandler.exitApp();
    return removeToken;
  };
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      if (res) {
        setDataUser(JSON.parse(res));
        console.log(dataUser);
      }
    });
  };

  useEffect(() => {
    dataUserAsync();
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#161616', flex: 1}}>
      <View
        style={{
          backgroundColor: '#C4F601',
          flexDirection: 'row',
          height: 70,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 24, marginRight: 32}}
          onPress={() => goBack()}>
          <Ionicon
            name="chevron-back-outline"
            size={25}
            style={{
              fontWeight: 'bold',
              color: '#000000',
              paddingRight: 2,
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.header, {color: '#000000', fontSize: 20}]}>
          Profil Akun
        </Text>
      </View>
      <View style={styles.Profile}>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../src/Doni.png')}
            style={{width: 48, height: 48}}
          />
        </View>
        <View style={{justifyContent: 'center', marginLeft: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.header, {width: '55%'}]}>
              Doni Chrisdianto
            </Text>
            <TouchableOpacity onPress={() => navigate('ProfilSaya')}>
              <Text
                style={[
                  styles.heading14,
                  {color: '#C4F601', fontSize: 14, paddingHorizontal: 32},
                ]}>
                Lihat Profil
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.heading14}>Laki-laki</Text>
          <Text style={[styles.heading14, {fontSize: 14}]}>08887766768</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            marginTop: 8,
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('Dompet')}>
          <Image
            source={require('../src/Dompet.png')}
            style={{
              height: 16,
              width: 18,
              marginRight: 20,
              marginTop: 5,
            }}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '55%'}]}>
            Dompet Olahragamu
          </Text>
          <Text
            style={[
              styles.heading14,
              {fontSize: 14, color: '#C4F601', width: '20%'},
            ]}>
            Rp. {dataUser?.balance}
          </Text>
          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View
          style={{backgroundColor: '#161616', width: 343, height: 2}}></View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('FollowMeetup')}>
          <Image
            source={require('../src/Group.png')}
            style={{height: 24, width: 24, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '75%'}]}>
            Meetup yang akan berlangsung
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('Tabs', {screen: 'Task'})}>
          <Image
            source={require('../src/Reward.png')}
            style={{height: 24, width: 24, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '55%'}]}>
            Poin kamu saat ini
          </Text>
          <Text
            style={[
              styles.heading14,
              {fontSize: 14, color: '#C4F601', width: '20%'},
            ]}>
            {dataUser?.point}
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('PromoList')}>
          <Image
            source={require('../src/Promo.png')}
            style={{height: 14, width: 18, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '75%'}]}>
            Promo yang sudah ditukarkan
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('Bantuan')}>
          <Image
            source={require('../src/Headphone.png')}
            style={{height: 24, width: 24, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '75%'}]}>
            Bantuan
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('Tentang')}>
          <Image
            source={require('../src/Love.png')}
            style={{height: 13, width: 15, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '75%'}]}>
            Tentang Helofit
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={() => navigate('SyaratKetentuan')}>
          <Image
            source={require('../src/Ketentuan.png')}
            style={{height: 24, width: 24, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '75%'}]}>
            Syarat Ketentuan
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            flexDirection: 'row',
            paddingLeft: 16,
            paddingVertical: 24,
            borderRadius: 16,
          }}
          onPress={handleLogout}>
          <Image
            source={require('../src/Exit.png')}
            style={{height: 24, width: 24, marginRight: 20}}
          />
          <Text style={[styles.heading14, {fontSize: 14, width: '75%'}]}>
            Keluar
          </Text>

          <TouchableOpacity>
            <Ionicon
              name="chevron-forward-outline"
              size={25}
              style={{
                fontWeight: 'bold',
                color: '#FFF',
                paddingRight: 2,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#161616',
              width: '80%',
              height: 2,
            }}></View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  Profile: {
    backgroundColor: '#000000',
    height: 112,
    paddingLeft: 16,
    borderRadius: 16,
    flexDirection: 'row',
  },
  heading14: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 5,
  },
});
