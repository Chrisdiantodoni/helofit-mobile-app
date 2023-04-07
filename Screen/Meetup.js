import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

function Meetup({navigation: {navigate, goBack}}) {
  return (
    <View style={{backgroundColor: '#161616', flex: 1}}>
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
          List Meetup
        </Text>
      </View>
      <View style={{backgroundColor: '#161616'}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Belum ketemu yang pas?</Text>
            <Text style={styles.subheader}>
              Tentukan sendiri lokasi dan waktu meetup yang kamu inginkan, jadi
              Host sekarang juga
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate('PilihKategori')}
            style={[
              styles.button,
              {
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.header, {color: 'black', fontSize: 16}]}>
              Buat Room Meetup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={Array}
        renderItem={({item}) => (
          <View style={styles.listContainer}>
            <Text style={[styles.header, {marginTop: 24}]}>
              Main dengan teman baru
            </Text>
            <Text style={styles.subheader}>
              Temukan orang yang sehobi dengan kamu dan buat jaringan komunitas
              lebih luas
            </Text>
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
                  left: 290,
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
                  style={{
                    fontSize: 12,
                    color: '#000000',
                    fontWeight: '400',
                  }}>
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
                  marginBottom: 10,
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
                  left: 290,
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
                  style={{
                    fontSize: 12,
                    color: '#000000',
                    fontWeight: '400',
                  }}>
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
                  marginBottom: 10,
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
            <TouchableOpacity
              style={styles.View}
              onPress={() => navigation.navigate('DetailMeetupPage')}>
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
                  left: 290,
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
                  style={{
                    fontSize: 12,
                    color: '#000000',
                    fontWeight: '400',
                  }}>
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
                  marginBottom: 10,
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  headerContainer: {
    marginTop: 24,
  },
  subheader: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: 'white',
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#C4F601',
    borderRadius: 16,
  },
  View: {
    backgroundColor: '#161616',
    borderRadius: 10,
    marginVertical: 16,
  },
  listContainer: {
    borderRadius: 16,
    marginTop: 24,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default Meetup;
