import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Button from "../components/Button";
import {TextInput} from "react-native-paper";
import {reserveRealty} from "../api/api";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";
export default function RentScreen({navigation, route}) {
    const [rentedFromDay, setRentedFromDay] = useState(null);
    const [rentedFromMonth, setRentedFromMonth] = useState(null);
    const [rentedFromYear, setRentedFromYear] = useState(null);
    const [rentedToDay, setRentedToDay] = useState(null);
    const [rentedToMonth, setRentedToMonth] = useState(null);
    const [rentedToYear, setRentedToYear] = useState(null);
    const [personCount, setPersonCount] = useState(0);
    const dispatch = useAppDispatch();
    const rentRealty = async () => {
        try {
            const data = {
                rentedFrom: `${rentedFromYear}-${rentedFromMonth}-${rentedFromDay}`,
                rentedTo: `${rentedToYear}-${rentedToMonth}-${rentedToDay}`,
                personCount: Number(personCount)
            }
            const res = await reserveRealty(data, route.params.realtyId);
            console.log(res.data);
            navigation.navigate('RealtyOffersScreen');
        } catch (e) {
            if (e.response?.data?.message) {
                dispatch(showModal(e.response?.data?.message))
            } else {
                dispatch(showModal('Something went wrong'))
            }

            console.log(e.response?.data?.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Rented From</Text>
            <View style={styles.fields}>
                <View style={styles.field}>
                    <Text>Year</Text>
                    <TextInput style={[styles.input, styles.mbRight]} onChangeText={year => setRentedFromYear(year)}/>
                </View>
                <View style={styles.field}>
                    <Text>Month</Text>
                    <TextInput style={[styles.input, styles.mbRight]} onChangeText={month => setRentedFromMonth(month)}/>
                </View>
                <View style={styles.field}>
                    <Text>Day</Text>
                    <TextInput style={styles.input} onChangeText={day => setRentedFromDay(day)}/>
                </View>
            </View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Rented To</Text>
            <View style={styles.fields}>
                <View style={styles.field}>
                    <Text>Year</Text>
                    <TextInput style={[styles.input, styles.mbRight]} onChangeText={year => setRentedToYear(year)}/>
                </View>
                <View style={styles.field}>
                    <Text>Month</Text>
                    <TextInput style={[styles.input, styles.mbRight]} onChangeText={month => setRentedToMonth(month)}/>
                </View>
                <View style={styles.field}>
                    <Text>Day</Text>
                    <TextInput style={styles.input} onChangeText={day => setRentedToDay(day)}/>
                </View>
            </View>
            <Text>Person Count</Text>
            <TextInput style={{marginBottom: 30}} onChangeText={count => setPersonCount(count)}/>
            <Button title="Rent" onPress={rentRealty}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 28
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fields: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    field: {
        flex: 1
    },
    mbRight: {
        marginRight: 10
    }
});
