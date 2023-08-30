import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SyaratKetentuan = ({navigation: {goBack}}) => {
  const syarat = [
    {
      text: 'Setiap pengguna dilarang untuk memalsukan identitas akun',
    },
    {
      text: 'Dalam meetup, tidak diperbolehkan untuk membawa teman lebih dari yang didaftarkan pada saat join',
    },
    {
      text: 'Pembatalan join meetup / reservasi hanya diperbolehkan sebanyak 6 kali',
    },
    {
      text: 'Dalam meetup, dilarang untuk melakukan tindakan kekerasan ataupun SARA',
    },
    {
      text: 'Dalam meetup, dilarang untuk membawa senjata tajam, minuman keras atau obat-obatan terlarang',
    },
    {
      text: 'Ketika olahraga, wajib mengikuti ketentuan dari mitra penyedia fasilitas olahraga',
    },
    {
      text: 'Ketika olahraga, tidak boleh melakukan tindakan tidak supportif atau memicu pertikaian',
    },
    {
      text: 'Setiap mitra harus mengisi data informas sumber daya yang dimiliki sesuai dengan sumber daya yang ada',
    },
    {
      text: 'Mitra diharuskan melakukan update terhadap status ketersediaan fasilitas',
    },
    {
      text: 'Mitra penyedia fasilitas olahraga harus bertanggung jawab atas fasilitas mereka, seperti kerusakan fisik, keamanan & keselamatan, pemeliharaan , kebersihan dan sanitasi',
    },
  ];

  return (
    <ScrollView>
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
            Syarat dan Ketentuan
          </Text>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={[styles.heading14, {fontSize: 20, fontWeight: '700'}]}>
            Syarat & Ketentuan
          </Text>
          <Text style={styles.heading14}>
            Demi menjaga keamanan dan kenyamanan serta menghormati pengguna lain
            , Anda diharapkan memperhatikan poin-poin berikut ini :
          </Text>
          {syarat.map((item, idx) => (
            <Text style={styles.heading14}>
              {idx + 1}. {item.text}
            </Text>
          ))}

          <Text style={styles.heading14}>
            Jika ditemukan pelanggaran atas syarat dan ketentuan diatas maka
            pihak pengembang akan melakukan pemblokiran terhadap pengguna atau
            mitra terkait.
          </Text>
          <Text style={styles.heading14}>
            Pelanggaran bisa ditemukan oleh admin atau dilaporkan dalam halaman
            kontak web yang telah disediakan dengan ketentuan pelapor bisa dari
            mitra atau minimal 3 user terkait.
          </Text>
          <Text style={styles.heading14}>
            {`Hormat kami,
Tim Support Helofit`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    paddingTop: 16,
  },
});

//make this component available to the app
export default SyaratKetentuan;
