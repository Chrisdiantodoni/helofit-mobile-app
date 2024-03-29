import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Axios, currency} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const {width} = Dimensions.get('window');

function Task({navigation: {navigate, goBack, addListener}, route}) {
  const [taskItem, setTaskItem] = useState([]);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      const userId = JSON.parse(res)?.id;
      console.log(userId);
      getUserTask(userId);
    });
  };
  const getUserTask = async userId => {
    try {
      if (userId) {
        const {data} = await Axios.get(`/task/progress2/${userId}`);
        console.log('inni data', data);
        if (data.message === 'OK') {
          setData(data.data);
          console.log({data: data.data});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    try {
      const response = await Axios.get('/task');
      const data = response.data?.data?.result;
      setTaskItem(data || []);
      console.log('dataTask', data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getTask();
      dataUserAsync();
    });
    return unsubscribe;
  }, [addListener]);

  const displayIcon = () => {
    switch (key) {
      case value:
        break;

      default:
        break;
    }
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
          List Task
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Task sedang berjalan</Text>
          <Text style={styles.subheader}>
            Lanjutkan task yang sudah kamu lalui
          </Text>
        </View>
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
          {data?.filter(filter => filter.expiredInDays >= 0).length > 0 ? (
            data
              ?.filter(filter => filter.expiredInDays >= 0)
              .map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.View}
                  onPress={() =>
                    navigate('DetailTask', {
                      taskId: item?.taskId,
                      userId: item?.userId,
                    })
                  }>
                  <Image
                    source={{
                      uri: item?.task.banner_img
                        ? item?.task.banner_img
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
                    }}>
                    {item.task?.task_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 15,
                      marginTop: 4,
                      fontWeight: '400',
                      fontFamily: 'OpenSans',
                      marginBottom: 24,
                      color: '#FFFFFF',
                    }}>
                    {item?.expiredInDays == 0
                      ? 'Berakhir Hari Ini'
                      : `Berakhir dalam ${item?.expiredInDays} hari lagi`}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../src/Merchant.png')}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 11,
                        resizeMode: 'stretch',
                      }}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{width: '80%'}}>
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 12,
                            color: '#ffffff',
                            fontFamily: 'OpenSans',
                          }}>
                          {item.task?.merchant?.merchant_name}
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
                              fontSize: 20,
                              fontWeight: '700',
                              fontFamily: 'OpenSans',
                            }}>
                            {currency(item?.task?.poin)}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#C4F601',
                              fontSize: 12,
                              fontWeight: '700',
                              fontFamily: 'OpenSans',
                            }}>
                            POIN
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Tidak terdapat task yang sedang berjalan
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          marginTop: 8,
          paddingTop: 24,
          backgroundColor: '#000000',
          paddingHorizontal: 16,
          borderRadius: 16,
        }}>
        <Text style={styles.header}>Suka Tantangan Wajib Coba</Text>
        <Text style={styles.subheader}>
          Dapatkan poin dari task yang kamu kerjakan
        </Text>
        <FlatList
          data={taskItem.filter(
            item => moment(item.expiredIn) >= moment().startOf('day'),
          )}
          renderItem={({item, index}) => (
            <View key={index} style={styles.listContainer}>
              <TouchableOpacity
                style={styles.View1}
                onPress={() => navigate('DetailEachTask', {taskId: item.id})}>
                <Image
                  source={{
                    uri: item?.banner_img
                      ? item?.banner_img
                      : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  }}
                  style={{width: '100%', height: 171, borderRadius: 10}}
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
                    source={require('../src/Merchant.png')}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 11,
                      resizeMode: 'stretch',
                    }}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '80%',
                      }}>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 12,
                          color: '#ffffff',
                          fontFamily: 'OpenSans',
                        }}>
                        {item.merchant?.merchant_name}
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
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          {currency(item?.poin)}
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
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 18,
                    marginHorizontal: 10,
                  }}>
                  {item?.list_task
                    ? item?.list_task?.slice(0, 2)?.map((itemTask, idxTask) => (
                        <View
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
                          <Text style={{fontSize: 12, fontWeight: '400'}}>
                            {idxTask + 1} {'.'}{' '}
                            {itemTask.task_name.slice(0, 10)}
                            {'...'}
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
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
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
    width: width - 80,
    borderRadius: 10,
    marginRight: 16,
  },
  View1: {
    backgroundColor: '#161616',
    borderRadius: 10,
    marginBottom: 16,
  },
  listContainer: {
    borderRadius: 16,
    marginTop: 24,
    backgroundColor: '#000000',
    flex: 1,
  },
});

export default Task;
