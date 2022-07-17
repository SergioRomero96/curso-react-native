import React, {useState} from 'react';
import {StyleSheet, LogBox} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import Login from './src/screens/Login';
import Chat from './src/screens/Chat';

LogBox.ignoreAllLogs();

const App = () => {
  const [userName, setUserName] = useState('');
  return (
    <NativeBaseProvider>
      {!userName ? (
        <Login setUserName={setUserName} />
      ) : (
        <Chat userName={userName} />
      )}
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16202b',
    flex: 1,
  },
});
