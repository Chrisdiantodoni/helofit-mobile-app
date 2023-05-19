import React, {Component, useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../utils';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';

const Notifikasi = ({navigation: {goBack}}) => {
  const [dataUser, setDataUser] = useState('');
  const [dataNotif, setDataNotif] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      setDataUser(JSON.parse(res));
      const userId = JSON.parse(res)?.id;
      console.log(userId);
      getNotification(userId);
    });
  };
  const getNotification = async userId => {
    if (!userId) {
      showMessage({
        message: 'Tidak ada Notifikasi',
        type: 'danger',
      });
    } else {
      const response = await Axios.get(`/notification/${userId}`);

      if (response.data?.message === 'OK') {
        console.log('data notif', response?.data?.data);
        setDataNotif(response?.data?.data);
      }
    }
  };
<<<<<<< HEAD
  // const getDetailRoom = async userId => {
  //   if (!userId) {
  //     showMessage({
  //       message: 'Tidak ada Notifikasi',
  //       type: 'danger',
  //     });
  //   } else {
  //     const response = await Axios.get(`/room/own/${userId}`);

  //     if (response.data?.message === 'OK') {
  //       console.log(response?.data?.data);
  //       setDataRoom(response?.data?.data);
  //     }
  //   }
  // };

  const handleApproved = async id => {
=======
  const handleApproved = async (roomId, userDetailId) => {
>>>>>>> 212c97c4a0853bd65f61f6ed7e223ebe6a41a04c
    const body = {
      roomId: roomId,
      userIdRequestJoin: userDetailId,
    };
<<<<<<< HEAD
    const response = await Axios.put(`/room/request/approved`, body);
    console.log(response);
=======
    const response = await Axios.post(`/notification/approve`, body);
    if (response?.data?.message == 'OK') {
      getNotification(dataUser?.id);
    }
>>>>>>> 212c97c4a0853bd65f61f6ed7e223ebe6a41a04c
  };
  const handleUnapproved = async (roomId, userDetailId) => {
    const body = {
<<<<<<< HEAD
      roomId: id.roomId,
      userId: id.userId,
      status_approved: 'reject',
    };
    const response = await Axios.put(`/room/request/approved`, body);
    console.log(response);
=======
      roomId: roomId,
      userIdRequestJoin: userDetailId,
    };
    const response = await Axios.post(`/notification/reject`, body);
    if (response?.data?.message == 'OK') {
      getNotification(dataUser?.id);
    }
    console.log({response});
>>>>>>> 212c97c4a0853bd65f61f6ed7e223ebe6a41a04c
  };
  useEffect(() => {
    dataUserAsync();
    console.log(moment(new Date()).format('DD MMM YYYY'));
  }, []);

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
<<<<<<< HEAD
        {dataNotif.map((item, idx) => (
          <View key={idx}>
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
                  <Text style={styles.heading28}>{item.user?.username} </Text>
                  <Text>ingin bergabung ke room meetup </Text>
                  <Text style={styles.heading28}>{item?.room?.room_name}</Text>
                </Text>
                <Text style={[styles.small12, {marginTop: 8}]}>
                  {moment(item.createdAt).format('DD MMM YYYY') ===
                  moment(new Date()).format('DD MMM YYYY')
                    ? 'Hari ini'
                    : moment(item.createdAt).format('dddd')}
                  , {moment(item.createdAt).format('hh:mm A')}
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
                    }}
                    onPress={() =>
                      handleApproved({
                        roomId: item?.roomId,
                        userId: item?.userId,
                      })
                    }>
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
                    }}
                    onPress={() =>
                      handleUnapproved({
                        roomId: item?.roomId,
                        userId: item?.userId,
                      })
                    }>
                    <Text style={[styles.heading28, {color: '#C4f601'}]}>
                      Tolak
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
=======
        <FlatList
          data={dataNotif}
          keyExtractor={item => item.id}
          renderItem={({item, index}) =>
            item.room?.isHost == false &&
            item.list_user?.find(
              find => find?.userId == dataUser?.id && find?.status == 'request',
            ) ? (
              <SendingRequest item={item} />
            ) : (
              item.list_user?.map(itemUser => {
                if (
                  itemUser?.status == 'request' &&
                  item.room?.isHost == true
                ) {
                  return (
                    <CardRequest
                      item={item}
                      itemUser={itemUser}
                      key={index}
                      dataUser={dataUser}
                      handleApproved={handleApproved}
                      handleUnapproved={handleUnapproved}
                    />
                  );
                } else if (itemUser?.userId == dataUser?.id) {
                  if (itemUser?.status == 'complete') {
                    return <ApproveRequest item={item} />;
                  } else {
                    return <RejectedRequest item={item} />;
                  }
                }
              })
            )
          }
        />
>>>>>>> 212c97c4a0853bd65f61f6ed7e223ebe6a41a04c
      </View>
    </View>
  );
};

const RejectedRequest = ({item}) => {
  return (
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
            <Text>Permintaan Anda bergabung ke room meetup di tolak oleh </Text>
            <Text style={styles.heading28}>{item?.room?.room_name}</Text>
          </Text>
          <Text style={[styles.small12, {marginTop: 8}]}>
            {moment(item.createdAt).format('DD MMM YYYY') ===
            moment(new Date()).format('DD MMM YYYY')
              ? 'Hari ini'
              : moment(item.createdAt).format('dddd')}
            , {moment(item.createdAt).format('hh:mm A')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ApproveRequest = ({item}) => {
  return (
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
            <Text>
              <Text style={styles.heading28}>
                {' '}
                {item?.room?.user?.username}{' '}
              </Text>
              menyetujui permintaan bergabung di room meetup{' '}
            </Text>
            <Text style={styles.heading28}>{item?.room?.room_name}</Text>
          </Text>
          <Text style={[styles.small12, {marginTop: 8}]}>
            {moment(item.createdAt).format('DD MMM YYYY') ===
            moment(new Date()).format('DD MMM YYYY')
              ? 'Hari ini'
              : moment(item.createdAt).format('dddd')}
            , {moment(item.createdAt).format('hh:mm A')}
          </Text>
        </View>
      </View>
    </View>
  );
};
const SendingRequest = ({item}) => {
  return (
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
            <Text>
              Permintaan Anda bergabung ke room meetup Sudah Terkirim ke{' '}
            </Text>
            <Text style={styles.heading28}>{item?.room?.room_name}</Text>
          </Text>
          <Text style={[styles.small12, {marginTop: 8}]}>
            {moment(item.createdAt).format('DD MMM YYYY') ===
            moment(new Date()).format('DD MMM YYYY')
              ? 'Hari ini'
              : moment(item.createdAt).format('dddd')}
            , {moment(item.createdAt).format('hh:mm A')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CardRequest = ({
  item,
  dataUser,
  itemUser,
  handleApproved,
  handleUnapproved,
}) => {
  console.log({dataUser});
  return (
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
            <Text style={styles.heading28}>{itemUser.user?.username} </Text>
            <Text>ingin bergabung ke room meetup </Text>
            <Text style={styles.heading28}>{item?.room?.room_name}</Text>
          </Text>
          <Text style={[styles.small12, {marginTop: 8}]}>
            {moment(item.createdAt).format('DD MMM YYYY') ===
            moment(new Date()).format('DD MMM YYYY')
              ? 'Hari ini'
              : moment(item.createdAt).format('dddd')}
            , {moment(item.createdAt).format('hh:mm A')}
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
              }}
              onPress={() => handleApproved(item?.roomId, itemUser?.userId)}>
              <Text style={[styles.heading28, {color: '#000'}]}>Setuju</Text>
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
              }}
              onPress={() => handleUnapproved(item?.roomId, itemUser?.userId)}>
              <Text style={[styles.heading28, {color: '#C4f601'}]}>Tolak</Text>
            </TouchableOpacity>
          </View>
        </View>
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
