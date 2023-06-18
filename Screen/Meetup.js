import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Axios} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {Context} from './../context/index';

function Meetup({navigation: {navigate, goBack}}) {
  const navigation = useNavigation();
  const [room, setRoom] = useState([]);
  const {dispatch} = useContext(Context);

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
    const unsubscribe = navigation.addListener('focus', () => {
      getRoom();
    });
    return unsubscribe;
  }, [navigation]);

  const handleCreateRoom = () => {
    dispatch({
      type: 'type_create_room',
      payload: 'room',
    });
    navigate('PilihKategori');
  };

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
          List Meetup
        </Text>
      </View>
      <View style={{backgroundColor: '#161616', paddingBottom: 10}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Belum ketemu yang pas?</Text>
            <Text style={styles.subheader}>
              Tentukan sendiri lokasi dan waktu meetup yang kamu inginkan, jadi
              Host sekarang juga
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleCreateRoom}
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
      <View style={styles.listContainer}>
        <Text style={[styles.header, {marginTop: 24}]}>
          Main dengan teman baru
        </Text>
        <Text style={styles.subheader}>
          Temukan orang yang sehobi dengan kamu dan buat jaringan komunitas
          lebih luas
        </Text>
        {room
          .filter(
            filter => moment(filter.room_expired) >= moment().startOf('day'),
          )
          .map((item, index) => (
            <TouchableOpacity
              style={styles.View}
              onPress={() => navigate('DetailMeetupPage', {id: item.id})}>
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
                  {item.room_detail?.length} / {item.max_capacity}
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
                  {moment(item.booking?.booking_date).format('ddd, D MMM')}{' '}
                  {item.booking?.time
                    ? `${JSON.parse(item.booking?.time)[0]} - ${
                        JSON.parse(item.booking?.time)[1]
                      }`
                    : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
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
