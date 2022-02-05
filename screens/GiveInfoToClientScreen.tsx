import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserPurchases, giveInfoToBuyerOfRealty, giveInfoToOwner} from "../api/api";
import {Avatar, Card, Paragraph, TextInput, Title} from "react-native-paper";
import Button from "../components/Button";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";

export default function GiveInfoToClientScreen({navigation, route}) {
    const [registrationNumber, setRegistrationNumber] = useState<string>('');
    const [flourNumber, setFlourNumber] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');
    const [realtyCondition, setRealtyCondition] = useState<string>('');
    const [buildingNumber, setBuildingNumber] = useState<string>('');
    const dispatch = useAppDispatch();
    const submit = async () => {

        try {
            const res = await giveInfoToBuyerOfRealty({
                registrationNumber,
                flourNumber: Number(flourNumber),
                streetName,
                realtyCondition,
                buildingNumber: Number(buildingNumber)
            }, route.params.id)
            if (res.data) {
                navigation.navigate('HistoryOfPurchasesScreen')
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
            <Text style={{marginTop: 5}}>Registration Number</Text>
            <TextInput style={{marginBottom: 5}} onChangeText={registration => setRegistrationNumber(registration)}/>
            <Text style={{marginTop: 5}}>Flour Number</Text>
            <TextInput style={{marginBottom: 5}} onChangeText={flour => setFlourNumber(flour)}/>
            <Text style={{marginTop: 5}}>Street Name</Text>
            <TextInput style={{marginBottom: 5}} onChangeText={street => setStreetName(street)}/>
            <Text style={{marginTop: 5}}>Realty Condition</Text>
            <TextInput style={{marginBottom: 5}} onChangeText={condition => setRealtyCondition(condition)}/>
            <Text style={{marginTop: 5}}>Building Number</Text>
            <TextInput style={{marginBottom: 5}} onChangeText={building => setBuildingNumber(building)}/>
            <Button style={{marginTop: 10, backgroundColor: 'purple'}} onPress={() => submit()} title="Give Info to owner"/>
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
