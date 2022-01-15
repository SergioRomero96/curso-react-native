import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStack from './HomeStack';
import ContactStack from './ContactStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={HomeStack} options={{ title: 'Home' }} />
            <Tab.Screen name="contact" component={ContactStack} options={{ title: 'Contact' }} />

        </Tab.Navigator>
    )
}

