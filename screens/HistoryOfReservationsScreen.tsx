import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserHistoryOfReservations} from "../api/api";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";

export default function HistoryOfReservationsScreen({navigation}) {
    const [reservationHistory, setReservationHistory] = useState(null);
    useEffect(() => {
        (async function getInfo() {
            const reservations = await getUserHistoryOfReservations();
            setReservationHistory(reservations.data);
        })()
    }, []);
    const onPublicationPress = (id, type) => {
        navigation.navigate('PublicationSellInfoScreen', {id, type, reservationHistory: true, reservation: true})
    }
    return (

            <View style={styles.container}>
                <ScrollView>
                {reservationHistory && reservationHistory.length > 0?
                    <View>
                        {reservationHistory.map(reservation => {
                            return (
                                <Card mode="outlined" key={reservation.rentId} style={{marginBottom: 20}} onPress={() => onPublicationPress(reservation.realty.publication.publicationId, reservation.realty.publication.publicationType)}>
                                    {/*<Card.Title title={reservation.publication.publicationTitle} titleStyle={{fontSize: 30}}/>*/}
                                    <Card.Content>
                                        <Title>Reservation Info</Title>
                                        <Paragraph>Rented period {new Date(reservation.rentedFrom).toLocaleDateString('pt-PT')} - {new Date(reservation.rentedTo).toLocaleDateString('pt-PT')}</Paragraph>
                                        <Paragraph>Person count - {reservation.personCount}</Paragraph>
                                        <Paragraph>Days count - {reservation.daysCount}</Paragraph>
                                        <Paragraph>Total price for reservation - {reservation.rentPrice}</Paragraph>
                                        {/*<Paragraph>Price - {item.publication.price}{item.publication.publicationType.includes('Rent') ? '$ / day' : '$'}</Paragraph>*/}
                                    </Card.Content>
                                    {/*{item?.publication?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.publication?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}*/}
                                    {/*<Button style={{marginTop: 20, backgroundColor: 'red'}} onPress={() => removeFromNotes(item.publication.publicationId)} title="Remove"/>*/}
                                </Card>
                            )
                        })}
                    </View> : <Text>No Reservations</Text>}
                </ScrollView>
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 28,
        paddingTop: 20,
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
