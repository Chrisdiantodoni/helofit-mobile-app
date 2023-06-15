import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Onboarding from '../components/Onboarding';
import {Axios, currency} from '../utils';

const DetailFasilitasPage = ({route, navigation: {navigate, goBack}}) => {
  const id = route.params.id;
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({
    id: 1,
    kategori: 'badminton',
  });

  const arrayFacility = [
    {
      id: 1,
      kategori: 'badminton',
    },
    {
      id: 2,
      kategori: 'Futsal',
    },
  ];

  const getDetailMerchant = async () => {
    try {
      const response = await Axios.get(`/merchant/${id}`);
      const data = response.data?.data;
      console.log(data);
      setData(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getHarga = () => {
    return currency(
      data?.facility?.map(item => item.price)?.sort((a, b) => a - b)[0] || 0,
    );
  };

  const getKategori = () => {
    const newCat = [
      ...new Set(
        data?.facility?.map(item => ({
          id: item.category.id,
          kategori: item.category.category_name,
        })),
      ),
    ];

    return newCat;
  };

  useEffect(() => {
    if (getKategori()[0]) {
      setSelected(getKategori()[0]);
    }
    getDetailMerchant();
  }, [id]);

  const handleSelectedFacility = item => {
    setSelected(item);
  };

  const filterFacility = filter => {
    return filter.categoryId === selected?.id;
  };

  const getFeature = item => {
    switch (item?.feature?.feature_name.toLowerCase()) {
      case 'sewa peralatan olahraga':
        return 'shirt-outline';
      case 'makanan dan minuman':
        return 'fast-food-outline';
      case 'tempat beribadah':
        return 'business-outline';
      default:
        return null;
        break;
    }
  };
  return (
    <ScrollView style={styles.container}>
      <HeaderDetailFacility goBack={goBack} data={data} getHarga={getHarga()} />
      {console.log(data?.img_merchant)}
      {/* carousel=================== */}
      <View style={{height: 220}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
          style={{width: '95%', height: 200}}
        />
        {/* <Onboarding data={data} /> */}
      </View>
      {/* <View style={[styles.subContainer3, {marginHorizontal: 0}]}>
      </View> */}

      {/* end carousel ================== */}

      <View
        style={[
          styles.subContainer3,
          {display: 'flex', flexDirection: 'column'},
        ]}>
        <ScrollView horizontal={true}>
          <View style={{flexDirection: 'row'}}>
            {getKategori().map((item, idx) => {
              return (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor:
                      selected?.kategori === item?.kategori
                        ? '#C4f601'
                        : '#000000',
                    borderColor:
                      selected?.kategori === item?.kategori
                        ? '#000000'
                        : '#C4f601',
                    marginRight: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 17,
                    paddingVertical: 8,
                  }}
                  onPress={() => handleSelectedFacility(item)}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        selected?.kategori === item?.kategori
                          ? '#000000'
                          : '#C4f601',
                      fontWeight: '700',
                      fontFamily: 'OpenSans',
                    }}>
                    {item?.kategori}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={{marginTop: 24}}>
          {data?.facility?.filter(filterFacility)?.map(item => {
            console.log({item});
            return (
              <TouchableOpacity
                style={{marginBottom: 15}}
                onPress={() =>
                  navigate('BuatRoom', {
                    price: item?.price,
                    idFacility: item?.id,
                    merchantId: item?.merchantId,
                    img: item?.banner_img
                      ? item?.banner_img
                      : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  })
                }>
                <Image
                  source={{
                    uri: item?.banner_img
                      ? item?.banner_img
                      : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  }}
                  style={{width: 346, borderRadius: 8, height: 89.18}}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 28,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: '80%'}}>
                    <Text style={[styles.heading28, {fontSize: 14}]}>
                      {item.facility_name}
                    </Text>
                    <Text style={[styles.heading28, {fontSize: 14}]}>
                      Rp. {currency(item?.price)}
                      <Text style={[styles.heading14, {fontWeight: '400'}]}>
                        {' '}
                        / {item.uom}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Ionicon
                      name="chevron-forward-outline"
                      size={25}
                      style={{
                        fontWeight: 'bold',
                        color: '#ffffff',
                        paddingRight: 2,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.subContainer3}>
        <Text style={[styles.heading28, {fontSize: 20, marginBottom: 16}]}>
          Prasarana yang tersedia
        </Text>
        {data?.feature?.map((item, idx) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
              marginBottom: 10,
            }}>
            <Ionicon
              name={getFeature(item)}
              size={20}
              style={{color: '#ffffff', marginRight: 10}}
            />
            <Text style={[styles.heading14, {fontSize: 14, fontWeight: '400'}]}>
              {item?.feature?.feature_name}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.subContainer3}>
        <Text style={[styles.heading28, {fontSize: 14}]}>Deskripsi</Text>
        <Text
          style={[
            styles.heading14,
            {fontSize: 14, fontWeight: '400', marginTop: 16},
          ]}>
          {data?.desc}
        </Text>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  subContainer2: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#000000',
    paddingBottom: 23.5,
  },
  subContainer3: {
    marginTop: 8,
    paddingTop: 16,
    borderRadius: 16,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
    lineHeight: 27,
  },
  heading14: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: 'OpenSans',
  },
  capsules: {},
});

//make this component available to the app
export default DetailFasilitasPage;

const HeaderDetailFacility = ({getHarga, goBack, data}) => {
  return (
    <View style={styles.subContainer2}>
      <TouchableOpacity onPress={() => goBack()}>
        <Image
          source={require('../src/X.png')}
          style={{
            width: 24,
            height: 24,
            position: 'absolute',
            top: 50,
          }}
        />
      </TouchableOpacity>
      <View style={{marginTop: 95}}>
        <Text style={styles.heading28}>{data.merchant_name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: '#C4F601',
              fontWeight: '700',
              fontSize: 16,
              marginVertical: 8,
            }}>
            Mulai dari
          </Text>
          <Text
            style={{
              color: '#C4F601',
              marginLeft: 5,
              marginVertical: 2,
              fontSize: 16,
              fontWeight: '700',
            }}>
            Rp. {getHarga}
          </Text>
        </View>
        <Text style={[styles.heading14, {fontSize: 14, fontWeight: '400'}]}>
          {data.category?.category_name}
        </Text>
        <View style={{flexDirection: 'row', paddingBottom: 4, marginTop: 8}}>
          <View
            style={{
              width: '10%',
              alignItems: 'center',
            }}>
            <Ionicon
              name="location-outline"
              size={20}
              style={{fontWeight: 'bold', color: '#ffffff'}}
            />
          </View>
          <View style={{width: '85%'}}>
            <Text style={styles.heading14}>{data?.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
