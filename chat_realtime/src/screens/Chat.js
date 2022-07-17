import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {map} from 'loadsh';
import moment from 'moment';
import Input from '../components/Input';
import firebase from '../utils/firebase';
import 'firebase/database';
import {Box, HStack, StatusBar, Text} from 'native-base';
import Message from '../components/Message';

function AppBar() {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#16202b" />
      <HStack
        bg="#16202b"
        color="white"
        px="1"
        py="3"
        justifyContent="center"
        alignItems="center"
        w="100%">
        <HStack alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Chat App
          </Text>
        </HStack>
      </HStack>
    </>
  );
}

export default function Chat(props) {
  const {userName} = props;
  const [messages, setMessages] = useState([]);
  const chatScrollRef = useRef();

  useEffect(() => {
    const chat = firebase.database().ref('general');
    chat.on('value', snapshot => {
      setMessages(snapshot.val());
    });
  }, []);

  useEffect(() => {
    chatScrollRef.current.scrollToEnd({animated: true})
  }, [messages])
  

  const sendMessage = message => {
    const time = moment().format('hh:mm a');
    firebase.database().ref('general').push({userName, text: message, time});
  };

  return (
    <>
      <AppBar />
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.chatView} ref={chatScrollRef}>
          {map(messages, (message, index) => (
            <Message key={index} message={message} name={userName} />
          ))}
        </ScrollView>
        <Input sendMessage={sendMessage} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#16202b',
  },
  chatView: {
    backgroundColor: '#1b2734',
  },
});
