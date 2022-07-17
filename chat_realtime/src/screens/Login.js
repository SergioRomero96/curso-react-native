import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Input, Text, Button, StatusBar} from 'native-base';
import logoApp from '../assets/chatLogo.png';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Login(props) {
  const {setUserName} = props;
  const [name, setName] = useState('');

  const onSubmit = () => {
    setUserName(name);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#16202b', flex: 1}}>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <View style={styles.container}>
        <View>
          <Image source={logoApp} resizeMode="contain" style={styles.logo} />
          <Text>Hola</Text>
        </View>
        <Input
          placeholder="Nombre de usuario"
          color="white"
          placeholderTextColor="grey"
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
        />
        <Button style={styles.btnLogin} onPress={onSubmit}>
          Entrar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    marginHorizontal: 50,
  },
  logo: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  btnLogin: {
    marginTop: 40,
  },
});
