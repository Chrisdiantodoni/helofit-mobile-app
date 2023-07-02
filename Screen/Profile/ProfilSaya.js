// import libraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../../utils';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
// create a component
const ProfilSaya = ({navigation}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [imageBlob, setImageBlob] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [checked, setChecked] = useState('first');
  const dataUserAsync = async () => {
    try {
      const res = await AsyncStorage.getItem('dataUser');
      if (res) {
        const userId = JSON.parse(res)?.id;
        console.log(userId);
        getUser(userId);
        setUserId(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async userId => {
    console.log(userId);
    try {
      const response = await Axios.get(`/user/${userId}`);
      console.log(response);
      const data = response?.data;
      if (data?.message === 'OK') {
        setDataUser(data?.data?.user_info);
        console.log('dataUser', data?.data?.user_info);
        setUsername(data?.data?.user_info?.username);
        setPhoto(data?.data?.user_info?.profile_img);
        setGender(data?.data?.user_info?.gender);
        setPhoneNumber(data?.data?.user_info?.phone_number);
        setAge(data?.data?.user_info?.age);
        setBio(data?.data?.user_info?.bio);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source.uri);
        // Do something with the selected image source
        // For example, set it in state to display in your component
        setPhoto(source.uri);
      }
    });
  };

  useEffect(() => {
    dataUserAsync();
  }, []);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('gender', gender);
    formData.append('age', age);
    formData.append('phone_number', phoneNumber);
    formData.append('bio', bio);
    if (photo) {
      const uriParts = photo.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('profile_img', {
        uri: photo,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    try {
      const res = await Axios.put(`/user/${userId}`, formData);
      console.log(res);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
    console.log({formData});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleImageError = () => {
    console.log('Error loading image');
  };
  console.log(photo);

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
          onPress={goBack}>
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
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity disabled={!isEdit} onPress={handleChoosePhoto}>
            <Image
              source={{
                uri: photo
                  ? photo
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
              style={{
                height: 72,
                width: 72,
                marginTop: 32,
                borderRadius: 72 / 2,
                resizeMode: 'cover',
                backgroundColor: '#7c7c7c',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 32,
              right: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setIsEdit(isEdit => !isEdit)}>
            <Image
              source={require('../../src/Pencil.png')}
              style={{width: 20, height: 20}}
            />
            <Text
              style={[
                styles.Heading28,
                {paddingHorizontal: 0, color: '#C4F601', fontSize: 16},
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
            editable={isEdit}
            value={username}
            style={[
              styles.Heading28,
              {backgroundColor: isEdit ? '#161616' : '#000'},
            ]}
            onChangeText={text => setUsername(text)}
          />
          <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
            Jenis Kelamin
          </Text>
          {!isEdit ? (
            <TextInput
              editable={isEdit}
              value={
                gender == 'male'
                  ? 'Laki - Laki'
                  : gender == 'female'
                  ? 'Perempuan'
                  : ''
              }
              style={[
                styles.Heading28,
                {backgroundColor: isEdit ? '#161616' : '#000'},
              ]}
              onChangeText={setAge}
            />
          ) : (
            <RadioButton.Group
              style={[
                styles.Heading28,
                {backgroundColor: isEdit ? '#161616' : '#000'},
              ]}
              onValueChange={newValue => setGender(newValue)}
              value={gender}>
              <RadioButton.Item
                style={[
                  styles.Heading28,
                  {backgroundColor: isEdit ? '#161616' : '#000'},
                ]}
                value="male"
                labelStyle={styles.Heading28}
                label="Laki - Laki"
                color="white"
              />
              <RadioButton.Item
                style={[
                  styles.Heading28,
                  {backgroundColor: isEdit ? '#161616' : '#000'},
                ]}
                value="female"
                labelStyle={styles.Heading28}
                label="Perempuan"
                color="white"
              />
            </RadioButton.Group>
          )}

          <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
            Umur
          </Text>
          <TextInput
            editable={isEdit}
            value={age}
            style={[
              styles.Heading28,
              {backgroundColor: isEdit ? '#161616' : '#000'},
            ]}
            onChangeText={setAge}
          />
          <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
            Nomor Handphone
          </Text>
          <TextInput
            editable={isEdit}
            value={phoneNumber}
            style={[
              styles.Heading28,
              {backgroundColor: isEdit ? '#161616' : '#000'},
            ]}
            onChangeText={text => setPhoneNumber(text)}
          />
          <Text style={[styles.heading14, {fontWeight: '400', marginTop: 24}]}>
            Bio Singkat
          </Text>
          <TextInput
            editable={isEdit}
            value={bio}
            style={[
              styles.Heading28,
              {backgroundColor: isEdit ? '#161616' : '#000'},
            ]}
            onChangeText={text => setBio(text)}
          />
          {isEdit && (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 38,
                backgroundColor: '#C4F601',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
                marginBottom: 30,
              }}
              onPress={() => handleEdit()}>
              <Text
                style={[
                  styles.heading14,
                  {fontWeight: '700', fontSize: 14, color: '#000000'},
                ]}>
                Simpan
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
});

//make this component available to the app
export default ProfilSaya;
