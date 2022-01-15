import React from 'react'
import { Button, Text, View } from "react-native"

const Home = (props) => {
    const { navigation } = props;

    return (
        <View>
            <Text>Home</Text>
            <Button title="Ir a about" onPress={() => navigation.navigate('about')} />
            <Button title="Ir a contact" onPress={() => navigation.navigate('contact')} />
            <Button title="Ir a Courses" onPress={() => navigation.navigate('contact', { screen: 'courses' })} />


        </View>
    );
}

export default Home;