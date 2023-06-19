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

const {width} = Dimensions.get('window');

function HomeScreen({navigation}) {
  const [dataUser, setDataUser] = useState({});
  const [room, setRoom] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [facility, setFacility] = useState([]);
  const [promo, setPromo] = useState([]);
  const [dataNotif, setDataNotif] = useState([]);
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      const userId = JSON.parse(res)?.id;
      console.log(userId);
      getUser(userId);
      getNotification(userId);
    });
  };

  const getRoom = async () => {
    try {
      const response = await Axios.get('/room');
      const data = response.data?.data?.result;
      setRoom(data || []);
      console.log('data Room', room);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async userId => {
    console.log(userId);
    try {
      const response = await Axios.get(`/user/${userId}`);
      console.log(response);
      const data = response?.data;
      if (response?.data?.message === 'OK') {
        setDataUser(data?.data?.user_info);
        console.log('dataUser', data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListTask = async () => {
    const {data} = await Axios.get(`/task`);
    console.log({dataTask: data});
    if (data?.message === 'OK') {
      setDataTask(data?.data?.result);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRoom();
      getListTask();
      dataUserAsync();
      getFacility();
      getPromoUser();
    });
    return unsubscribe;
  }, [navigation]);

  const getMaxTime = array => {
    const max = Math.max(
      ...array.map(time => {
        const [hours, minutes] = time.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
      }),
    );
    const maxTime = `${Math.floor(max / 60)
      .toString()
      .padStart(2, '0')}:${(max % 60).toString().padStart(2, '0')}`;
    return maxTime;
  };

  const getMinTime = array => {
    const min = Math.min(
      ...array.map(time => {
        const [hours, minutes] = time.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
      }),
    );
    const minTime = `${Math.floor(min / 60)
      .toString()
      .padStart(2, '0')}:${(min % 60).toString().padStart(2, '0')}`;

    return minTime;
  };
  const getFacility = async () => {
    try {
      const response = await Axios.get(`/facility?order_field=price&order=ASC`);
      const data = response?.data?.data?.result;
      setFacility(data || []);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPromoUser = async () => {
    const response = await Axios.get('/promo');
    try {
      if (response.data.message === 'OK') {
        console.log('data', response);
        const data = response?.data?.data;
        setPromo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayImages = item => {
    switch (item?.category_name?.toLowerCase()) {
      case 'badminton':
        return require('./src/icon/Badminton.png');
      case 'futsal':
        return require('./src/icon/Futsal.png');
      case 'basket':
        return require('./src/icon/Basketball.png');
      case 'yoga':
        return require('./src/icon/Yoga.png');
      case 'tennis':
        return require('./src/icon/Tennis.png');
      case 'boxing':
        return require('./src/icon/Boxing.png');
      case 'fitness':
        return require('./src/icon/Fitness.png');
      case 'golf':
        return require('./src/icon/Golf.png');
      case 'bowling':
        return require('./src/icon/Bowling.png');
      default:
        return null;
        break;
    }
  };

  const getNotification = async userId => {
    if (!userId) {
      showMessage({
        message: 'Tidak ada Notifikasi',
        type: 'danger',
      });
    } else {
      await Axios.get(`/notification/${userId}`)
        .then(response => {
          if (response.data?.message === 'OK') {
            console.log('data notif', response?.data?.data);
            setDataNotif(response?.data?.data);
          }
        })
        .catch(err => {
          console.log({err});
        });
    }
  };

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
        <View style={{width: '65%'}}>
          <Image
            source={require('./src/LogoHomescreen.png')}
            style={{width: 195, height: 56, resizeMode: 'stretch'}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              {dataNotif.length !== 0 ? (
                <View style={{position: 'absolute'}}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 10,
                      position: 'absolute',
                      top: -5,
                      right: -40,
                      paddingHorizontal: 5,
                      zIndex: 1,
                    }}>
                    <Text style={{color: 'white', fontSize: 12}}>
                      {dataNotif.length}
                    </Text>
                  </View>
                </View>
              ) : null}

              <Icon
                style={{color: 'black', fontSize: 20, paddingHorizontal: 15}}
                name="bell"
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '25%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon1 style={{color: 'black', fontSize: 25}} name="user" />
            </TouchableOpacity>
          </View>
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
          bottom: '75%',
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
        <View>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('List Meetup')}>
              <Icon2
                name="navigate-next"
                style={{color: 'white', fontSize: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>

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
            {room
              .filter(
                filter =>
                  moment(filter.room_expired) >= moment().startOf('day'),
              )
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={Styles.View}
                  onPress={() =>
                    navigation.navigate('DetailMeetupPage', {id: item.id})
                  }>
                  <View>
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
                        resizeMode: 'cover',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: '75%',
                        left: '80%',
                        backgroundColor: '#C4F601',
                        width: '16%',
                        height: '17%',
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
                        {item.room_detail?.length} / {item.max_capacity}
                        {/* 7/10 */}
                      </Text>
                    </View>
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
                      {moment(item.booking?.booking_date).format('ddd, D MMM')}{' '}
                      {item.booking?.time
                        ? `${getMinTime(
                            JSON.parse(item.booking?.time),
                          )} - ${getMaxTime(JSON.parse(item.booking?.time))}`
                        : ''}
                      {/* Sabtu, 25 Nov 08.00-12.00 AM */}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View>
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
            <TouchableOpacity onPress={() => navigation.navigate('Task')}>
              <Icon2
                name="navigate-next"
                style={{color: 'white', fontSize: 25}}
              />
            </TouchableOpacity>
          </View>
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
            {dataTask
              ?.filter(
                item => moment(item.expiredIn) >= moment().startOf('day'),
              )
              .map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={Styles.View}
                  onPress={() =>
                    navigation.navigate('DetailEachTask', {taskId: item.id})
                  }>
                  <Image
                    source={{
                      uri: item?.banner_img
                        ? item?.banner_img
                        : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    }}
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
                    {item.task_name}
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
                      <View style={{width: '70%'}}>
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 12,
                            color: '#ffffff',
                            fontFamily: 'OpenSans',
                          }}>
                          {item?.merchant?.merchant_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '25%',
                        }}>
                        <View>
                          <Text
                            style={{
                              color: '#C4F601',
                              fontSize: 20,
                              fontWeight: '700',
                            }}>
                            {item.poin}
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
                    {item?.list_task
                      ? item?.list_task
                          ?.slice(0, 2)
                          .map((itemTask, idxTask) => (
                            <View
                              key={idxTask}
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
                                style={{
                                  fontSize: 12,
                                  fontWeight: '400',
                                  color: '#000000',
                                }}>
                                {idxTask + 1}. {itemTask?.task_name}
                              </Text>
                            </View>
                          ))
                      : null}

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
                </TouchableOpacity>
              ))}
            {/* <View style={Styles.View}></View>
            <View style={Styles.View}></View> */}
          </ScrollView>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Onboarding data={promo} />
        </View>
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
            {facility.map((item, index) => (
              <View style={Styles.View2}>
                <Image
                  source={displayImages(item.category)}
                  style={{
                    resizeMode: 'contain',
                    width: 40,
                    height: 40,
                  }}
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
                    Rp. {currency(item.price)}
                  </Text>
                </View>

                <View
                  style={{
                    width: '70%',
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
                    {item?.merchant?.merchant_name}
                  </Text>
                </View>
              </View>
            ))}
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
