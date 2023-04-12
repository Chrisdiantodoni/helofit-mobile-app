//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

// create a component
const PilihKategori = ({navigation: {goBack, navigate}}) => {
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
          Pilih Kategori
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 24,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}
            onPress={() => navigate('Fasilitas')}>
            <Image
              source={require('../../src/Football.png')}
              style={{
                width: 78,
                height: 78,
                position: 'absolute',
                top: 20,
                left: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Futsal
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Badminton1.png')}
              style={{
                width: 78,
                height: 78,
                position: 'absolute',
                top: 20,
                left: 10,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Badminton
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Basketball.png')}
              style={{
                width: 82,
                height: 78,
                position: 'absolute',
                top: 20,
                right: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Basket
          </Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 32,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Yoga.png')}
              style={{
                width: 93,
                height: 63,
                position: 'absolute',
                top: 40,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Yoga
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Gymming.png')}
              style={{
                width: 84,
                height: 63,
                position: 'absolute',
                top: 40,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Fitness
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Boxing.png')}
              style={{
                width: 92,
                height: 89,
                position: 'absolute',
                top: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Boxing
          </Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 32,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Bowling.png')}
              style={{
                width: 81,
                height: 90,
                position: 'absolute',
                top: 10,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Bowling
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Tennis.png')}
              style={{
                width: 97,
                height: 89,
                position: 'absolute',
                top: 20,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Tennis
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              backgroundColor: '#C4F601',
            }}>
            <Image
              source={require('../../src/Hockey.png')}
              style={{
                width: 76,
                height: 99,
                position: 'absolute',
                top: 5,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFF',
              marginTop: 15,
              fontWeight: '700',
              textAlign: 'center',
              fontFamily: 'openSans',
            }}>
            Golf
          </Text>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
});

//make this component available to the app
export default PilihKategori;
