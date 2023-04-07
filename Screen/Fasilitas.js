import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

function Fasilitas({navigation: {navigate, goBack}}) {
  const [selected, setSelected] = useState({
    image: require('../src/Price.png'),
    title: 'Harga Terendah',
  });

  const arrfilter = [
    {
      image: require('../src/Price.png'),
      title: 'Harga Terendah',
    },
    {
      image: require('../src/Clock.png'),
      title: 'Buka Sekarang',
    },
  ];
  const handleSelectedFilter = item => {
    setSelected(item);
  };

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
          List Fasilitas
        </Text>
      </View>
      <View style={{paddingHorizontal: 16, paddingTop: 24}}>
        <Text style={styles.Heading28}>Temukan yang cocok</Text>
        <Text style={styles.heading14}>
          Mudah mencari dengan mengurutkan langsung
        </Text>
        <ScrollView
          horizontal={true}
          style={{flexDirection: 'row', marginTop: 16}}>
          {arrfilter.map((item, idx) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor:
                  selected?.title === item.title ? '#C4F601' : '#000000',
                height: 40,
                width: 143,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor:
                  selected?.title === item.title ? '#000000' : '#C4f601',
                borderRadius: 8,
                marginRight: 8,
              }}
              onPress={() => handleSelectedFilter(item)}>
              <Image
                source={item.image}
                style={{width: 20, height: 20, marginRight: 11}}
              />
              <Text
                style={{
                  fontFamily: 'OpenSans',
                  fontWeight: '700',
                  fontSize: 14,
                  color: selected.title === item.title ? '#000000' : '#C4f601',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{marginTop: 40, marginHorizontal: 16}}>
        <FlatList
          data={Array}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigate('DetailFasilitasPage')}
              style={{
                backgroundColor: '#161616',
                paddingLeft: 24,
                paddingVertical: 16,
                borderRadius: 8,
              }}>
              <Text style={styles.Heading28}>Antoni Futsal</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#C4F601',
                    fontWeight: '700',
                    fontSize: 14,
                    marginVertical: 8,
                  }}>
                  Mulai dari Rp. 60.000
                </Text>
              </View>
              <Text style={[styles.heading14, {marginBottom: 8, fontSize: 14}]}>
                Jl.Sutomo No.55B , Medan Tembung
              </Text>
              <Text
                style={[styles.heading14, {marginBottom: 15, fontSize: 14}]}>
                Buka - Tutup 11.00 PM
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default Fasilitas;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  badge: {
    backgroundColor: '#161616',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingBottom: 28,
    paddingTop: 27,
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
  },
  heading14: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 5,
  },
  capsules: {},
});
