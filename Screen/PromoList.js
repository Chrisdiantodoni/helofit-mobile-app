//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

// create a component
const PromoList = ({navigation: {navigate, goBack}}) => {
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
          Promo yang bisa digunakan
        </Text>
      </View>
      <View
        style={{
          paddingTop: 32,
          marginHorizontal: 16,
        }}>
        <Text style={styles.Heading28}>Daftar Promo Kamu</Text>
        <Text style={[styles.heading14, {paddingTop: 8}]}>
          Gunakan Promo yang telah kamu tukar dengan poin yang kamu miliki ya
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../src/BannerGym.png')}
            style={{width: 343, height: 160, borderRadius: 16, marginTop: 32}}
          />
          <Image
            source={require('../src/BannerGym.png')}
            style={{width: 343, height: 160, borderRadius: 16, marginTop: 32}}
          />
        </View>

        <Image />
      </View>
    </ScrollView>
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
});

//make this component available to the app
export default PromoList;
