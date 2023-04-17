//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Axios} from '../../utils';

// create a component
const PilihKategori = ({navigation: {goBack, navigate}}) => {
  const [data, setData] = useState([]);

  const getKategori = async () => {
    try {
      const response = await Axios.get('/category');
      const data = response.data.data.result;
      setData(data || []);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKategori();
  }, []);

  const kategori = [
    'badminton',
    'futsal',
    'basket',
    'yoga',
    'fitness',
    'boxing',
    'bowling',
    'tennis',
    'golf',
  ];

  const displayImages = item => {
    switch (item?.category_name?.toLowerCase()) {
      case 'badminton':
        return require('../../src/Badminton1.png');
      case 'futsal':
        return require('../../src/Football.png');
      case 'basket':
        return require('../../src/Basketball.png');
      case 'yoga':
        return require('../../src/Yoga.png');
      case 'tennis':
        return require('../../src/Tennis.png');
      case 'boxing':
        return require('../../src/Boxing.png');
      case 'fitness':
        return require('../../src/Gymming.png');
      case 'golf':
        return require('../../src/Hockey.png');
      case 'bowling':
        return require('../../src/Bowling.png');
      default:
        return null;
        break;
    }
  };
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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        {data.map((item, idx) => (
          <View
            key={idx}
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
                onPress={() => navigate('Fasilitas', {id: item?.id})}>
                <Image
                  source={displayImages(item)}
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
                {item.category_name}
              </Text>
            </View>
          </View>
        ))}
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
