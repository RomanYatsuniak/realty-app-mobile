import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {useEffect} from "react";
import {
    getMyPublications,
    getNotes,
    getUserPublications,
    removeNote,
    removePublication
} from "../redux/actions/mainActions";
import {Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/core";

export default function MyPublicationsScreen({route, navigation}) {
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const publications = useAppSelector(state => state.main.userPublications);
    useEffect(() => {
        dispatch(getMyPublications());
    }, []);
    useEffect(() => {
        if (isFocused) {
            dispatch(getMyPublications());
        }
    },[isFocused]);
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const onPublicationPress = (id, type) => {
        navigation.navigate('PublicationSellInfoScreen', {id, type, noActions: true, noteCheck: true})
    }
    const updatePublicationData = (id) =>{
        navigation.navigate('UpdatePublicationScreen', {id})
    }
    const removeMyPublication = (id) => {
        dispatch(removePublication(id));
    }
    const renderItem = ({item}) => {
        return (
            <Card mode="outlined" style={{marginTop: 20}} onPress={() => onPublicationPress(item.publicationId, item.publicationType)}>
                <Card.Title title={item.publicationTitle} titleStyle={{fontSize: 30}}/>
                <Card.Content>
                    <Title>Description</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Paragraph>Price - {item.price}{item.publicationType.includes('Rent') ? '$ / day' : '$'}</Paragraph>
                </Card.Content>
                {item?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}
                <Button style={{marginTop: 20, backgroundColor: 'purple'}} onPress={() => updatePublicationData(item.publicationId)} title="Update"/>
                <Button style={{marginTop: 20, backgroundColor: 'red'}} onPress={() => removeMyPublication(item.publicationId)} title="Remove"/>
            </Card>
        )
    }
    return (
        <View style={styles.container}>
            {publications ? <View>
                <FlatList contentContainerStyle={{paddingBottom: 30}} data={publications || {}} keyExtractor={item => item.publicationId} renderItem={renderItem}/>
            </View> : <View><Text style={styles.title}>No Notes</Text></View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
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
