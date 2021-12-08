import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {useEffect} from "react";
import {getNotes, removeNote} from "../redux/actions/mainActions";
import {Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/core";

export default function MyNotesScreen({route, navigation}) {
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const notes = useAppSelector(state => state.main.userNotes);
    useEffect(() => {
        dispatch(getNotes());
    }, []);
    console.log(isFocused);
    useEffect(() => {
        if (isFocused) {
            dispatch(getNotes());
        }
    },[isFocused]);
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const onPublicationPress = (id, type) => {
        navigation.navigate('PublicationSellInfoScreen', {id, type, noteCheck: true})
    }
    const removeFromNotes = (id) => {
        dispatch(removeNote(id));
    }
    console.log('fff');
    const renderItem = ({item}) => {
        return (
            <Card mode="outlined" style={{marginTop: 20}} onPress={() => onPublicationPress(item.publication.publicationId, item.publication.publicationType)}>
                <Card.Title title={item.publication.publicationTitle} titleStyle={{fontSize: 30}}/>
                <Card.Content>
                    <Title>Description</Title>
                    <Paragraph>{item.publication.description}</Paragraph>
                    <Paragraph>Price - {item.publication.price}{item.publication.publicationType.includes('Rent') ? '$ / day' : '$'}</Paragraph>
                </Card.Content>
                {item?.publication?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.publication?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}
                <Button style={{marginTop: 20, backgroundColor: 'red'}} onPress={() => removeFromNotes(item.publication.publicationId)} title="Remove"/>
            </Card>
        )
    }
    return (
        <View style={styles.container}>
                {notes && notes.length > 0? <View>
                    <FlatList contentContainerStyle={{paddingBottom: 30}} data={notes || {}} keyExtractor={item => item.id} renderItem={renderItem}/>
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
