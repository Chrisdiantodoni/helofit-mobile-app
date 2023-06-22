//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Axios, currency} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Reserved = ({navigation: {navigate, goBack, addListener}}) => {
  const [dataUser, setDataUser] = useState({});
  const [dataReserve, setReserveData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser')
      .then(res => {
        const userId = JSON.parse(res)?.id;
        console.log(userId);
        getReserve(userId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getReserve = async userId => {
    const response = await Axios.get(`/booking/own/${userId}`);
    const data = response?.data?.data?.result;
    if (response.data?.message === 'OK') {
      setReserveData(data);
    }
    console.log('Data', data);
  };
  const handleCancelReserve = async (userId, bookingId) => {
    const body = {
      userId,
      bookingId,
    };
    await Axios.post(`/booking/cancel`, body)
      .then(res => {
        const data = res.data;
        if (data.message === 'OK') {
          navigate('Tabs');
        }
      })
      .catch(err => console.log('error cancel reserve', err));
  };

  useEffect(() => {
    dataUserAsync();
  }, []);

  const handleConfirmPayment = async item => {
    console.log(item);
    const body = {
      total: parseInt(item.total),
      merchantId: item.facility?.merchant?.id,
    };
    const bookingId = item.id;
    await Axios.put(`/booking/confirm/${bookingId}`, body)
      .then(res => {
        const data = res.data;
        console.log(res);
        if (data.message === 'OK') {
          navigate('Tabs');
        }
      })
      .catch(err => console.log(err));
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
          Reservasi yang dilakukan
        </Text>
      </View>
      <View
        style={{
          paddingTop: 32,
          marginHorizontal: 16,
        }}>
        <Text style={styles.Heading28}>Daftar Reservasi Kamu</Text>
        <Text style={[styles.heading14, {paddingTop: 8}]}>
          Pembatalan sebelum waktu bermain membuat uang muka hangus.Hadir sesuai
          tempat dan waktu
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {dataReserve
            .filter(filter => filter.type === 'reserve')
            .map((item, idx) => (
              <View key={idx} style={styles.card}>
                <View style={styles.inCard}>
                  <Ionicon
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                    name="location-outline"
                  />
                  <View>
                    <Text style={styles.Heading28}>
                      {item?.facility?.merchant?.address}
                    </Text>
                    <Text style={styles.heading14}>
                      {item.facility?.facility_name}
                    </Text>
                  </View>
                </View>
                <View style={styles.inCard}>
                  <Ionicon
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                    name="time-outline"
                  />
                  <Text style={styles.Heading28}>
                    {moment(item.booking_date).format('ddd, DD MMM')}{' '}
                    {JSON.parse(item.time)[0]} -{' '}
                    {JSON.parse(item.time)[JSON.parse(item.time).length - 1]}
                  </Text>
                </View>
                <View style={styles.inCard}>
                  <Ionicon
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                    name="pricetag-outline"
                  />
                  <Text style={[styles.Heading28, {color: '#C4F601'}]}>
                    Rp.{currency(item.total)}
                  </Text>
                </View>
                {!item.status_payment ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleConfirmPayment(item)}
                      disabled={item.status_payment ? true : false}
                      style={[
                        styles.button,
                        {borderColor: '#C4F601', backgroundColor: '#C4f601'},
                      ]}>
                      <Text style={[styles.Heading28, {color: '#000000'}]}>
                        Konfirmasi Pasti Main
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, {borderColor: '#C4F601'}]}
                      disabled={item.status_payment ? true : false}
                      onPress={() => handleCancelReserve(item.userId, item.id)}>
                      <Text style={[styles.Heading28, {color: '#C4F601'}]}>
                        Batalkan Reservasi
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    flex: 1,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#161616',
    borderColor: '#C4F601',
    borderWidth: 1,
    padding: 16,
    marginTop: 26,
    width: '100%',
  },
  inCard: {
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#161616',
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 17,
  },

  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF',
  },
  heading14: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 5,
  },
});

//make this component available to the app
export default Reserved;
