import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

function Task({navigation: {navigate, goBack}}) {
  return (
    <ScrollView style={{backgroundColor: '#161616', flex: 1}}>
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
          List Task
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Task sedang berjalan</Text>
          <Text style={styles.subheader}>
            Lanjutkan task yang sudah kamu lalui
          </Text>
        </View>
        <ScrollView
          style={{
            marginVertical: 15,
            height: 290,
            borderRadius: 10,
          }}
          horizontal={true}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
          <TouchableOpacity
            style={styles.View}
            onPress={() => navigate('DetailTask')}>
            <Image
              source={require('../src/Fitness.png')}
              style={{width: '100%', height: 148, borderRadius: 10}}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 15,
                marginTop: 8,
                color: '#C4F601',
                fontWeight: '700',
                fontFamily: 'OpenSans',
              }}>
              Bikin otot lengan tambah gede
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginLeft: 15,
                marginTop: 4,
                fontWeight: '400',
                fontFamily: 'OpenSans',
                marginBottom: 24,
                color: '#FFFFFF',
              }}>
              Berakhir dalam 28 hari lagi
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                alignItems: 'center',
              }}>
              <Image
                source={require('../src/Fitness-Icon.png')}
                style={{width: 21, height: 21, tintColor: 'white'}}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 12,
                      color: '#ffffff',
                      fontFamily: 'OpenSans',
                    }}>
                    Gagah Fitness
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 117,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#C4F601',
                        fontSize: 20,
                        fontWeight: '700',
                        fontFamily: 'OpenSans',
                      }}>
                      15
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#C4F601',
                        fontSize: 12,
                        fontWeight: '700',
                        fontFamily: 'OpenSans',
                      }}>
                      POIN
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{marginHorizontal: 16}}>
              <ProgressBar
                style={{borderRadius: 8, marginTop: 10}}
                progress={0.5}
                color={'#C4f601'}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.View}></View>
          <View style={styles.View}></View>
        </ScrollView>
      </View>
      <View
        style={{
          marginTop: 8,
          backgroundColor: '#000000',
          paddingHorizontal: 16,
          borderRadius: 16,
        }}>
        <Text style={styles.header}>Suka Tantangan Wajib Coba</Text>
        <Text style={styles.subheader}>
          Dapatkan poin dari task yang kamu kerjakan
        </Text>
        <FlatList
          data={Array}
          renderItem={({item}) => (
            <View style={styles.listContainer}>
              <View style={styles.View1}>
                <Image
                  source={require('../src/Fitness.png')}
                  style={{width: '100%', height: 171, borderRadius: 10}}
                />
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
                  Bikin otot lengan tambah gede
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginVertical: 8,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../src/Fitness-Icon.png')}
                    style={{width: 21, height: 21, tintColor: 'white'}}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 12,
                          color: '#ffffff',
                          fontFamily: 'OpenSans',
                        }}>
                        Gagah Fitness
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 160,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: '#C4F601',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          15
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#C4F601',
                            fontSize: 12,
                            fontWeight: '700',
                          }}>
                          POIN
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 18,
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#C4F601',
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      height: 24,
                      justifyContent: 'center',
                      marginTop: 8,
                      marginHorizontal: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
                      1. Treadmill 20 min
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#C4F601',
                      borderRadius: 8,
                      height: 24,
                      justifyContent: 'center',
                      marginTop: 8,
                      paddingHorizontal: 10,
                      marginHorizontal: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
                      2. Barbel 15 kg
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#C4F601',
                      borderRadius: 8,
                      height: 24,
                      justifyContent: 'center',
                      marginTop: 8,
                      paddingHorizontal: 10,
                      marginHorizontal: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>...</Text>
                  </View>
                </View>
              </View>
              <View style={styles.View1}>
                <Image
                  source={require('../src/Fitness.png')}
                  style={{width: '100%', height: 171, borderRadius: 10}}
                />
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
                  Bikin otot lengan tambah gede
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginVertical: 8,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../src/Fitness-Icon.png')}
                    style={{width: 21, height: 21, tintColor: 'white'}}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 12,
                          color: '#ffffff',
                          fontFamily: 'OpenSans',
                        }}>
                        Gagah Fitness
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 160,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: '#C4F601',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          15
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#C4F601',
                            fontSize: 12,
                            fontWeight: '700',
                          }}>
                          POIN
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 18,
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#C4F601',
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      height: 24,
                      justifyContent: 'center',
                      marginTop: 8,
                      marginHorizontal: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
                      1. Treadmill 20 min
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#C4F601',
                      borderRadius: 8,
                      height: 24,
                      justifyContent: 'center',
                      marginTop: 8,
                      paddingHorizontal: 10,
                      marginHorizontal: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>
                      2. Barbel 15 kg
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#C4F601',
                      borderRadius: 8,
                      height: 24,
                      justifyContent: 'center',
                      marginTop: 8,
                      paddingHorizontal: 10,
                      marginHorizontal: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '400'}}>...</Text>
                  </View>
                </View>
              </View>
              <View style={styles.View1}></View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    borderRadius: 16,
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
    width: width - 80,
    borderRadius: 10,
    marginRight: 16,
  },
  View1: {
    backgroundColor: '#161616',
    borderRadius: 10,
    marginBottom: 16,
  },
  listContainer: {
    borderRadius: 16,
    marginTop: 24,
    backgroundColor: '#000000',
    flex: 1,
  },
});

export default Task;
