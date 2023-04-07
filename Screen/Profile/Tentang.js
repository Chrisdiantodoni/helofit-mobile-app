import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Tentang = ({navigation: {goBack}}) => {
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
          Tentang Helofit
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', marginTop: 56}}>
        <Image
          source={require('../../src/helofitlogo-1.png')}
          style={{height: 60, width: 240}}
        />
        <Text style={styles.heading14}>
          Helofit adalah aplikasi olahraga berbasis website dan mobile dengan
          beberapa fitur seperti meetup, reservasi fasilitas dan pengerjaan task
          olahraga. Dibuat oleh Zulharmin dan Doni Chrisdianto sebagai standar
          ketuntasan minimal atas pengerjaan tugas akhir.
        </Text>
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
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 40,
    textAlign: 'center',
    paddingHorizontal: 23,
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
    textAlign: 'center',
  },
});

//make this component available to the app
export default Tentang;
