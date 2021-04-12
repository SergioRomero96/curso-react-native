import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import moment from 'moment';
import Birthday from './BirthDay';

const db = firebase.firestore();

const ListBirthday = (props) => {
    const { user } = props
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        setBirthday([]);
        db.collection(user.uid)
            .orderBy('dateBirth', 'asc')
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                });
                formatData(itemsArray);
            });
        setReloadData(false);
    }, [reloadData]);

    const formatData = (items) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        const birthdayTempArray = [];
        const pastBirthdayTempArray = [];
        items.forEach((item) => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000);
            const dateBirthday = moment(dateBirth);
            const currentYear = moment().get('year');
            dateBirthday.set({ year: currentYear });
            // cuantos dias falta
            const diffDate = currentDate.diff(dateBirthday, 'days');
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            if (diffDate <= 0) {
                birthdayTempArray.push(itemTemp);
            } else {
                pastBirthdayTempArray.push(itemTemp);
            }

        })
        setBirthday(birthdayTempArray);
        setPastBirthday(pastBirthdayTempArray);
    }

    const deleteBirthday = (birthday) => {
        Alert.alert(
            'Eliminar cumpleaños',
            `¿Estas seguro de eliminar el cumpleaño de ${birthday.name} ${birthday.lastname}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        db.collection(user.uid).doc(birthday.id).delete()
                            .then(() => {
                                setReloadData(true);
                            })
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            {showList ? (
                <ScrollView style={styles.scrollView}>
                    {birthday.map((item, index) => (
                        <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                    ))}

                    {pastBirthday.map((item, index) => (
                        <Birthday key={index} birthday={item} deleteBirthday={deleteBirthday} />
                    ))}
                </ScrollView>
            ) : (
                <AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} />
            )}

            <ActionBar showList={showList} setShowList={setShowList} />
        </View>
    );
}

export default ListBirthday;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    scrollView: {
        marginBottom: 80,
        width: '100%'
    }
});