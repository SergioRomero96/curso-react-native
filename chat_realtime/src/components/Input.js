import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {Input as InputNB, Box} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Input(props) {
  const {sendMessage} = props;
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    if (message.length > 0) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.contaienr}>
      <InputNB
        InputRightElement={
          <Icon
            name="send"
            style={{marginRight: 8, fontSize: 16, color: '#fff'}}
            onPress={onSubmit}
          />
        }
        borderColor="#16202b"
        color="white"
        placeholderTextColor="grey"
        placeholder="Mensaje..."
        value={message}
        onChange={e => setMessage(e.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16202b',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 20,
  },
});
