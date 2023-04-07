import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Fontisto';

// create a component
const Pencarian = ({navigation: {goBack, navigate}}) => {
  const [selected, setSelected] = useState({});

  const arrayKategori = [
    {
      id: 1,
      Kategori: 'Meetup',
      image: require('../src/Group.png'),
    },
    {
      id: 2,
      Kategori: 'Promo',
      image: require('../src/Promo.png'),
    },
    {
      id: 3,
      Kategori: 'Task',
      image: require('../src/Task.png'),
    },
  ];

  const handleSelectedKategori = item => {
    console.log(item);
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
          Pencarian
        </Text>
      </View>
      <View>
        <View style={{backgroundColor: '#000000', marginBottom: 8}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#7C7C7C',
              marginTop: 24,
              borderRadius: 16,
              height: 60,
              marginHorizontal: 16,
              marginBottom: 28,
            }}>
            <View style={{marginLeft: 23, marginRight: 15}}>
              <Icon style={{color: '#ffffff', fontSize: 18}} name="search" />
            </View>
            <TextInput
              placeholderTextColor={'#ffffff'}
              placeholder="Cari meetup, task & fasilitas"
              style={styles.TextInput}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#000000',
            paddingHorizontal: 16,
            borderRadius: 16,
            paddingTop: 16,
            paddingBottom: 32,
            marginBottom: 8,
          }}>
          <Text style={styles.heading28}>Terakhir dicari</Text>
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              display: 'flex',
              backgroundColor: '#ffffff',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#161616',
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 9,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#ffffff'}}>
                Futsal Mandala
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#161616',
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 9,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#ffffff'}}>
                Kelas yoga
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#161616',
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 9,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#ffffff'}}>
                tennis
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#161616',
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 9,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#ffffff'}}>
                turnamen
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#000000',
            paddingHorizontal: 16,
            borderRadius: 16,
            paddingTop: 16,
            paddingBottom: 32,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Image
            source={require('../src/Iklan.png')}
            style={{width: 343, height: 160, borderRadius: 16}}
          />
        </View>
        <View
          style={{
            backgroundColor: '#000000',
            paddingHorizontal: 16,
            borderRadius: 16,
            paddingTop: 16,
            paddingBottom: 32,
            marginBottom: 8,
          }}>
          <Text style={styles.heading28}>Berdasarkan Kategori</Text>
          <ScrollView
            horizontal={true}
            style={{flexDirection: 'row', marginTop: 16}}>
            {arrayKategori.map((item, idx) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor:
                        selected?.Kategori === item.Kategori
                          ? '#C4f601'
                          : '#000000',
                      borderColor: '#FFF',
                      borderWidth: 1,
                      height: 37,
                      width: 121,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 16,
                      marginRight: 16,
                    }}
                    onPress={() => handleSelectedKategori(item)}>
                    <Image
                      source={item.image}
                      style={{
                        width: item.Kategori === 'Promo' ? 20 : 32,
                        height: item.Kategori === 'Promo' ? 20 : 32,
                        marginRight: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'OpenSans',
                        fontWeight: '700',
                        fontSize: 14,
                        color: '#FFFFFF',
                      }}>
                      {item.Kategori}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* 
            <TouchableOpacity style={styles.capsules}>
              <Image
                source={require('../src/Task.png')}
                style={{width: 32, height: 32, marginRight: 8}}
              />
              <Text
                style={{
                  fontFamily: 'OpenSans',
                  fontWeight: '700',
                  fontSize: 14,
                  color: '#FFFFFF',
                }}>
                Task
              </Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
        <FlatList
          data={Array}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#000000',
                paddingHorizontal: 16,
                borderRadius: 16,
                paddingTop: 16,
                paddingBottom: 32,
              }}>
              <Text style={styles.heading28}>Rekomendasi untukmu</Text>
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
                  <Text
                    style={{fontSize: 12, color: '#000000', fontWeight: '400'}}>
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
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  TextInput: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: 'white',
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
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  small12: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: '#7C7C7C',
  },
  capsules: {},
  View: {
    backgroundColor: '#161616',
    borderRadius: 10,
    marginVertical: 8,
  },
});

export default Pencarian;
