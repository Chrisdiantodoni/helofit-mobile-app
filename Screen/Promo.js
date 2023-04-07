import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {ProgressBar} from 'react-native-paper';
import Svg from 'react-native-svg';
import Modal from 'react-native-modal';

const {width} = Dimensions.get('window');

function Promo({navigation: {goBack, navigate}}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <ScrollView style={styles.container}>
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
      <View>
        <View
          style={{
            backgroundColor: '#000000',
            paddingHorizontal: 16,
            borderRadius: 16,
            paddingVertical: 25,
          }}>
          <TouchableOpacity style={styles.badge}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../src/Reward.png')}
                style={{width: 26, height: 45, marginRight: 20}}
              />
              <View style={{width: '70%'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    fontFamily: 'OpenSans',
                    color: '#FFFFFF',
                    paddingTop: 5,
                  }}>
                  Untuk menikmati promo kecil Ini
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    fontFamily: 'OpenSans',
                    color: '#FFFFFF',
                  }}>
                  poin kamu masih kurang 15 lagi nih
                </Text>
              </View>

              <Ionicon
                name="chevron-forward-outline"
                size={30}
                style={{
                  fontWeight: 'bold',
                  color: '#C4F601',
                  paddingRight: 2,
                  paddingTop: 8,
                  marginLeft: 20,
                }}
              />
            </View>
            <View style={{marginHorizontal: 20}}>
              <ProgressBar
                style={{borderRadius: 8, marginTop: 21}}
                progress={0.5}
                color={'#C4f601'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#000000',
          marginTop: 8,
          paddingHorizontal: 16,
          borderRadius: 16,
          flex: 1,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          <Text style={styles.Heading28}>Puas-puasin main badminton</Text>
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
        <ScrollView
          style={{
            marginVertical: 15,
            height: 138,
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
          <View style={styles.View}>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image
                source={require('../src/Tony-1.png')}
                style={{
                  width: '100%',
                  height: 138,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
              <View style={{position: 'absolute', top: 109, left: 11}}>
                <Text
                  style={[
                    styles.Banner,
                    {textShadowOffset: {width: -2, height: -0.5}},
                  ]}>
                  BANNER PROMO 1
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          <Text style={styles.Heading28}>Futsal jadi lebih murah</Text>
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
        <ScrollView
          style={{
            marginVertical: 15,
            height: 138,
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
          <View style={styles.View}></View>
          <View style={styles.View}></View>
          <View style={styles.View}></View>
        </ScrollView>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          <Text style={styles.Heading28}>Diskon ketika main Basket</Text>
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
        <ScrollView
          style={{
            marginVertical: 15,
            height: 138,
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
          <View style={styles.View}></View>
          <View style={styles.View}></View>
          <View style={styles.View}></View>
        </ScrollView>
      </View>

      <Modal
        isVisible={isVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        animationInTiming={900}
        animationOutTiming={500}
        swipeDirection={'down'}
        backdropOpacity={0.1}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}>
        <View style={styles.Modal}>
          <View
            style={{
              backgroundColor: '#7C7C7C',
              width: 55,
              height: 3,
              marginBottom: 24,
              marginTop: 14,
            }}
          />
          <Image
            source={require('../src/BannerPromo.png')}
            style={{
              resizeMode: 'cover',
              width: '100%',
              borderRadius: 10,
              marginBottom: 24,
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
                Potongan Tarif Lapangan dari 50.000 jadi 35.000/Jam
              </Text>
              <Text
                style={[
                  styles.heading28,
                  {fontSize: 14, lineHeight: 19, color: '#FFFFFF'},
                ]}>
                Berlaku sampai 30 Februari 2023
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                marginTop: 40,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#C4F601',
                      fontSize: 24,
                      fontWeight: '700',
                    }}>
                    15
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

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              marginTop: 24,
            }}>
            <Image
              source={require('../src/Basketball1.png')}
              style={{width: 20, height: 20, marginRight: 11}}
            />
            <Text
              style={[
                styles.heading28,
                {
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#FFFFFF',
                },
              ]}>
              Medan Basket
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 38,
              marginHorizontal: 16,
              backgroundColor: '#C4F601',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginTop: 80,
            }}
            onPress={() => setIsVisible(false)}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '700',
                fontSize: 16,
                alignSelf: 'center',
              }}>
              Tukarkan Poin
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default Promo;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  container: {
    backgroundColor: '#161616',
    flex: 1,
  },
  badge: {
    backgroundColor: '#161616',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingBottom: 28,
    paddingTop: 27,
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
  },
  View: {
    backgroundColor: '#161616',
    width: width - 80,
    borderRadius: 10,
    marginRight: 16,
  },
  Banner: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textShadowColor: '#C4F601',
    textShadowRadius: 0.1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    fontFamily: 'OpenSans',
  },
  Modal: {
    backgroundColor: '#161616',
    borderRadius: 10,
    height: '70%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#C4F601',
    lineHeight: 27,
    alignSelf: 'flex-start',
  },
});
