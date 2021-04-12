import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView bounces={false}>
                <View style={styles.view}>
                    <Image style={styles.logo} source={require('../assets/logo.png')} />
                    {isLogin ? (
                        <LoginForm changeForm={changeForm} />
                    ) : (
                        <RegisterForm changeForm={changeForm} />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

export default Auth;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50
    }
});