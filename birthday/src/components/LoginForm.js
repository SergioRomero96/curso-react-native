import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../utils/firebase';
import { validateEmail } from '../utils/validations';

const defaultValue = () => ({
    email: '',
    password: ''
})

const LoginForm = (props) => {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log('ok');
                }).catch(() => {
                    setFormError({
                        email: true,
                        password: true
                    })
                })
        }
        setFormError(errors);
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={e => onChange(e, 'email')}
            />
            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={e => onChange(e, 'password')}
            />
            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>
        </>
    );
}

export default LoginForm;

const styles = StyleSheet.create({
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
        fontFamily: 'roboto-regular'
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20
    },
    error: {
        borderColor: '#940c0c'
    }
});