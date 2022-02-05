import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserPurchases} from "../api/api";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";

export default function UserPurchasesScreen({navigation}) {
    const [purchases, setPurchases] = useState(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async function getInfo() {
            try {
                const purchases = await getUserPurchases()
                setPurchases(purchases.data);
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
    const getPublicationInfo = (id) => {
        navigation.navigate('PublicationSellInfoScreen', {id, type: 'sale', noActions: true, noteCheck: true, reservationHistory: true})
    }



    const checkInfoFromOwner = (saleId) => {

        navigation.navigate('GetInfoFromOwnerScreen', {id: saleId});
    }

    const giveInfoToOwner = (saleId) => {
        navigation.navigate('GiveInfoToOwnerScreen', {id: saleId});
    }
    const renderItem = ({item}) => {
        console.log(item.realty.publication.publicationId)
        if (item) {
            return (
                <Card mode="outlined" style={{marginTop: 20}} onPress={() => getPublicationInfo(item.realty.publication.publicationId)}>
                    <Card.Content>
                        <Card.Title title={item.realty.publication.publicationTitle} titleStyle={{fontSize: 30}}/>
                        <Card.Content>
                            <Title>{item.realty.publication.description}</Title>
                            <Paragraph>{new Date(item.realty.publication.createdAt).toLocaleDateString('pt-PT')}</Paragraph>
                            <Paragraph>{item.realty.publication.price}$</Paragraph>
                            <Button style={{marginTop: 20, backgroundColor: 'green'}} onPress={() => checkInfoFromOwner(item.saleId)} title="Additional info from owner"/>
                            <Button style={{marginTop: 20, backgroundColor: 'orange'}} onPress={() => giveInfoToOwner(item.saleId)} title="Give info to owner"/>
                        </Card.Content>
                        {/*{item?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}*/}
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
