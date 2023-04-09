import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Onboarding from './components/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {currency} from './utils';
import {Axios} from './utils';
import moment from 'moment';
import base64 from 'react-native-base64';

const {width} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const [dataUser, setDataUser] = useState({});
  const [room, setRoom] = useState([]);
  const getRoom = async () => {
    try {
      const response = await Axios.get('/room');
      const data = response.data?.data?.result;
      setRoom(data || []);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoom();
    AsyncStorage.getItem('dataUser').then(res => {
      setDataUser(JSON.parse(res));
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#C4F601', flex: 4}}>
      <View
        style={{
          alignItems: 'center',
          position: 'relative',
          marginTop: 48,
          alignContent: 'space-between',
          flexDirection: 'row',
          marginLeft: 16,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#161616',
            flexDirection: 'row',
            borderRadius: 20,
            width: 263,
            height: 40,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Pencarian')}>
          <View style={{marginLeft: 23, marginRight: 15}}>
            <Icon style={{color: '#7c7c7c', fontSize: 18}} name="search" />
          </View>
          <View>
            <Text style={{color: '#7c7c7c', fontSize: 16}}>
              Cari meetup, task, ...
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
            <Icon
              style={{color: 'black', fontSize: 20, paddingHorizontal: 15}}
              name="bell"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon1 style={{color: 'black', fontSize: 25}} name="user" />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require('./src/Banner.png')}
        style={{
          width: '100%',
          height: 180,
          resizeMode: 'stretch',
          marginTop: 24,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 1120,
          justifyContent: 'center',
          marginLeft: 32,
          width: '40%',
        }}>
        <Text
          style={{
            color: '#000000',
            marginBottom: 16,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Hai, {dataUser?.username}
        </Text>
        <Text style={{color: '#000000', fontSize: 13, fontWeight: '400'}}>
          Yuk terus bergerak untuk hidup yang lebih sehat
        </Text>
      </View>
      <View style={{backgroundColor: '#000000', flex: 1}}>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            marginHorizontal: 16,
            top: 0,
            left: 0,
            right: 0,
            bottom: 1180,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#161616',
              width: 360,
              height: 80,
              borderRadius: 8,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: '10%'}}>
              <Icon name="wallet" style={{color: '#7c7c7c', fontSize: 20}} />
            </View>
            <View style={{width: '50%'}}>
              <Text style={{color: '#ffffff', fontSize: 12}}>
                Dompet Olahragamu
              </Text>
              <Text
                style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
                {currency(dataUser?.balance)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                borderColor: '#ffffff',
                borderWidth: 1,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
                width: '30%',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('Dompet')}>
              <Text style={{color: '#ffffff', fontSize: 18}}>Isi</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('List Meetup')}>
          <View
            style={{
              marginTop: 70,
              marginLeft: 16,
              marginRight: 33,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#ffffff',
                fontFamily: 'OpenSans',
              }}>
              Main bareng teman baru
            </Text>

            <Icon2
              name="navigate-next"
              style={{color: 'white', fontSize: 25}}
            />
          </View>
        </TouchableOpacity>

        <View style={{marginLeft: 8}}>
          <ScrollView
            style={{
              marginVertical: 15,
              height: 256,
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
            {room.map((item, index) => (
              <TouchableOpacity
                style={Styles.View}
                onPress={() =>
                  navigation.navigate('DetailMeetupPage', {id: item.id})
                }>
                <Image
                  source={{
                    uri: item?.facility?.banner_img
                      ? item?.facility?.banner_img
                      : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  }}
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
                    left: 240,
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
                    {item.room_detail?.length} / {item.max_capacity}
                    {/* 7/10 */}
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
                  {item.room_name}
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
                    {item.facility?.merchant?.address || '-'}
                    {/* Bilal GOR Badminton, Tembung */}
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
                    {moment(item.booking.booking_date).format('ddd, D MMM')}{' '}
                    {item.booking?.time
                      ? `${JSON.parse(item.booking?.time)[0]} - ${
                          JSON.parse(item.booking?.time)[1]
                        }`
                      : ''}
                    {/* Sabtu, 25 Nov 08.00-12.00 AM */}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            marginLeft: 16,
            marginRight: 33,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }}>
            Buat yang suka tantangan
          </Text>

          <TouchableOpacity>
            <Icon2
              name="navigate-next"
              style={{color: 'white', fontSize: 25}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 8}}>
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
              style={Styles.View}
              onPress={() => navigation.navigate('DetailTask')}>
              <Image
                source={require('./src/Fitness.png')}
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
                  source={require('./src/Fitness-Icon.png')}
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
              <View style={{flexDirection: 'row'}}>
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
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#000000'}}>
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
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#000000'}}>
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
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: '#000000'}}>
                    ...
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={Styles.View}></View>
            <View style={Styles.View}></View>
          </ScrollView>
        </View>
        <Onboarding />
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 8,
          }}>
          <Image
            source={require('./src/BannerPromo.png')}
            style={{width: 359, height: 160, borderRadius: 5}}
          />
        </View> */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }}>
            Banyak pilihan tempat
          </Text>

          <TouchableOpacity>
            <Icon2
              name="navigate-next"
              style={{color: 'white', fontSize: 25}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            style={{
              marginVertical: 15,
              height: 150,
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
            <View style={Styles.View2}>
              <Image
                source={require('./src/Badminton-Icon.png')}
                style={{width: 25, height: 25, tintColor: 'white'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#C4F601',
                    marginRight: 3,
                  }}>
                  Rp. 140.000
                </Text>
              </View>

              <View
                style={{
                  width: 78,
                  height: 38,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Aseng Badminton
                </Text>
              </View>
            </View>
            <View style={Styles.View2}>
              <Image
                source={require('./src/Futsal-Icon.png')}
                style={{width: 25, height: 25, tintColor: 'white'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#C4F601',
                    marginRight: 3,
                  }}>
                  Rp. 140.000
                </Text>
              </View>

              <View
                style={{
                  width: 78,
                  height: 38,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Entong Futsal
                </Text>
              </View>
            </View>
            <View style={Styles.View2}>
              <Image
                source={require('./src/Futsal-Icon.png')}
                style={{width: 25, height: 25, tintColor: 'white'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#C4F601',
                    marginRight: 3,
                  }}>
                  Rp. 35.000
                </Text>
              </View>

              <View
                style={{
                  width: 78,
                  height: 38,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  John Fitness
                </Text>
              </View>
            </View>
            <View style={Styles.View2}></View>
            <View style={Styles.View2}></View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const Styles = StyleSheet.create({
  View: {
    backgroundColor: '#161616',
    width: width - 80,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  View2: {
    backgroundColor: '#161616',
    width: 140,
    borderRadius: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  View1: {
    backgroundColor: '#7c7c7c',
    width: width - 80,
    margin: 10,
    borderRadius: 10,
    height: 150,
    width: '87%',
  },
});
