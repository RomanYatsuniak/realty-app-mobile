import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getInfoFromBuyer, getInfoFromOwner, getMyInfo, getUserPurchases, giveInfoToOwner} from "../api/api";
import {Avatar, Card, Paragraph, TextInput, Title} from "react-native-paper";
import Button from "../components/Button";
import {useAppDispatch} from "../redux/helpers";
import {showModal} from "../redux/reducers/mainSlice";

export default function GetInfoFromClientScreen({navigation, route}) {
    const [info, setInfo] = useState(null);
    console.log(route.params.id)
    const dispatch = useAppDispatch();
    const getInfo = async () => {
        try {
            const res = await getInfoFromBuyer(route.params.id);
            setInfo(res.data[0]);
        } catch (e) {
            if (e.response?.data?.message) {
                dispatch(showModal(e.response?.data?.message))
            } else {
                dispatch(showModal('Something went wrong'))
            }

            console.log(e.response?.data?.message);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    if (!info) {
        return <View>
            <Text style={{marginTop: 40, textAlign: 'center'}}>No Info yet</Text>
        </View>
    }
    return (
        <View style={styles.container}>
            <View style={{paddingTop: 30}}>
                <Text style={styles.info}>Payment Type - {info.paymentType}</Text>
                <Text style={styles.info}>Planned Date - {new Date(info.plannedPurchasingDate).toLocaleDateString('pt-PT')}</Text>
            </View>
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
    info: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
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
