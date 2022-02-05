import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getActiveReservationsOfMyRealty, getMyInfo, getStatistics, getUserPurchases, getUserSellings} from "../api/api";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";

export default function StatisticsAsOwnerScreen({navigation}) {
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const [statData, setStatData] = useState(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async function getInfo() {
            try {
                const sellsInfo = await getStatistics();
                setStatData(sellsInfo.data);
            } catch (e) {
                if (e.response?.data?.message) {
                    dispatch(showModal(e.response?.data?.message))
                } else {
                    dispatch(showModal('Something went wrong'))
                }

                console.log(e.response?.data?.message);
            }
        })()
    }, []);
    const renderItem = ({item}) => {
        if (item) {
            return (
                <Card mode="outlined" style={{marginTop: 20}} >
                    {/*<Card.Title title={item.publication.publicationTitle} titleStyle={{fontSize: 30}}/>*/}
                    <Card.Content>
                        <Title>Date - {item.date}</Title>

                        <Paragraph>Price in month - {item.price}</Paragraph>
                        <Paragraph>Reservations count in month - {item.count}</Paragraph>
                    </Card.Content>
                </Card>
            )
        }

        return <></>

    }
    console.log(statData)
    return (
        <View style={styles.container}>
            <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>Statistics</Text>
            {statData ? <View>
                <FlatList contentContainerStyle={{paddingBottom: 30}} data={statData.monthStatistics || {}} keyExtractor={(item,index) => item.count + index} renderItem={renderItem}/>
                <Text>Sum cost for all time - {statData.sumCostForAllTime}</Text>
                <Text>Reservations count of all time - {statData.reservationCountOfAllTime}</Text>
            </View> : <View><Text style={styles.title}>No Statistics yet</Text></View>}
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
    text: {
        fontWeight: 'bold',
        fontSize: 16
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
