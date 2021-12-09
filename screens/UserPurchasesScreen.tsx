import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserPurchases} from "../api/api";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";

export default function UserPurchasesScreen({navigation}) {
    const [purchases, setPurchases] = useState(null);
    useEffect(() => {
        (async function getInfo() {
            const purchases = await getUserPurchases()
            setPurchases(purchases.data);
        })()
    }, []);

    const renderItem = ({item}) => {
        console.log(item.realty.publication);
        if (item.realty.publication) {
            return (
                <Card mode="outlined" style={{marginTop: 20}} onPress={() => onPublicationPress(item.publication.publicationId, item.publication.publicationType)}>
                    <Card.Content>
                        <Card.Title title={item.realty.publication.publicationTitle} titleStyle={{fontSize: 30}}/>
                        <Card.Content>
                            <Title>Description</Title>
                            <Paragraph>{item.realty.publication.description}</Paragraph>
                            <Paragraph>Price - {item.realty.publication.price}{item.realty.publication.publicationType.includes('Rent') ? '$ / day' : '$'}</Paragraph>
                        </Card.Content>
                        {item?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}
                    </Card.Content>
                </Card>
            )
        } else
            return <></>
    }
    return (
        <View style={styles.container}>
            {purchases ? <View>
                <FlatList contentContainerStyle={{paddingBottom: 30}} data={purchases || {}} keyExtractor={item => item.saleId} renderItem={renderItem}/>
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
