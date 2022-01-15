import React from 'react'
import { Button, Text, View } from "react-native"

const Contact = (props) => {
    const { navigation } = props;
    return (
        <View>
            <Text>Contact</Text>
            <Button title="About" onPress={() => navigation.navigate('about')} />
        </View>
    );
}

export default Contact;