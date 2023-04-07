import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Bantuan = ({navigation: {goBack}}) => {
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
          Bantuan
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
        }}>
        <Image
          source={require('../../src/Admin.png')}
          style={{width: 264, height: 132, marginTop: 32}}
        />
        <Text style={styles.heading28}>Admin Kami siap membantu Anda</Text>
        <Text style={styles.heading14}>
          Pilih cara dibawah ini untuk menghubungi admin kami terkait kendalan
          yang anda rasakan
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#C4F601',
            flexDirection: 'row',
            borderRadius: 16,
            alignItems: 'center',
            width: '100%',
            height: '13%',
            marginTop: 32,
            marginBottom: 24,
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              paddingVertical: 20,
              fontWeight: '700',
              paddingRight: 30,
              paddingLeft: 23,
              width: '85%',
            }}>
            Hubungi kami via Admin Whatsapp
          </Text>
          <Image
            source={require('../../src/Telepon.png')}
            style={{width: 20, height: 25}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            borderColor: '#C4F601',
            borderWidth: 2,
            flexDirection: 'row',
            borderRadius: 16,
            alignItems: 'center',
            width: '100%',
            height: '13%',
          }}>
          <Text
            style={{
              color: '#C4f601',
              fontSize: 14,
              paddingVertical: 20,
              fontWeight: '700',
              paddingRight: 30,
              paddingLeft: 23,
              width: '85%',
            }}>
            Hubungi kami via Email
          </Text>
          <Image
            source={require('../../src/Mail.png')}
            style={{width: 24, height: 18}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 8,
    textAlign: 'center',
    paddingHorizontal: 23,
  },
  heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
    paddingTop: 40,
    textAlign: 'center',
  },
});

//make this component available to the app
export default Bantuan;
