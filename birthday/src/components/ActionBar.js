import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from '../utils/firebase';

const ActionBar = (props) => {
    const { showList, setShowList } = props;

    return (
        <View style={styles.viewFooter}>
            <TouchableOpacity
                style={styles.viewClose}
                onPress={() => firebase.auth().signOut()}
            >
                <Text style={styles.text} >Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.viewAdd}
                onPress={() => setShowList(!showList)}
            >
                <Text style={styles.text} >
                    {showList ? 'Nueva fecha' : 'Cancelar fecha'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default ActionBar;

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#0E161C'
    },
    viewClose: {
        backgroundColor: '#820000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },
    viewAdd: {
        backgroundColor: '#1ea1f2',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    }
});