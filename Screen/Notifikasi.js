import React, {Component, useEffect, useState, useRef} from 'react';
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
  const flatListRef = useRef(null);

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
  const handleApproved = async (roomId, userDetailId) => {
    const body = {
      roomId: roomId,
      userIdRequestJoin: userDetailId,
    };
    const response = await Axios.post(`/notification/approve`, body);
    if (response?.data?.message == 'OK') {
      getNotification(dataUser?.id);
    }
  };
  const handleUnapproved = async (roomId, userDetailId) => {
    const body = {
      roomId: roomId,
      userIdRequestJoin: userDetailId,
    };
    const response = await Axios.post(`/notification/reject`, body);
    if (response?.data?.message == 'OK') {
      getNotification(dataUser?.id);
    }
    console.log({response});
  };
  useEffect(() => {
    dataUserAsync();
    console.log(moment(new Date()).format('DD MMM YYYY'));
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
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
          Notifikasi
        </Text>
      </View>
      <View>
        <ScrollView>
          {dataNotif.map((item, index) => {
            if (
              item.room?.isHost === false &&
              item.list_user?.find(
                find =>
                  find?.userId === dataUser?.id && find?.status === 'request',
              )
            ) {
              return <SendingRequest item={item} key={item.id} />;
            } else {
              return item.list_user?.map(itemUser => {
                if (
                  itemUser?.status === 'request' &&
                  item.room?.isHost === true
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
                } else if (itemUser?.userId === dataUser?.id) {
                  if (itemUser?.status === 'complete') {
                    return <ApproveRequest item={item} key={item.id} />;
                  } else {
                    return <RejectedRequest item={item} key={item.id} />;
                  }
                }
              });
            }
          })}
        </ScrollView>
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
          paddingTop: 12,
          flexDirection: 'row',
          marginBottom: 4,
        }}>
        <View style={{width: '20%'}}>
          <Image
            source={{uri: item?.room?.user?.profile_img}}
            style={{width: 48, height: 48, borderRadius: 48 / 2}}
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
          paddingTop: 12,
          flexDirection: 'row',
          marginBottom: 8,
        }}>
        <View style={{width: '20%'}}>
          <Image
            source={{uri: item?.room?.user?.profile_img}}
            style={{width: 48, height: 48, borderRadius: 48 / 2}}
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
  console.log({itemUser});
  console.log({dataUser});
  return (
    <View>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: '#000000',
          paddingHorizontal: 16,
          paddingTop: 12,
          flexDirection: 'row',
          marginBottom: 8,
        }}>
        <View style={{width: '20%'}}>
          <Image
            source={{uri: itemUser?.user?.profile_img}}
            style={{width: 48, height: 48, borderRadius: 48 / 2}}
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
