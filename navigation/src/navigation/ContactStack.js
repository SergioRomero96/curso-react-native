import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import Contact from "../screens/Contact";
import Courses from "../screens/Courses";

const Stack = createStackNavigator();

export default function ContactStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="contact" component={Contact} options={{ title: 'Contact' }} />
            <Stack.Screen name="courses" component={Courses} options={{ title: 'Courses' }} />
        </Stack.Navigator>
    )
}