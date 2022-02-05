import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserPurchases, getUserSellings} from "../api/api";
import {Avatar, Card, Paragraph} from "react-native-paper";
import Button from "../components/Button";
import {useAppDispatch} from "../redux/helpers";
import {showModal} from "../redux/reducers/mainSlice";

export default function HistoryOfPurchasesScreen({navigation}) {
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const [sells, setSells] = useState(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async function getInfo() {
            try {
                const sellsInfo = await getUserSellings();
                console.log(sellsInfo.data)
                setSells(sellsInfo.data);
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

    const userInfoPress = (id) => {
        navigation.navigate('OwnerInfoScreen', {userId: id, userReview: false});
    }
    const getPublicationInfo = (id) => {
        navigation.navigate('PublicationSellInfoScreen', {id, type: 'sale', noActions: true, noteCheck: true, reservationHistory: false})
    }
    const giveInfoToBuyer = (id) => {
        navigation.navigate('GiveInfoToClientScreen', {id});
    }
    const getInfoFromBuyer = (id) => {
        navigation.navigate('GetInfoFromClientScreen', {id});
    }
    const renderItem = ({item}) => {
        if (item) {
            return (
                <Card mode="outlined" style={{marginTop: 20}} onPress={() => getPublicationInfo(item.realty.publication.publicationId)}>
                    {/*<Card.Title title={item.publication.publicationTitle} titleStyle={{fontSize: 30}}/>*/}
                    <Card.Content>
                        <TouchableOpacity onPress={() => userInfoPress(item.buyer.id)}>
                        <Avatar.Image size={50} source={{uri: `${item.buyer.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                        </TouchableOpacity>
                        <Paragraph>{item.buyer.name} {item.buyer.surname}</Paragraph>
                        <Paragraph><Text style={styles.text}>Price</Text> - {item.price}</Paragraph>
                        <Button style={{marginTop: 20, backgroundColor: 'green'}} onPress={() => getInfoFromBuyer(item.saleId)} title="Additional info from buyer"/>
                        <Button style={{marginTop: 20, backgroundColor: 'orange'}} onPress={() => giveInfoToBuyer(item.saleId)} title="Give info to buyer"/>
                    </Card.Content>
                </Card>
            )
        }

        return <></>

    }
    return (
        <View style={styles.container}>
            {sells ? <View>
                <FlatList contentContainerStyle={{paddingBottom: 30}} data={sells || {}} keyExtractor={item => item.saleId} renderItem={renderItem}/>
            </View> : <View><Text style={styles.title}>No Purchases</Text></View>}
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
