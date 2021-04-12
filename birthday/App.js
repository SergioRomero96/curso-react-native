
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, View, Button, LogBox } from 'react-native';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';
import { decode, encode } from 'base-64';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

LogBox.ignoreAllLogs(true);

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user} /> : <Auth />}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  }
})