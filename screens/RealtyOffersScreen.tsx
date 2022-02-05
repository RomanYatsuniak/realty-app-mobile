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
import {useIsFocused} from "@react-navigation/core";
import {setPublicationsFromHighToLow, setPublicationsFromLowToHigh, showFilter} from "../redux/reducers/mainSlice";

export default function RealtyOffersScreen({navigation}) {
    const dispatch = useAppDispatch();
    const publications = useAppSelector(state => state.main.publications);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            dispatch(getRealtiesForSale());
        }
    },[isFocused]);
    useEffect(() => {
        // (async function getRentRealties () {
        //
        // })()
        dispatch(getRealtiesForSale());
    }, []);
    const [typeOfPublication, setTypeOfPublication] = useState<string>('Sell Publications');

    const onPublicationPress = (id, type) => {
        // if (typeOfPublication.includes('Sell')) {
        //
        // } else {
        //     navigation.navigate('PublicationRentInfoScreen', {id})
        // }
        navigation.navigate('PublicationSellInfoScreen', {id, type})

    }
    const renderItem = ({item}) => {
        // console.log(item.realty.saleInfo)
        if (item.realty.saleInfo) return;
        return (
            <Card mode="outlined" style={{marginTop: 20}} onPress={() => onPublicationPress(item.publicationId, item.publicationType)}>
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
            <View style={styles.typeButtonGroup}>
                <Button style={{flex: 1, marginRight: 10, backgroundColor: 'purple'}} title="PriceUp" onPress={() => {dispatch(setPublicationsFromLowToHigh())}}/>
                <Button style={{flex: 1, backgroundColor: 'purple'}} title="PriceDown" onPress={() => {dispatch(setPublicationsFromHighToLow())}}/>
            </View>
            <View style={styles.typeButtonGroup}>
                <Button style={{flex: 1, marginRight: 10, backgroundColor: 'brown'}} title="Filter" onPress={() => {dispatch(showFilter(typeOfPublication))}}/>
                <Button style={{flex: 1, backgroundColor: 'brown'}} title="Clear Filter" onPress={() => typeOfPublication.includes('Rent') ? dispatch(getRealtiesForRent()) : dispatch(getRealtiesForSale())}/>
            </View>
            <Text style={styles.typeText}>{typeOfPublication}</Text>
            <View>
                {publications?.length > 0 ?
                <FlatList contentContainerStyle={{paddingBottom: 500}} data={publications || {}} keyExtractor={item => item.publicationId} renderItem={renderItem}/>
                : <Text style={styles.noDataContainer}>No data</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    typeButtonGroup: {
        flexDirection: 'row',
        marginBottom: 20,
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
