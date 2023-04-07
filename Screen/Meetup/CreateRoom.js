//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CreateRoom = ({navigation: {goBack, navigate}}) => {
  const [totalPlayer, setTotalPlayer] = useState(1);
  const [isGrow, setIsGrow] = useState(0);
  const [deskripsi, setDeskripsi] = useState('');

  const handleTotalPlayer = type => {
    switch (type) {
      case 'minus':
        setTotalPlayer(totalPlayer === 1 ? 1 : totalPlayer - 1);
        break;
      case 'plus':
        setTotalPlayer(totalPlayer + 1);
        break;
      default:
        break;
    }
  };

  const age = [
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  ];
  return (
    <ScrollView style={styles.container}>
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
          Buat Room Meetup
        </Text>
      </View>
      <View>
        <Image
          source={require('../../src/BadmintonGambar.png')}
          style={{width: '100%', height: 188}}
        />
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#000000',
            paddingBottom: 22,
            paddingTop: 19,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginVertical: 8,
            }}>
            <Ionicon
              name="location-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <View>
              <Text style={styles.heading28}>Bilal GOR Badminton, Tembung</Text>
              <Text style={styles.heading28}>Badminton</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Ionicon
              name="time-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <Text style={styles.heading28}>Sabtu, 25 Nov 08.00-12.00 AM</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Ionicon
              name="pricetag-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <Text style={styles.heading28}>Rp.240.000</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={[styles.heading28, {fontSize: 20}]}>
            Judul Room Meetup
          </Text>

          <TextInput
            placeholder="Masukkan Judul Meetup"
            style={{
              borderRadius: 16,
              borderTopStartRadius: 16,
              borderTopEndRadius: 16,
              justifyContent: 'center',
              height: 60,
              marginTop: 19,
              backgroundColor: '#7C7C7C',
              color: '#ffffff',
            }}
            placeholderTextColor="#FFFFFF"
          />
          <View style={{marginTop: 32}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Jenis Kelamin
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox />
              <Text style={[styles.heading14, {marginLeft: 18}]}>
                Laki-laki
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox />
              <Text style={[styles.heading14, {marginLeft: 18}]}>
                Perempuan
              </Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Hanya dengan Umur
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <Text style={[styles.heading28, {fontSize: 16, width: '20%'}]}>
                Mulai
              </Text>
              <TextInput
                style={{
                  borderRadius: 16,
                  borderTopStartRadius: 16,
                  borderTopEndRadius: 16,
                  justifyContent: 'center',
                  height: 60,
                  marginLeft: 30,
                  backgroundColor: '#7C7C7C',
                  color: '#ffffff',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <Text style={[styles.heading28, {fontSize: 16, width: '20%'}]}>
                Sampai
              </Text>
              <TextInput
                style={{
                  borderRadius: 16,
                  borderTopStartRadius: 16,
                  borderTopEndRadius: 16,
                  justifyContent: 'center',
                  height: 60,
                  marginLeft: 30,
                  backgroundColor: '#7C7C7C',
                  color: '#ffffff',
                }}
              />

              {/* <Dropdown dropdownPosition={true} data={age} /> */}
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Jumlah Pemain Meetup
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <TouchableOpacity onPress={() => handleTotalPlayer('minus')}>
                <Image
                  source={require('../../src/MinusWhite.png')}
                  style={{
                    height: 32,
                    width: 32,
                    marginRight: 30,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.heading14}>{totalPlayer}</Text>
              <TouchableOpacity onPress={() => handleTotalPlayer('plus')}>
                <Image
                  source={require('../../src/PlusWhite.png')}
                  style={{height: 32, width: 32, marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 38}}>
            <Text style={styles.heading28}>Deskripsi</Text>
            <TextInput
              placeholder="Masukkan deskripsi"
              placeholderTextColor={'#FFFFFF'}
              editable
              value={deskripsi}
              multiline={true}
              onChangeText={text => {
                setDeskripsi(text);
              }}
              onContentSizeChange={() => {
                setIsGrow({height: isGrow});
              }}
              style={{
                borderRadius: 16,
                borderTopStartRadius: 16,
                borderTopEndRadius: 16,
                marginTop: 19,
                backgroundColor: '#7C7C7C',
                height: Math.max(35, isGrow),
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#000000',
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#C4F601',
                marginHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                height: 38,
              }}
              onPress={() => navigate('Tabs')}>
              <Text style={[styles.heading28, {color: '#000000'}]}>
                Buat Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },

  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  heading28: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
});

//make this component available to the app
export default CreateRoom;
