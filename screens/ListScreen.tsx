import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {useEffect} from "react";
import {getActiveReservations, getNotes, getUserActiveReservations} from "../redux/actions/mainActions";
import {Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";

export default function ListScreen({navigation}) {
    const dispatch = useAppDispatch();
    const reservations = useAppSelector(state => state.main.listOfActiveReservations);
    useEffect(() => {
        dispatch(getActiveReservations());
    }, []);
    const onPublicationPress = (id, type) => {
        navigation.navigate('PublicationSellInfoScreen', {id, type, reservation: true})
    }
    const cancelReservation = (reservationId) => {

    }
    // console.log(navigation.navigate('RealtyOffersScreen'));
    return (
        <ScrollView>
            <View style={styles.container}>
                {reservations && reservations.length > 0 ?
                    <View>
                        {reservations.map(reservation => {
                            return (
                                <Card mode="outlined" key={reservation.rentId} style={{marginTop: 20}} onPress={() => onPublicationPress(reservation.realty.publication.publicationId, reservation.realty.publication.publicationType)}>
                                    {/*<Card.Title title={reservation.publication.publicationTitle} titleStyle={{fontSize: 30}}/>*/}
                                    <Card.Content>
                                        <Title>Reservation Info</Title>
                                        <Paragraph>Rented period {new Date(reservation.rentedFrom).toLocaleDateString('pt-PT')} - {new Date(reservation.rentedTo).toLocaleDateString('pt-PT')}</Paragraph>
                                        <Paragraph>Person count - {reservation.personCount}</Paragraph>
                                        <Paragraph>Days count - {reservation.daysCount}</Paragraph>
                                        <Paragraph>Total price for reservation - {reservation.rentPrice}</Paragraph>
                                        <Button style={{marginTop: 20, backgroundColor: 'red'}} onPress={() => cancelReservation(reservation.rentId)} title="Cancel Reservation"/>
                                        {/*<Paragraph>Price - {item.publication.price}{item.publication.publicationType.includes('Rent') ? '$ / day' : '$'}</Paragraph>*/}
                                    </Card.Content>
                                    {/*{item?.publication?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: item?.publication?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}*/}
                                    {/*<Button style={{marginTop: 20, backgroundColor: 'red'}} onPress={() => removeFromNotes(item.publication.publicationId)} title="Remove"/>*/}
                                </Card>
                            )
                        })}
                        {/*<Text>{JSON.stringify(reservations)}</Text>*/}
                    </View> : <Text>No Reservations</Text>}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
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
