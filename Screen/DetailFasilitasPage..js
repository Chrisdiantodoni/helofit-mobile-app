import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Onboarding from '../components/Onboarding';

const DetailFasilitasPage = ({navigation: {navigate, goBack}}) => {
  const [selected, setSelected] = useState({
    id: 1,
    kategori: 'badminton',
  });

  const arrayFacility = [
    {
      id: 1,
      kategori: 'badminton',
    },
    {
      id: 2,
      kategori: 'Futsal',
    },
  ];

  const handleSelectedFacility = item => {
    setSelected(item);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer2}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            source={require('../src/X.png')}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              top: 50,
            }}
          />
        </TouchableOpacity>
        <View style={{marginTop: 95}}>
          <Text style={styles.heading28}>
            Gelanggang Olahraga Ahmad Yani Nasution
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: '#C4F601',
                fontWeight: '700',
                fontSize: 16,
                marginVertical: 8,
              }}>
              Mulai dari
            </Text>
            <Text
              style={{
                color: '#C4F601',
                marginLeft: 5,
                marginVertical: 2,
                fontSize: 16,
                fontWeight: '700',
              }}>
              Rp. 100.000
            </Text>
          </View>
          <Text style={[styles.heading14, {fontSize: 14, fontWeight: '400'}]}>
            Badminton, futsal
          </Text>
          <View style={{flexDirection: 'row', paddingBottom: 4, marginTop: 8}}>
            <View
              style={{
                width: '10%',
                alignItems: 'center',
              }}>
              <Ionicon
                name="location-outline"
                size={20}
                style={{fontWeight: 'bold', color: '#ffffff'}}
              />
            </View>
            <View style={{width: '85%'}}>
              <Text style={styles.heading14}>
                Jl.M.H Yamin SH No.123, Medan Perjuangan, Sumatera Utara 202332
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{height: 220}}>
        <Onboarding />
      </View>
      {/* <View style={[styles.subContainer3, {marginHorizontal: 0}]}>
      </View> */}

      <View
        style={[
          styles.subContainer3,
          {display: 'flex', flexDirection: 'column'},
        ]}>
        <ScrollView horizontal={true}>
          <View style={{flexDirection: 'row'}}>
            {arrayFacility.map((item, idx) => {
              return (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor:
                      selected?.kategori === item.kategori
                        ? '#C4f601'
                        : '#000000',
                    borderColor:
                      selected?.kategori === item.kategori
                        ? '#000000'
                        : '#C4f601',
                    marginRight: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 17,
                    paddingVertical: 8,
                  }}
                  onPress={() => handleSelectedFacility(item)}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        selected?.kategori === item.kategori
                          ? '#000000'
                          : '#C4f601',
                      fontWeight: '700',
                      fontFamily: 'OpenSans',
                    }}>
                    {item.kategori}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={{marginTop: 24}}>
          <TouchableOpacity
            style={{marginBottom: 15}}
            onPress={() => navigate('BuatRoom')}>
            <Image
              source={require('../src/fasilitas-badminton-2.png')}
              style={{width: 346, borderRadius: 8, height: 89.18}}
            />
            <View
              style={{
                position: 'absolute',
                top: 16,
                left: 28,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '80%'}}>
                <Text style={[styles.heading28, {fontSize: 14}]}>
                  Lapangan Badminton 2
                </Text>
                <Text style={[styles.heading28, {fontSize: 14}]}>
                  Rp. 100.000
                  <Text style={[styles.heading14, {fontWeight: '400'}]}>
                    {' '}
                    / Jam
                  </Text>
                </Text>
              </View>
              <View>
                <Ionicon
                  name="chevron-forward-outline"
                  size={25}
                  style={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                    paddingRight: 2,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../src/fasilitas-badminton-2.png')}
              style={{width: 346, borderRadius: 8, height: 89.18}}
            />
            <View
              style={{
                position: 'absolute',
                top: 16,
                left: 28,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '80%'}}>
                <Text style={[styles.heading28, {fontSize: 14}]}>
                  Lapangan Badminton 1
                </Text>
                <Text style={[styles.heading28, {fontSize: 14}]}>
                  Rp. 100.000
                  <Text style={[styles.heading14, {fontWeight: '400'}]}>
                    {' '}
                    / Jam
                  </Text>
                </Text>
              </View>
              <View>
                <Ionicon
                  name="chevron-forward-outline"
                  size={25}
                  style={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                    paddingRight: 2,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subContainer3}>
        <Text style={[styles.heading28, {fontSize: 20, marginBottom: 16}]}>
          Prasarana yang tersedia
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
          }}>
          <Ionicon
            name="shirt-outline"
            size={20}
            style={{color: '#ffffff', marginRight: 10}}
          />
          <Text style={[styles.heading14, {fontSize: 14, fontWeight: '400'}]}>
            Sewa Peralatan Olahraga
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
          }}>
          <Ionicon
            name="fast-food-outline"
            size={20}
            style={{color: '#ffffff', marginRight: 10}}
          />
          <Text style={[styles.heading14, {fontSize: 14, fontWeight: '400'}]}>
            Makanan dan Minuman
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
          }}>
          <Ionicon
            name="woman-outline"
            size={20}
            style={{color: '#ffffff', marginRight: 10}}
          />
          <Text style={[styles.heading14, {fontSize: 14, fontWeight: '400'}]}>
            Tempat Beribadah
          </Text>
        </View>
      </View>
      <View style={styles.subContainer3}>
        <Text style={[styles.heading28, {fontSize: 14}]}>Deskripsi</Text>
        <Text
          style={[
            styles.heading14,
            {fontSize: 14, fontWeight: '400', marginTop: 16},
          ]}>
          Yuk Main bersama di gor ini Pelanggan Fasilitas Olahraga yang
          terhormat Sebelum melakukan Reservasi baca ketentuan kami sebagai
          berikut: Wajib menggunakan sepatu ketika menggunakan fasilitas tidak
          membawa minuman keras dan obatan terlarang ..see more
        </Text>
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
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  subContainer2: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#000000',
    paddingBottom: 23.5,
  },
  subContainer3: {
    marginTop: 8,
    paddingTop: 16,
    borderRadius: 16,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
    lineHeight: 27,
  },
  heading14: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: 'OpenSans',
  },
  capsules: {},
});

//make this component available to the app
export default DetailFasilitasPage;
