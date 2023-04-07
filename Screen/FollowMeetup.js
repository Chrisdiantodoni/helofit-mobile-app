//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

// create a component
const FollowMeetup = () => {
  return (
    <View style={styles.container}>
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
          List meetup yang diikuti
        </Text>
      </View>
      <View style={{paddingTop: 32, marginHorizontal: 16}}>
        <Text style={styles.Heading28}>Daftar Meetup Kamu</Text>
        <Text style={[styles.heading14, {paddingTop: 8}]}>
          Jangan lupa terus pantau room meetup yang sudah ada kamu didalamnya ya
        </Text>
        <TouchableOpacity
          style={styles.View}
          onPress={() => navigate('DetailMeetupPage')}>
          <Image
            source={require('../src/Badminton.png')}
            style={{
              width: '100%',
              height: 148,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: 110,
              left: 280,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              backgroundColor: '#C4F601',
              width: 55,
              height: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Ionicon
              name="people-outline"
              size={15}
              style={{
                fontWeight: 'bold',
                color: '#000000',
                paddingRight: 2,
              }}
            />
            <Text style={{fontSize: 12, color: '#000000', fontWeight: '400'}}>
              7/10
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 15,
              marginTop: 8,
              color: '#C4F601',
              fontWeight: '700',
              fontFamily: 'OpenSans',
              marginBottom: 8,
            }}>
            Ayo main badminton bareng
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginVertical: 8,
              alignItems: 'center',
            }}>
            <Ionicon
              name="location-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff'}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
                color: '#ffffff',
                fontFamily: 'OpenSans',
              }}>
              Bilal GOR Badminton, Tembung
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <Ionicon
              name="time-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff'}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
                fontFamily: 'OpenSans',
                color: '#ffffff',
              }}>
              Sabtu, 25 Nov 08.00-12.00 AM
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.View}
          onPress={() => navigate('DetailMeetupPage')}>
          <Image
            source={require('../src/Badminton.png')}
            style={{
              width: '100%',
              height: 148,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: 110,
              left: 280,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              backgroundColor: '#C4F601',
              width: 55,
              height: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Ionicon
              name="people-outline"
              size={15}
              style={{
                fontWeight: 'bold',
                color: '#000000',
                paddingRight: 2,
              }}
            />
            <Text style={{fontSize: 12, color: '#000000', fontWeight: '400'}}>
              7/10
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 15,
              marginTop: 8,
              color: '#C4F601',
              fontWeight: '700',
              fontFamily: 'OpenSans',
              marginBottom: 8,
            }}>
            Ayo main badminton bareng
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginVertical: 8,
              alignItems: 'center',
            }}>
            <Ionicon
              name="location-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff'}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
                color: '#ffffff',
                fontFamily: 'OpenSans',
              }}>
              Bilal GOR Badminton, Tembung
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <Ionicon
              name="time-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff'}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
                fontFamily: 'OpenSans',
                color: '#ffffff',
              }}>
              Sabtu, 25 Nov 08.00-12.00 AM
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
  },
  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 5,
  },
  View: {
    backgroundColor: '#161616',
    borderRadius: 10,
    marginTop: 24,
  },
});

//make this component available to the app
export default FollowMeetup;
