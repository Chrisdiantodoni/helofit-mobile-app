import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Axios} from '../../utils';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const DetailTask = ({navigation: {goBack, navigate}}) => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState({});

  const getDetailTask = async () => {
    try {
      const id = dataUser?.id;
      const {data} = await Axios.get(`/task/progress/${id}`);
      if (data.message === 'OK') {
        setData(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailTask();
    AsyncStorage.getItem('dataUser').then(res => {
      setDataUser(JSON.parse(res));
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: data?.banner_img}}
        style={{width: '100%', height: 188}}
      />
      <TouchableOpacity onPress={() => goBack()}>
        <Image
          source={require('../../src/X.png')}
          style={{
            width: 24,
            height: 24,
            position: 'absolute',
            top: -130,
            left: 20,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: '#000000',
          borderRadius: 16,
          paddingBottom: 30,
        }}>
        <View style={{marginTop: 24, width: '80%'}}>
          <Text style={styles.Heading28}>{data[0].task_name}</Text>
          <Text
            style={[
              styles.heading14,
              {fontSize: 14, fontWeight: '700', marginTop: 8},
            ]}>
            Berlaku sampai {moment(data[0].expiredIn).format('DD MMMM YYYY')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 11,
            }}>
            <View style={{width: '105%', flexDirection: 'row'}}>
              <Image
                source={require('../../src/Fitness-Icon.png')}
                style={{height: 24, width: 24, marginRight: 8}}
              />
              <Text style={styles.heading14}>
                {data?.merchant?.merchant_name}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: '#C4F601',
                    fontSize: 24,
                    fontWeight: '700',
                  }}>
                  {data?.poin}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#C4F601',
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  POIN
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#000000',
          marginTop: 8,
          borderRadius: 16,
          paddingTop: 16,
          paddingHorizontal: 16,
        }}>
        <Text style={[styles.Heading28, {color: '#FFF', marginBottom: 24}]}>
          Task yang harus dikerjakan
        </Text>
        {data.map((item, idx) => (
          <View style={styles.Task}>
            <View style={{paddingLeft: 32, width: '85%'}}>
              <Text style={[styles.heading14, {fontWeight: '700'}]}>
                {item?.list_task[0].task_name}
              </Text>
            </View>
            <Image
              source={require('../../src/CheckGreen.png')}
              style={{width: 32, height: 32}}
            />
          </View>
        ))}
      </View>
      <View
        style={{
          backgroundColor: '#000',
          height: 70,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 16,
          marginTop: 8,
        }}>
        <TouchableOpacity
          style={{
            height: 38,
            backgroundColor: '#C4F601',
            borderRadius: 8,
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigate('Tabs', {screen: 'Task'})}>
          <Text style={[styles.Heading28, {color: '#000000'}]}>
            Lanjut Mengerjakan Task
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#C4F601',
  },
  Task: {
    paddingBottom: 18,
    backgroundColor: '#161616',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    marginBottom: 16,
  },
});

export default DetailTask;
