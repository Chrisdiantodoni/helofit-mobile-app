//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import moment from 'moment';
import {currency, Axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRoom = ({route, navigation: {goBack, navigate}}) => {
  const [totalPlayer, setTotalPlayer] = useState(1);
  const [isGrow, setIsGrow] = useState(0);
  const [deskripsi, setDeskripsi] = useState('');
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState('');
  const [title, setTitle] = useState(null);
  const [male, setMale] = useState('');
  const [female, setFemale] = useState('');
  const [fromAge, setFromAge] = useState(null);
  const [toAge, setToAge] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [listTime, setListTime] = useState([]);
  const idFacility = route.params.idFacility;
  const merchantId = route.params.merchantId;
  const img = route.params.img;
  const selectedDate = route.params.selectedDate;
  const subTotal = route.params.subTotal;
  const price = route.params.price;

  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => setDataUser(res));
  };

  const handleTotalPlayer = type => {
    switch (type) {
      case 'minus':
        setTotalPlayer(totalPlayer === 1 ? 1 : totalPlayer - 1);
        break;
      case 'plus':
        setTotalPlayer(totalPlayer + 1);
        break;
      default:
        break;
    }
  };

  const getDetailMerchant = async () => {
    const response = await Axios.get(`/merchant/${merchantId}`);
    const data = response.data?.data;
    setData(data || '');
  };
  useEffect(() => {
    getDetailMerchant();
    dataUserAsync();
    setListTime(route.params.listTime);
  }, []);

  const sortTime = () => {
    const result = listTime?.sort((a, b) => {
      return b.time > a.time;
    });

    return result || [];
  };

  const handleBooking = async () => {
    if (listTime[0]?.time) {
      const body = {
        facilityId: idFacility,
        total: subTotal,
        price,
        booking_date: moment(selectedDate).format('YYYY-MM-DD'),
        userId: JSON.parse(dataUser)?.id,
        time: JSON.stringify(listTime.map(item => item.time)),
      };

      await Axios.post('/booking', body)
        .then(res => {
          const response = res.data?.data;
          const id = response.id;
          if (res.data.message === 'OK') {
            handleCreateRoom(id);
          }
        })
        .catch(err => {
          console.log({err: err.response});
        });
    }
  };

  const handleCreateRoom = idBooking => {
    const body = {
      room_name: title,
      facilityId: idFacility,
      gender: JSON.stringify([male ? 'male' : null, female ? 'female' : null]),
      range_age: JSON.stringify([fromAge, toAge]),
      max_capacity: totalPlayer,
      room_desc: deskripsi,
      hostId: JSON.parse(dataUser)?.id,
      bookingId: idBooking,
    };
    Axios.post('/room', body)
      .then(res => {
        const data = res.data;

        console.log({res_createRoom: data});
        if (data.message === 'OK') {
          navigate('Tabs');
        }
      })
      .catch(err => {
        console.log('error create room', err.response);
      });
  };

  const btnBuatRoom = async () => {
    switch (title && fromAge && toAge) {
      case null:
        alert(
          `Please Input ${
            !title ? 'Title' : !fromAge ? 'Umur Mulai' : !toAge ? 'Umur Ke' : ''
          }`,
        );
        break;

      default:
        // handleCreateRoom();
        await handleBooking();
        break;
    }
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
          Buat Room Meetup
        </Text>
      </View>
      <View>
        <Image source={{uri: img}} style={{width: '100%', height: 188}} />
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#000000',
            paddingBottom: 22,
            paddingTop: 19,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginVertical: 8,
            }}>
            <Ionicon
              name="location-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <View>
              <Text style={styles.heading28}>{data?.address}</Text>
              {/* <Text style={styles.heading28}>Badminton</Text> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Ionicon
              name="time-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <Text style={styles.heading28}>
              {moment(selectedDate).format('ddd, DD MMM YYYY')} ,{' '}
              {sortTime()[0]?.time} - {sortTime()[sortTime()?.length - 1]?.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Ionicon
              name="pricetag-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <Text style={styles.heading28}>Rp. {currency(subTotal)}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={[styles.heading28, {fontSize: 20}]}>
            Judul Room Meetup
          </Text>

          <TextInput
            placeholder="Masukkan Judul Meetup"
            style={{
              borderRadius: 16,
              borderTopStartRadius: 16,
              borderTopEndRadius: 16,
              justifyContent: 'center',
              height: 60,
              marginTop: 19,
              backgroundColor: '#7C7C7C',
              color: '#ffffff',
            }}
            value={title}
            placeholderTextColor="#FFFFFF"
            onChangeText={text => setTitle(text)}
          />
          <View style={{marginTop: 32}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Jenis Kelamin
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                status={male ? 'checked' : 'unchecked'}
                onPress={() => setMale(!male)}
              />
              <Text
                style={[styles.heading14, {marginLeft: 18}]}
                onPress={() => setMale(!male)}>
                Laki-laki
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                status={female ? 'checked' : 'unchecked'}
                onPress={() => setFemale(!female)}
              />
              <Text
                style={[styles.heading14, {marginLeft: 18}]}
                onPress={() => setFemale(!female)}>
                Perempuan
              </Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Hanya dengan Umur
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <Text style={[styles.heading28, {fontSize: 16, width: '20%'}]}>
                Mulai
              </Text>
              <TextInput
                style={{
                  borderRadius: 16,
                  borderTopStartRadius: 16,
                  borderTopEndRadius: 16,
                  justifyContent: 'center',
                  height: 60,
                  marginLeft: 30,
                  backgroundColor: '#7C7C7C',
                  color: '#ffffff',
                }}
                value={fromAge}
                onChangeText={e => setFromAge(e)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <Text style={[styles.heading28, {fontSize: 16, width: '20%'}]}>
                Sampai
              </Text>
              <TextInput
                style={{
                  borderRadius: 16,
                  borderTopStartRadius: 16,
                  borderTopEndRadius: 16,
                  justifyContent: 'center',
                  height: 60,
                  marginLeft: 30,
                  backgroundColor: '#7C7C7C',
                  color: '#ffffff',
                }}
                value={toAge}
                onChangeText={e => setToAge(e)}
              />

              {/* <Dropdown dropdownPosition={true} data={age} /> */}
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Jumlah Pemain Meetup
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <TouchableOpacity onPress={() => handleTotalPlayer('minus')}>
                <Image
                  source={require('../../src/MinusWhite.png')}
                  style={{
                    height: 32,
                    width: 32,
                    marginRight: 30,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.heading14}>{totalPlayer}</Text>
              <TouchableOpacity onPress={() => handleTotalPlayer('plus')}>
                <Image
                  source={require('../../src/PlusWhite.png')}
                  style={{height: 32, width: 32, marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 38}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>Deskripsi</Text>
            <TextInput
              placeholder="Masukkan deskripsi"
              placeholderTextColor={'#FFFFFF'}
              editable
              value={deskripsi}
              multiline={true}
              onChangeText={text => {
                setDeskripsi(text);
              }}
              onContentSizeChange={() => {
                setIsGrow({height: isGrow});
              }}
              style={{
                borderRadius: 16,
                borderTopStartRadius: 16,
                borderTopEndRadius: 16,
                marginTop: 19,
                backgroundColor: '#7C7C7C',
                height: Math.max(35, isGrow),
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#000000',
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#C4F601',
                marginHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                height: 38,
              }}
              onPress={() => btnBuatRoom()}>
              <Text style={[styles.heading28, {color: '#000000'}]}>
                Buat Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },

  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  heading28: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
});

//make this component available to the app
export default CreateRoom;
