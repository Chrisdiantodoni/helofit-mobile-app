//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

// create a component
const ProfilSaya = ({navigation: {goBack}}) => {
  const [isEdit, setIsEdit] = useState('#000');
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
          Profil Saya
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={require('../../src/Doni.png')}
          style={{height: 72, width: 72, marginTop: 32}}
        />
        <TouchableOpacity
          style={{flexDirection: 'row', position: 'absolute'}}
          onPress={() => setIsEdit(isEdit => !isEdit)}>
          <Image
            source={require('../../src/Pencil.png')}
            style={{width: 20, height: 20, marginLeft: 280}}
          />
          <Text
            style={[
              styles.Heading28,
              {color: '#C4F601', marginLeft: 5, fontSize: 16},
            ]}>
            Ubah
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 23}}>
        <Text style={[styles.heading14, {marginTop: 57, fontWeight: '400'}]}>
          Username
        </Text>
        <TextInput
          editable={false}
          value={'DoniChrisdianto'}
          style={[
            styles.Heading28,
            {backgroundColor: isEdit ? '#000' : '#161616'},
          ]}
        />
        <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
          Jenis Kelamin
        </Text>
        <TextInput
          editable={false}
          value={'Laki-laki'}
          style={[
            styles.Heading28,
            {backgroundColor: isEdit ? '#000' : '#161616', color: 'white'},
          ]}
        />
        <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
          Umur
        </Text>
        <TextInput
          editable={false}
          value={'23 Tahun'}
          style={[
            styles.Heading28,
            {backgroundColor: isEdit ? '#000' : '#161616', color: 'white'},
          ]}
        />
        <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
          Nomor Handphone
        </Text>
        <TextInput
          editable={false}
          value={'0852-9761-4911'}
          style={[styles.Heading28, {paddingTop: 8}, {backgroundColor: isEdit}]}
        />
        <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
          Bio Singkat
        </Text>
        <TextInput
          editable={false}
          multiline
          value={'Pecinta badminton no 1, kebugaran adalah jalan hidup saya'}
          style={[styles.Heading28, {backgroundColor: isEdit}]}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
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
    fontSize: 14,
    color: '#ffffff',
    paddingHorizontal: 0,
  },
});

//make this component available to the app
export default ProfilSaya;
