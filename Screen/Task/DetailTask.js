import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// create a component
const DetailTask = ({navigation: {goBack, navigate}}) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../src/FitnessGambar.png')}
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
          <Text style={styles.Heading28}>
            Hanya untuk yang berani aja yang takut minggir
          </Text>
          <Text
            style={[
              styles.heading14,
              {fontSize: 14, fontWeight: '700', marginTop: 8},
            ]}>
            Berlaku sampai 30 Februari 2023
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
              <Text style={styles.heading14}>Gagah Fitness</Text>
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
        <View style={styles.Task}>
          <View style={{paddingLeft: 32, width: '85%'}}>
            <Text style={[styles.heading14, {fontWeight: '700'}]}>20 Kali</Text>
            <Text style={[styles.heading14, {fontWeight: '700'}]}>
              Melakukan Pull up
            </Text>
          </View>
          <Image
            source={require('../../src/CheckGreen.png')}
            style={{width: 32, height: 32}}
          />
        </View>
        <View style={styles.Task}>
          <View style={{paddingLeft: 32, width: '85%'}}>
            <Text style={[styles.heading14, {fontWeight: '700'}]}>20 Kali</Text>
            <Text style={[styles.heading14, {fontWeight: '700'}]}>
              Melakukan Pull up
            </Text>
          </View>
          <Image
            source={require('../../src/CheckGreen.png')}
            style={{width: 32, height: 32}}
          />
        </View>
        <View style={styles.Task}>
          <View style={{paddingLeft: 32, width: '85%'}}>
            <Text style={[styles.heading14, {fontWeight: '700'}]}>20 Kali</Text>
            <Text style={[styles.heading14, {fontWeight: '700'}]}>
              Melakukan Pull up
            </Text>
          </View>
          <Image
            source={require('../../src/Lock.png')}
            style={{width: 32, height: 32}}
          />
        </View>
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
