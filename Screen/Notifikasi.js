import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Notifikasi = ({navigation: {goBack}}) => {
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
          Notifikasi
        </Text>
      </View>
      <View>
        <FlatList
          data={Array}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: '#000000',
                  paddingHorizontal: 16,
                  paddingTop: 24,
                  flexDirection: 'row',
                  marginBottom: 8,
                }}>
                <View style={{width: '20%'}}>
                  <Image
                    source={require('../src/Doni.png')}
                    style={{width: 48, height: 48}}
                  />
                </View>
                <View style={{marginBottom: 30}}>
                  <Text style={[styles.heading14, {width: 267}]}>
                    <Text style={styles.heading28}>Budi Hartono Jaya </Text>
                    <Text>ingin bergabung ke room meetup </Text>
                    <Text style={styles.heading28}>
                      Main Futsal Bareng Yuk..
                    </Text>
                  </Text>
                  <Text style={[styles.small12, {marginTop: 8}]}>
                    Hari ini, 07:56 AM
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 8}}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 16,
                        backgroundColor: '#C4F601',
                        width: 120,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={[styles.heading28, {color: '#000'}]}>
                        Setuju
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 16,
                        borderColor: '#C4F601',
                        borderWidth: 1,
                        width: 120,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 24,
                      }}>
                      <Text style={[styles.heading28, {color: '#C4f601'}]}>
                        Tolak
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: '#000000',
                  paddingHorizontal: 16,
                  paddingTop: 24,
                  flexDirection: 'row',
                  marginBottom: 8,
                }}>
                <View style={{width: '20%'}}>
                  <Image
                    source={require('../src/Doni.png')}
                    style={{width: 48, height: 48}}
                  />
                </View>
                <View style={{marginBottom: 30}}>
                  <Text style={[styles.heading14, {width: 267}]}>
                    <Text style={styles.heading28}>Budi Hartono Jaya </Text>
                    <Text>ingin bergabung ke room meetup </Text>
                    <Text style={styles.heading28}>
                      Main Futsal Bareng Yuk..
                    </Text>
                  </Text>
                  <Text style={[styles.small12, {marginTop: 8}]}>
                    Hari ini, 07:56 AM
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 8}}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 16,
                        backgroundColor: '#C4F601',
                        width: 120,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={[styles.heading28, {color: '#000'}]}>
                        Setuju
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 16,
                        borderColor: '#C4F601',
                        borderWidth: 1,
                        width: 120,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 24,
                      }}>
                      <Text style={[styles.heading28, {color: '#C4f601'}]}>
                        Tolak
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
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
  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  heading28: {
    fontSize: 14,
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
});

//make this component available to the app
export default Notifikasi;
