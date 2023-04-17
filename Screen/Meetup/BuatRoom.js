//import liraries
import React, {Component, useState, useEffect} from 'react';
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
import currency from './../../utils/currency';

// create a component
const BuatRoom = ({route, navigation}) => {
  const [isSelected, setIsSelected] = useState('2023-03-22');
  const id = route.params.id;
  const merchantId = route.params.merchantId;
  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);

  const getHour = async () => {
    console.log(id);
    const response = await Axios.post(`/facility/time/${id}`, {
      merchantId,
    });
    const data = response.data?.data;
    setData(data || []);
    console.log(data);
  };
  useEffect(() => {
    getHour();
    let today = new Date();
    let newDates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(today);
      date.setDate(today.getDate() + i);
      newDates.push(date);
    }
    setDates(newDates);
  }, []);
  const [selectedBooking, setSelectedBooking] = useState([]);

  const arrDay = [
    '2023-03-22',
    '2023-03-23',
    '2023-03-24',
    '2023-03-25',
    '2023-03-26',
    '2023-03-27',
    '2023-03-28',
  ];

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

  // const buka = 8;
  // const tutup = 19;
  // for (let i = 0; i <= datas.length; i++) {
  //   const data = [];
  //   data.push([i]);
  // }
  // const bucket = [];

  // datas.forEach(item => {
  //   const waktu = item.clock_time;
  // });

  // for (let i = buka; i <= tutup; i++) {
  //   for (let j = 0; j < data.length; j++) {
  //     const item = data[j];
  //     jam.push();
  //   }
  // }

  // const renderTime = () => {
  //   const result = [];
  //   datas.forEach(data => {
  //     for (let i = data.start_time; i <= data.end_time; i++) {
  //       result.push(
  //         <View>
  //           <TouchableOpacity
  //             style={{
  //               borderRadius: 16,
  //               backgroundColor: '#161616',
  //               width: 93,
  //               height: 77,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               marginHorizontal: 17 / 2,
  //               marginVertical: 8,
  //               borderWidth: 2,
  //               borderColor: data.is_reserved
  //                 ? '#000000'
  //                 : isSelected
  //                 ? '#000000'
  //                 : '#000000',
  //             }}
  //             disabled={data.is_reserved ? true : isSelected ? false : false}
  //             onPress={() => setIsSelected(prev => !prev)}>
  //             <View>
  //               <Text
  //                 style={[
  //                   styles.heading14,

  //                   {
  //                     color: data.is_reserved
  //                       ? '#ffffff'
  //                       : isSelected
  //                       ? '#C4F601'
  //                       : '#ffffff',
  //                     textAlign: 'center',
  //                   },
  //                 ]}>
  //                 {i}.00
  //               </Text>
  //               <Text
  //                 style={[
  //                   styles.heading14,
  //                   {
  //                     color: data.is_reserved
  //                       ? '#ffffff'
  //                       : isSelected
  //                       ? '#C4F601'
  //                       : '#ffffff',
  //                     fontWeight: '400',
  //                   },
  //                 ]}>
  //                 {data.is_reserved ? '*terisi' : 'tersedia'}
  //               </Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>,
  //       );
  //     }
  //   });
  //   return result;
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/BadmintonGambar.png')}
        style={{width: '100%', height: 188}}
      />
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
              onPress={() => setIsSelected(date)}
              style={[
                styles.capsules,
                {
                  backgroundColor: isSelected === date ? '#C4F601' : '#000000',
                  borderColor: '#C4F601',
                },
              ]}>
              <Text
                style={[
                  styles.heading14,
                  {
                    color: isSelected === date ? '#000000' : '#C4F601',
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
            console.log(selectedBooking, isSelected),
              navigation.navigate('CreateRoom');
          }}>
          <Text style={[styles.heading14, {color: '#000000'}]}>
            Selanjutnya
          </Text>
        </TouchableOpacity>
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
});

//make this component available to the app
export default BuatRoom;
