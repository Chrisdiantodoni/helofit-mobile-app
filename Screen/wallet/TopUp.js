import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Axios, currency} from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';

const transferNum = [
  {
    nominal: 250000,
  },
  {
    nominal: 500000,
  },
  {
    nominal: 1000000,
  },
  {
    nominal: 2000000,
  },
];

const TopUp = ({navigation: {goBack, navigate}}) => {
  const [isSelected, setIsSelected] = useState(true);
  const [nominal, setNominal] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'Transfer Bank BRI',
      value: 'BRI',
    },
  ]);

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
          Isi Saldo Dompet
        </Text>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View style={{marginTop: 32}}>
          <Text style={styles.heading28}>Pilih Metode Pembayaran</Text>
          <DropDownPicker
            style={{
              width: '100%',
              height: 60,
              borderRadius: 16,
              backgroundColor: '#7c7c7c',
              paddingLeft: 22,
              fontSize: 16,
              color: '#FFFFFF',
              marginBottom: 50,
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
        </View>
        <View>
          <Text style={styles.heading28}>Masukkan Nominal</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          <Text style={styles.heading14}>
            Minimal pengisian dompet sebesar Rp.10.000
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          {transferNum.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                borderRadius: 16,
                backgroundColor: '#7c7c7c',
                width: '48%',
                marginTop: 8,
                height: '35%',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor:
                  isSelected && nominal === item.nominal.toString()
                    ? '#C4F601'
                    : '#7c7c7c',
              }}
              onPress={() => {
                setNominal(item.nominal.toString());
                setIsSelected(true);
              }}>
              <Text style={[styles.heading28, {fontSize: 16, marginBottom: 0}]}>
                Rp. {currency(item.nominal)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={nominal == 0 ? true : false}
          onPress={() =>
            navigate('ConfirmTopUp', {
              bank: value,
              Nominal: nominal,
            })
          }>
          <Text
            style={[
              styles.heading28,
              {color: '#000000', marginBottom: 0, fontSize: 16},
            ]}>
            Isi Dompet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopUp;
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
    marginTop: 5,
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
  },
});
