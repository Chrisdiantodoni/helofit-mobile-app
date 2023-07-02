import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SyaratKetentuan = ({navigation: {goBack}}) => {
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
          Syarat dan Ketentuan
        </Text>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Text style={[styles.heading14, {fontSize: 20, fontWeight: '700'}]}>
          Syarat & Ketentuan
        </Text>
        <Text style={styles.heading14}>
          Ini merupakan contoh teks demo syarat ketentuan harus selalu disertai
          dengan disclaimer. Disclaimer berfungsi sebagai pernyataan yang
          menyatakan bahwa Anda tidak bertanggung jawab secara hukum atas
          kesalahan informasi pada konten.
        </Text>
        <Text style={styles.heading14}>
          Anda juga perlu mencantumkan informasi hak cipta ketentuan penagihan,
          jaminan, dan peraturan yang harus ditaati oleh setiap orang yang
          menggunakan website atau aplikasi Anda.
        </Text>
        <Text style={styles.heading14}>
          Anda juga perlu mencantumkan informasi hak cipta ketentuan penagihan,
          jaminan, dan peraturan yang harus ditaati oleh setiap orang yang
          menggunakan website atau aplikasi Anda. Membuat syarat dan ketentuan
          juga merupakan langkah penting untuk melindungi kekayaan intelektual
          Anda, yang mencakup logo, desain website atau aplikasi mobile, serta
          konten-konten di dalamnya (kecuali jika konten tersebut ditulis oleh
          user).
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
    paddingTop: 16,
  },
});

//make this component available to the app
export default SyaratKetentuan;
