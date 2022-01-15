import React from 'react'
import { Button, Text, View } from "react-native"

const About = (props) => {
    const { navigation } = props;
    return (
        <View>
            <Text>About</Text>
            <Button title="Contact" onPress={() => navigation.navigate('contact')} />
        </View>
    );
}

export default About;