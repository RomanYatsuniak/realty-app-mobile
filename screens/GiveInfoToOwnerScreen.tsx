import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserPurchases, giveInfoToOwner} from "../api/api";
import {Avatar, Card, Paragraph, TextInput, Title} from "react-native-paper";
import Button from "../components/Button";
import {useAppDispatch} from "../redux/helpers";
import {showModal} from "../redux/reducers/mainSlice";

export default function GiveInfoToOwnerScreen({navigation, route}) {
    const [paymentType, setPaymentType] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const dispatch = useAppDispatch();
    const submit = async () => {

        try {
            const res = await giveInfoToOwner({
                paymentType: paymentType,
                plannedPurchasingDate: `${year}-${month}-${day}`
            }, route.params.id)
            console.log(res.data)
            if (res.data) {
                navigation.navigate('UserPurchasesScreen')
            }
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
            <Text style={{marginTop: 40}}>Payment type</Text>
            <TextInput style={{marginBottom: 40}} onChangeText={payment => setPaymentType(payment)}/>
            <Text>Planned purchasing date</Text>
            <View style={{flexDirection: 'row', justifyContent: "space-between", paddingTop: 20}}>
                <View>
                    <Text>Day</Text>
                    <TextInput style={{width: 70}}onChangeText={day => setDay(day)}/>
                </View>
                <View>
                    <Text>Month</Text>
                    <TextInput style={{width: 70}}onChangeText={month => setMonth(month)}/>
                </View>
                <View>
                    <Text>Year</Text>
                    <TextInput style={{width: 70}}onChangeText={year => setYear(year)}/>
                </View>
            </View>
            <Button style={{marginTop: 20, backgroundColor: 'purple'}} onPress={() => submit()} title="Give Info to owner"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 28
    },
    button: {
        marginBottom: 10,
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
});
