import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { validateEmail } from '../utils/validations';
import firebase from '../utils/firebase';

const defaultValue = () => {
    return {
        email: '',
        password: '',
        repeatPassword: ''
    }
}

const RegisterForm = (props) => {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const inputElementRef = useRef(null);

    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: { fontFamily: Platform.OS === "android" ? "roboto-regular" : undefined }
        });
    }, []);

    const register = () => {
        let errors = {};
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        } else {
            firebase.auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log('cuenta creada');
                }).catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                        repeatPassword: true
                    });
                });
        }

        setFormError(errors);
        console.log(errors);

    }
    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={e => setFormData({ ...formData, email: e.nativeEvent.text })}
            />
            <TextInput
                ref={inputElementRef}
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={e => setFormData({ ...formData, password: e.nativeEvent.text })}
            />
            <TextInput
                style={[styles.input, formError.repeatPassword && styles.error]}
                placeholder="Repetir contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={e => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
            />
            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeForm}>
                <Text style={[styles.btnText, styles.login]}>Iniciar sesión</Text>
            </TouchableOpacity>
        </>
    );
}

export default RegisterForm;

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18,
    },
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
    login: {
        marginTop: 20
    },
    error: {
        borderColor: '#940c0c'
    }
});