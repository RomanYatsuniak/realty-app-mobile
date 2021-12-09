import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo} from "../api/api";
import {Avatar} from "react-native-paper";
import Button from "../components/Button";

export default function UserInfoScreen({navigation}) {
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const [user, setUser] = useState(null);
    useEffect(() => {
        (async function getInfo() {
            const userInfo = await getMyInfo()
            setUser({...userInfo.data});
        })()
    }, []);
    const historyOfReservations = () => {
        navigation.navigate('HistoryOfReservationsScreen')
    }

    const historyOfSells = () => {
        navigation.navigate('HistoryOfPurchasesScreen')
    }

    const userBoughts = () => {
        navigation.navigate('UserPurchasesScreen')
    }
    return (
        <View style={styles.container}>
            {user ? <View>
                <Avatar.Image size={120} source={{uri: `${user.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name} {user.surname}</Text>
                <Text>{user.email}</Text>
                <Text>Registered at - {new Date(user.registeredDate).toLocaleDateString('pt-PT')}</Text>
                <Text style={{marginBottom: 30}}>Phone number - {user.phoneNumber}</Text>
                <Button style={styles.button} title="History of reservations" onPress={historyOfReservations}/>
                <Button style={styles.button} title="History of sells" onPress={historyOfSells}/>
                <Button style={styles.button} title="My Purchases" onPress={userBoughts}/>
            </View> : <Text style={styles.title}>No user Info</Text>}
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
