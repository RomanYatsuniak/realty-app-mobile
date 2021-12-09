import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserSellings} from "../api/api";
import {Avatar, Card, Paragraph} from "react-native-paper";
import Button from "../components/Button";

export default function HistoryOfPurchasesScreen({navigation}) {
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const [sells, setSells] = useState(null);
    useEffect(() => {
        (async function getInfo() {
            const sellsInfo = await getUserSellings();
            setSells(sellsInfo.data);
        })()
    }, []);
    const renderItem = ({item}) => {
        return (
            <Card mode="outlined" style={{marginTop: 20}} onPress={() => onPublicationPress(item.publication.publicationId, item.publication.publicationType)}>
                {/*<Card.Title title={item.publication.publicationTitle} titleStyle={{fontSize: 30}}/>*/}
                <Card.Content>
                    <Avatar.Image size={50} source={{uri: `${item.buyer.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                    <Paragraph>{item.buyer.name} {item.buyer.surname}</Paragraph>
                    <Paragraph><Text style={styles.text}>Price</Text> - {item.price}</Paragraph>
                </Card.Content>
            </Card>
        )
    }
    return (
        <View style={styles.container}>
            {sells && sells.length > 0 ? <View>
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
