import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from '../utils/firebase';
import 'firebase/firestore';

// firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase);

const AddBirthday = (props) => {
    const { user, setShowList, setReloadData } = props;
    const [formData, setFormData] = useState({});
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [formError, setFormError] = useState({});

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    }

    const handlerConfirm = (date) => {
        const dateBirth = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormData({ ...formData, dateBirth })
        hideDatePicker();
    }

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = () => {
        let errors = {};
        if (!formData.name || !formData.lastname || !formData.dateBirth) {
            if (!formData.name) errors.name = true;
            if (!formData.lastname) errors.lastname = true;
            if (!formData.dateBirth) errors.dateBirth = true;

        } else {
            const data = formData;
            data.dateBirth.setYear(0);
            db.collection(user.uid).add(data)
                .then(() => {
                    setReloadData(true);
                    setShowList(true);
                }).catch(() => {
                    setFormError({ name: true, lastname: true, dateBirth: true })
                })
        }
        setFormError(errors);
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, formError.name && styles.error]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                    onChange={(e) => onChange(e, 'name')}
                />
                <TextInput
                    style={[styles.input, formError.lastname && styles.error]}
                    placeholder="Apellidos"
                    placeholderTextColor="#969696"
                    onChange={(e) => onChange(e, 'lastname')}
                />
                <View style={[styles.input, styles.datepicker, formError.dateBirth && styles.error]}>
                    <Text
                        style={{
                            color: formData.dateBirth ? '#fff' : '#969696',
                            fontSize: 18
                        }}
                        onPress={showDatePicker}
                    >
                        {formData.dateBirth ?
                            moment(formData.dateBirth).format("LL") :
                            "Fecha de nacimiento"
                        }
                    </Text>
                </View>
                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.addButton}>Crear cumplea??os</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
            />
        </>
    );
}

export default AddBirthday;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    datepicker: {
        justifyContent: 'center',
    },
    addButton: {
        fontSize: 18,
        color: '#fff'
    },
    error: {
        borderColor: '#940c0c'
    }
});