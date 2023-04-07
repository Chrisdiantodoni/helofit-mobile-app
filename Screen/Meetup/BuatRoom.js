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

// create a component
const BuatRoom = ({navigation}) => {
  const [isSelected, setIsSelected] = useState('2023-03-22');
  // const [dataMitra, setDataMitra] = useState([
  //   {
  //     id: 1,
  //     session: 8,
  //     is_reserved: false,
  //   },
  //   {
  //     id: 2,
  //     session: 9,
  //     is_reserved: true,
  //   },
  //   {
  //     id: 3,
  //     session: 10,
  //     is_reserved: false,
  //   },
  //   {
  //     id: 4,
  //     session: 11,
  //     is_reserved: false,
  //   },
  //   {
  //     id: 5,
  //     session: 12,
  //     is_reserved: false,
  //   },
  //   {
  //     id: 6,
  //     session: 13,
  //     is_reserved: false,
  //   },
  //   {
  //     id: 7,
  //     session: 14,
  //     is_reserved: false,
  //   },
  //   {
  //     id: 8,
  //     session: 15,
  //     is_reserved: false,
  //   },
  // ]);
  const [selectedBooking, setSelectedBooking] = useState([]);
  const [booking, setBooking] = useState([
    {
      id: 1,
      datetime: '08:00',
      time: '08:00',
      bookingDetail: {
        booking_date: '2023-03-22',
        isBooking: true,
      },
    },
    {
      id: 2,
      datetime: '09:00',
      time: '08:00',
      bookingDetail: {
        booking_date: '2023-03-23',
        isBooking: false,
      },
    },
    {
      id: 3,
      datetime: '10:00',
      time: '08:00',
      bookingDetail: {
        booking_date: '2023-03-25',
        isBooking: true,
      },
    },
    {
      id: 4,
      datetime: '11:00',
      time: '08:00',
      bookingDetail: {
        booking_date: '2023-03-22',
        isBooking: false,
      },
    },
  ]);

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
    const findDuplicate = selectedBooking.find(find => find.id === item.id);

    if (!findDuplicate?.id) {
      setSelectedBooking([...selectedBooking, item]);
    } else {
      setSelectedBooking(
        selectedBooking.filter(filter => filter.id !== item.id),
      );
    }
  };

  const validateSelectedBooking = item => {
    const findDuplicate = selectedBooking.find(find => find.id === item.id);

    if (findDuplicate?.id) {
      return findDuplicate?.id;
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
          Rp. 240.000
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
          {arrDay.map((item, idx) => (
            <TouchableOpacity
              onPress={() => setIsSelected(item)}
              style={[
                styles.capsules,
                {
                  backgroundColor: isSelected === item ? '#C4F601' : '#000000',
                  borderColor: '#C4F601',
                },
              ]}>
              <Text
                style={[
                  styles.heading14,
                  {
                    color: isSelected === item ? '#000000' : '#C4F601',
                    fontSize: 12,
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#000000',
            paddingHorizontal: 21,
            paddingBottom: 10,
          }}>
          {booking.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() =>
                  item.bookingDetail.isBooking
                    ? null
                    : handleSelectedBooking(item)
                }
                disabled={item.bookingDetail?.isBooking ? true : false}
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
                    validateSelectedBooking(item) === item.id
                      ? '#c4f601'
                      : 'black',
                }}
                key={item}
                // onPress={handlePress[i]}
              >
                <View>
                  <Text
                    style={[
                      styles.heading14,
                      {
                        color: item.bookingDetail?.isBooking
                          ? '#FFFFFF'
                          : '#C4f601',
                      },
                    ]}>
                    {item.time}
                  </Text>
                  <Text
                    style={[
                      styles.heading14,
                      {
                        color: item.bookingDetail?.isBooking
                          ? '#FFFFFF'
                          : '#C4f601',
                        fontWeight: '400',
                      },
                    ]}>
                    {item.bookingDetail?.isBooking ? 'terisi' : 'tersedia'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
          {/* {jam.map((number, index) => (
            <View key={number}>
              <TouchableOpacity
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
                  borderColor: number == 9 ? '#C4F601' : '#000000',
                }}
                key={number}
                // onPress={handlePress[i]}
              >
                <View>
                  <Text style={[styles.heading14, {color: '#FFFFFF'}]}>
                    {number}.00
                  </Text>
                  <Text
                    style={[
                      styles.heading14,
                      {color: '#FFFFFF', fontWeight: '400'},
                    ]}>
                    {number === 9 ? 'terisi' : 'tersedia'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))} */}
          {/* {dataMitra.map(item => (
            <View key={item.id}>
              <TouchableOpacity
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
                  borderColor: item.is_reserved
                    ? '#000000'
                    : isSelected
                    ? '#C3F601'
                    : '#000000',
                }}
                disabled={item.is_reserved ? true : false}
                key={item.id}
                onPress={() => setIsSelected(item.id)}>
                <View>
                  <Text style={[styles.heading14, {color: '#FFFFFF'}]}>
                    {item.session}.00
                  </Text>
                  <Text
                    style={[
                      styles.heading14,
                      {color: '#FFFFFF', fontWeight: '400'},
                    ]}>
                    {item.is_reserved === true ? 'terisi' : 'tersedia'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))} */}
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
