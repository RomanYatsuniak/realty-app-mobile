import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {FlatList, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getActiveReservationsOfMyRealty, getMyInfo, getUserPurchases, getUserSellings} from "../api/api";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";

export default function ActiveReservationsOfMyRealty({navigation}) {
    // console.log(navigation.navigate('RealtyOffersScreen'));
    const [activeReservations, setActiveReservations] = useState(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async function getInfo() {
            try {
                const sellsInfo = await getActiveReservationsOfMyRealty();
                setActiveReservations(sellsInfo.data);
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
    const renderItem = ({item}) => {
        if (item) {
            return (
                <Card mode="outlined" style={{marginTop: 20}} >
                    {/*<Card.Title title={item.publication.publicationTitle} titleStyle={{fontSize: 30}}/>*/}
                    <Card.Content>
                        <Title>Reservation Info</Title>
                        <Paragraph>Rented period {new Date(item.rentedFrom).toLocaleDateString('pt-PT')} - {new Date(item.rentedTo).toLocaleDateString('pt-PT')}</Paragraph>
                        <Paragraph>Person Count - {item.personCount}</Paragraph>
                        <Paragraph>Price - {item.rentPrice}$</Paragraph>
                        <Paragraph>Days - {item.daysCount}</Paragraph>
                        <TouchableOpacity onPress={() => userInfoPress(item.tenant.id)}>
                            <Avatar.Image size={50} source={{uri: `${item.tenant.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                            <Text>{item.tenant.name} {item.tenant.surname}</Text>
                        </TouchableOpacity>

                        {/*<Paragraph>{item.buyer.name} {item.buyer.surname}</Paragraph>*/}
                        {/*<Paragraph><Text style={styles.text}>Price</Text> - {item.price}</Paragraph>*/}
                    </Card.Content>
                </Card>
            )
        }

        return <></>

    }
    console.log(activeReservations)
    return (
        <View style={styles.container}>
            {activeReservations ? <View>
                <FlatList contentContainerStyle={{paddingBottom: 30}} data={activeReservations || {}} keyExtractor={item => item.rentId} renderItem={renderItem}/>
            </View> : <View><Text style={styles.title}>No Reservations</Text></View>}
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
