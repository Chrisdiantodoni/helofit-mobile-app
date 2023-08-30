import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Axios, currency} from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Withdraw = ({navigation: {goBack, navigate, addListener}}) => {
  const [dataUser, setDataUser] = useState({});

  const [nominal, setNominal] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'Transfer Bank BRI',
      value: 'BRI',
    },
  ]);
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      const userId = JSON.parse(res)?.id;
      console.log(userId);
      getUser(userId);
    });
  };

  const getUser = async userId => {
    console.log(userId);
    try {
      const response = await Axios.get(`/user/${userId}`);
      console.log(response);
      const data = response?.data;
      if (response?.data?.message === 'OK') {
        setDataUser(data?.data?.user_info);
        console.log('dataUser', data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async () => {
    const userId = dataUser?.id;
    const body = {
      nominal: parseInt(nominal),
    };
    if (parseInt(nominal) >= 100000) {
      await Axios.put(`/wallet/withdraw/${userId}`, body)
        .then(res => {
          if (res) {
            Alert.alert('Selamat Dana anda berhasil di tarik dari dompet kamu');
            replace('Tabs');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Alert.alert('Penarikan tidak sesuai ketentuan');
    }

    console.log({body});
  };
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      dataUserAsync();
    });
    return unsubscribe;
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
          Tarik Saldo Dompet
        </Text>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View style={{marginTop: 32}}>
          <Text style={styles.heading28}>Dompet Olahragamu</Text>
          <Text
            style={[
              styles.heading28,
              {fontSize: 24, color: '#C4F601', marginBottom: 0},
            ]}>
            Rp. {currency(dataUser?.balance)}
          </Text>
        </View>
        <Text style={[styles.heading28, {marginTop: 18}]}>
          Masukkan Nominal Penarikan
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 60,
          }}>
          <View
            style={{
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              backgroundColor: '#7c7c7c',
              paddingLeft: 22,
              height: 60,
              justifyContent: 'center',
              width: '15%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
              Rp.
            </Text>
          </View>
          <TextInput
            style={styles.textInput}
            value={nominal}
            keyboardType="number-pad"
            onChangeText={text => setNominal(text)}
          />
        </View>
        <View>
          <Text style={[styles.heading28, {fontSize: 20, marginBottom: 0}]}>
            Transfer ke Rekening
          </Text>
          <Text style={[styles.heading28, {fontSize: 16, marginVertical: 8}]}>
            Bank Tujuan
          </Text>
          <DropDownPicker
            style={{
              width: '100%',
              height: 60,
              borderRadius: 16,
              backgroundColor: '#7c7c7c',
              paddingLeft: 22,
              fontSize: 16,
              color: '#FFFFFF',
              marginBottom: 8,
            }}
            placeholderStyle={{
              color: '#FFFFFF',
              fontSize: 16,
            }}
            listItemLabelStyle={{
              fontWeight: '700',
              color: '#FFFFFF',
              fontSize: 16,
            }}
            listItemContainer={{
              height: 40,
              backgroundColor: '#7c7c7c',
              color: '#FFFFFF',
            }}
            selectedItemLabelStyle={{
              fontWeight: '700',
              color: '#FFFFFF',
              fontSize: 16,
            }}
            selectedItemContainerStyle={{
              height: 40,
              backgroundColor: '#7c7c7c',
              color: '#FFFFFF',
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          <Text style={[styles.heading28, {fontSize: 16, marginVertical: 8}]}>
            Nomor Rekening
          </Text>
          <TextInput
            style={{
              backgroundColor: '#7C7c7c',
              borderRadius: 16,
              height: 60,
              color: '#FFFFFF',
              width: '100%',
              paddingLeft: 20,
              fontSize: 16,
            }}
            value={'987654321098676'}
            disabled
            keyboardType="number-pad"
            onChangeText={text => setNominal(text)}
          />
          <Text style={[styles.heading28, {fontSize: 16, marginVertical: 8}]}>
            Atas Nama
          </Text>
          <TextInput
            style={{
              backgroundColor: '#7C7c7c',
              borderRadius: 16,
              height: 60,
              color: '#FFFFFF',
              width: '100%',
              paddingLeft: 20,
              fontSize: 16,
            }}
            value={'Doni Chrisdianto K'}
            disabled
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={nominal == 0 ? true : false}
          onPress={handleWithdraw}>
          <Text
            style={[
              styles.heading28,
              {color: '#000000', marginBottom: 0, fontSize: 16},
            ]}>
            Tarik Saldo Dompet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => replace('Tabs')}>
          <Text
            style={[
              styles.heading28,
              {color: '#FF424D', marginBottom: 0, fontSize: 16},
            ]}>
            Batal Tarik
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Withdraw;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  centeredText: {
    flex: 1,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  textInput: {
    backgroundColor: '#7C7c7c',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    height: 60,
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'right',
    paddingRight: 20,
    fontSize: 16,
    width: '85%',
  },
  heading14: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#ffffff',
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    marginBottom: 16,
  },
  buttonGroup: {
    marginTop: 44,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#C4F601',
    paddingVertical: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 32,
  },
  button2: {
    width: '100%',
    height: 60,
    backgroundColor: '#161616',
    marginTop: 10,
    paddingVertical: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
