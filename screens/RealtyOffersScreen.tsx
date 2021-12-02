import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getRealtiesForRent, getRealtiesForSale} from "../redux/actions/mainActions";
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {Card, Paragraph, Title} from "react-native-paper";
import emptyPublication from './../assets/images/empty-publication-image.jpg';
import Button from "../components/Button";

export default function RealtyOffersScreen({navigation}) {
    const dispatch = useAppDispatch();
    const {payload: publications} = useAppSelector(state => state.main.publications);
    useEffect(() => {
        // (async function getRentRealties () {
        //
        // })()
        dispatch(getRealtiesForSale());
    }, []);
    const [typeOfPublication, setTypeOfPublication] = useState<string>('Sell Publications');

    const onPublicationPress = (id) => {
        // if (typeOfPublication.includes('Sell')) {
        //
        // } else {
        //     navigation.navigate('PublicationRentInfoScreen', {id})
        // }
        navigation.navigate('PublicationSellInfoScreen', {id})

    }
    const renderItem = ({item}) => {
        return (
            <Card mode="outlined" style={{marginTop: 20}} onPress={() => onPublicationPress(item.publicationId)}>
                <Card.Title title={item.publicationTitle} titleStyle={{fontSize: 30}}/>
                <Card.Content>
                    <Title>Description</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Paragraph>Price - {item.price}{typeOfPublication.includes('Rent') ? '$ / day' : '$'}</Paragraph>
                </Card.Content>
                {item?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}

            </Card>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.typeButtonGroup}>
                <Button style={{flex: 1, marginRight: 10}} title="Sell" onPress={() => {setTypeOfPublication('Sell Publications');dispatch(getRealtiesForSale())}}/>
                <Button style={{flex: 1}} title="Rent" onPress={() => {setTypeOfPublication('Rent Publications');dispatch(getRealtiesForRent())}}/>
            </View>
            <Text style={styles.typeText}>{typeOfPublication}</Text>
            <View>
                {publications?.length > 0 ?
                <FlatList contentContainerStyle={{paddingBottom: 300}} data={publications || {}} keyExtractor={item => item.publicationId} renderItem={renderItem}/>
                : <Text style={styles.noDataContainer}>No data</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    typeButtonGroup: {
        flexDirection: 'row',
    },
    container: {
        paddingHorizontal: 10
    },
    typeText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 22,
    },
    noDataContainer: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18
    }
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // title: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    // },
    // separator: {
    //     marginVertical: 30,
    //     height: 1,
    //     width: '80%',
    // },
});
