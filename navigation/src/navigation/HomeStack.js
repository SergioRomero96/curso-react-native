import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { Text } from "react-native";

const Stack = createStackNavigator();

export default function HomeStack(props) {
    const { navigation } = props;
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{ title: 'Home', headerLeft: () => <Text onPress={navigation.openDrawer}>MENU</Text>, headerRight: () => <Text>POWER</Text> }} />
            <Stack.Screen name="about" component={About} options={{ title: 'About' }} />
        </Stack.Navigator>
    )
}