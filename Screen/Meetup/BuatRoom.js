//import liraries
import React, {Component, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Axios} from '../../utils';
import moment from 'moment';
import currency from '../../utils/currency';
import {Context} from '../../context/index';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const BuatRoom = ({route, navigation}) => {
  const [isSelected, setIsSelected] = useState();
  const [selectedBooking, setSelectedBooking] = useState([]);
  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);
  const {type_create_room} = useContext(Context);
  const idFacility = route.params.idFacility;
  const merchantId = route.params.merchantId;
  const img = route.params.img;
  const price = route.params.price;
  const [dataReserve, setDataReserve] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const [dataUser, setDataUser] = useState({});

  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      if (res) {
        setDataUser(JSON.parse(res));
      }
    });
  };
  const getHour = async () => {
    console.log({date: moment(isSelected).format('YYYY-MM-DD')});
    await Axios.post(`/facility/time/${idFacility}`, {
      merchantId,
      selected_date: moment(isSelected).format('YYYY-MM-DD'),
    })
      .then(response => {
        const data = response.data?.data;
        setData(data || []);
        console.log({response});
      })
      .catch(err => {
        console.log({err});
      });
  };

  useEffect(() => {
    getHour();
  }, [isSelected]);

  useEffect(() => {
    let today = new Date();
    let newDates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(today);
      date.setDate(today.getDate() + i);
      newDates.push(date);
    }
    setDates(newDates);
    dataUserAsync();
  }, []);

  const handleSelectedBooking = item => {
    console.log(item);
    const findDuplicate = selectedBooking.find(find => find.time === item.time);

    if (!findDuplicate?.time) {
      setSelectedBooking([...selectedBooking, item]);
    } else {
      setSelectedBooking(
        selectedBooking.filter(filter => filter.time !== item.time),
      );
    }
  };

  const subTotal = () => {
    const total = parseInt(data.price) * parseInt(selectedBooking.length);
    return total;
  };

  const validateSelectedBooking = item => {
    const findDuplicate = selectedBooking.find(find => find.time === item.time);

    if (findDuplicate?.time) {
      return findDuplicate?.time;
    } else {
      return;
    }
  };
  const getDetailFacility = async () => {
    const response = await Axios.get(`/facility/merchant/detail/${idFacility}`);
    const data = response.data?.data;
    console.log(data);
    setDataReserve(data);
  };
  const sortTime = () => {
    const result = selectedBooking?.sort((a, b) => {
      return b.time > a.time;
    });

    return result || [];
  };

  const handleReserve = async () => {
    const body = {
      facilityId: idFacility,
      total: subTotal(),
      price: data?.price,
      booking_date: moment(isSelected).format('YYYY-MM-DD'),
      userId: dataUser?.id,
      time: JSON.stringify(selectedBooking.map(item => item.time)),
    };
    await Axios.post(`/booking`, body)
      .then(res => {
        console.log(res);
        const data = res.data;
        if (data.message === 'OK') {
          navigation.navigate('Tabs');
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: img}} style={{width: '100%', height: 188}} />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 28,
          height: 64,
          alignItems: 'center',
          backgroundColor: '#000000',
          marginVertical: 8,
          borderRadius: 16,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#ffffff',
            width: '40%',
          }}>
          Total Biaya :
        </Text>
        <Text style={{fontSize: 20, fontWeight: '700', color: '#C4f601'}}>
          Rp. {currency(subTotal())}
        </Text>
      </View>
      <View style={{backgroundColor: '#000000', paddingLeft: 28}}>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: 'row',
            marginTop: 16,
            marginBottom: 15,
            borderRadius: 16,
          }}>
          {dates.map((date, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setIsSelected(date)}
              style={[
                styles.capsules,
                {
                  backgroundColor:
                    moment(isSelected).format('DD-MM-YYYY') ===
                    moment(date).format('DD-MM-YYYY')
                      ? '#C4F601'
                      : '#000000',
                  borderColor: '#C4F601',
                },
              ]}>
              <Text
                style={[
                  styles.heading14,
                  {
                    color:
                      moment(isSelected).format('DD-MM-YYYY') ===
                      moment(date).format('DD-MM-YYYY')
                        ? '#000000'
                        : '#C4F601',
                    fontSize: 12,
                  },
                ]}>
                {moment(date).format('DD-MM-YYYY').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 8,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#000000',
            paddingHorizontal: 21,
            paddingBottom: 10,
          }}>
          {data.list_time?.map((item, idx) => (
            <TouchableOpacity
              onPress={() => {
                item?.available ? handleSelectedBooking(item) : null,
                  subTotal();
              }}
              disabled={item?.available ? false : true}
              style={{
                borderRadius: 16,
                backgroundColor: '#161616',
                width: 93,
                height: 77,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 17 / 2,
                marginVertical: 8,
                borderWidth: 2,
                borderColor:
                  validateSelectedBooking(item) === item.time
                    ? '#C4F601'
                    : '#000000',
              }}
              key={item}
              // onPress={handlePress[i]}
            >
              <View>
                <Text
                  style={[
                    styles.heading14,
                    {
                      color: item?.available ? '#FFFFFF' : '#C4f601',
                    },
                  ]}>
                  {item.time}
                </Text>
                <Text
                  style={[
                    styles.heading14,
                    {
                      color: item?.available ? '#FFFFFF' : '#C4f601',
                      fontWeight: '400',
                    },
                  ]}>
                  {item?.available ? 'tersedia' : 'terisi'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* {renderTime()} */}
      {type_create_room === 'room' ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#000',
            height: 70,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 38,
              backgroundColor: '#C4F601',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('CreateRoom', {
                idFacility,
                merchantId,
                img,
                listTime: selectedBooking,
                selectedDate: isSelected,
                subTotal: subTotal(),
                price,
              });
            }}>
            <Text style={[styles.heading14, {color: '#000000'}]}>
              Selanjutnya
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#000',
            height: 70,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 38,
              backgroundColor: '#C4F601',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setIsVisible(true);
              getDetailFacility();
              sortTime();
            }}>
            <Text style={[styles.heading14, {color: '#000000'}]}>
              Reservasi
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        isVisible={isVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        animationInTiming={900}
        animationOutTiming={500}
        swipeDirection={'down'}
        backdropOpacity={0.1}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}>
        <View View style={styles.Modal}>
          <View
            style={{
              backgroundColor: '#7C7C7C',
              width: 55,
              height: 3,
              marginBottom: 24,
              marginTop: 30,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: '85%', justifyContent: 'flex-start'}}>
              <Text style={[styles.heading28, {marginBottom: 8}]}>
                {dataReserve?.address}
              </Text>
              <Text style={[styles.heading28, {marginBottom: 8}]}>
                {dataReserve?.facility_info?.facility_name}
              </Text>
              <Text style={[styles.heading28, {marginBottom: 8}]}>
                {moment(isSelected).format('ddd, DD MMM YYYY')} ,{' '}
                {sortTime()[0]?.time} -{' '}
                {sortTime()[sortTime()?.length - 1]?.time}
              </Text>
              <Text style={[styles.heading28, {color: '#C4f601'}]}>
                Rp {currency(subTotal())}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: '#7c7c7c',
                  borderWidth: 1,
                  padding: 15,
                  justifyContent: 'center',
                  marginVertical: 32,
                }}>
                <View style={{width: '70%'}}>
                  <Text style={[styles.heading28, {marginBottom: 8}]}>
                    Dompet Olahragamu
                  </Text>
                </View>
                <View style={{width: '30%'}}>
                  <Text style={[styles.heading28, {color: '#C4f601'}]}>
                    Rp. {dataUser?.balance}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 38,
                  backgroundColor: '#C4F601',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleReserve}>
                <Text style={[styles.heading14, {color: '#000000'}]}>
                  Bayar Sekarang
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  capsules: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: 84,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  heading14: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 14,
  },
  Modal: {
    backgroundColor: '#161616',
    borderRadius: 10,
    height: '50%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    lineHeight: 27,
    alignSelf: 'flex-start',
  },
});

//make this component available to the app
export default BuatRoom;
