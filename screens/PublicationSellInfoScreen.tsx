import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Platform, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Swiper from 'react-native-swiper';
import Button from "../components/Button";
import {useEffect, useState} from "react";
import {addToNotes, buyRealty, getPublicationById} from "../api/api";
import {getPublicationInfo} from "../redux/actions/mainActions";
import {showErrorModal, showModal} from "../redux/reducers/mainSlice";
export default function PublicationSellInfoScreen({navigation, route}) {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.main.publication);
    useEffect(() => {
        (async function getPublication() {
            dispatch(getPublicationInfo(route.params.id));
        })()
    }, []);
    const publication = data?.payload;
    const buy = async () => {
        await buyRealty(publication.realty.realtyId)
        navigation.navigate('RealtyOffersScreen');
    }
    const buttonPressHandler = () => {
        // dispatch(showModal('test'));
        switch (route.params.type) {
            case 'rent':
                console.log('fff')
                navigation.navigate('RentScreen', {realtyId: publication.realty.realtyId});
                break;
            case 'sale':
                buy();
        }
    }
    const userInfoPress = () => {
        navigation.navigate('OwnerInfoScreen', {userId: publication.publicant.id, userReview: route.params.reservationHistory || false});
    }
    const addToNotesPress = async () => {
        try {
        await addToNotes(route.params.id)
        } catch (e) {
            if (e.response?.data?.message) {
                dispatch(showModal(e.response?.data?.message))
            } else {
                dispatch(showModal('Something went wrong'))
            }

            console.log(e.response?.data?.message);
        }
    }
    const leaveReview = async () => {
        navigation.navigate('CreatePublicationReviewScreen', {id: route.params.id});
    }
    return (
        <>
            {publication ?
                <>
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={{height: 300}}>
                                <Swiper showsButtons={false} height={250}>
                                    {publication.realty.images.map(img => {
                                        return (
                                            <View key={img.id}>
                                                <Image source={{uri: img.imageUrl}} style={{width: '100%', height: 250}}/>
                                            </View>
                                        )
                                    })}
                                    {/*<Image source={publication[0].realty.} style={{ width: 305, height: 159 }} />*/}
                                </Swiper>
                            </View>
                            {route.params.reservation ||
                            <>
                            {route.params.noActions || <Button style={styles.button} title={route.params.type === 'sale' ? 'Buy' : 'Rent'} onPress={() => buttonPressHandler()}/>}
                                {!route.params.noteCheck && <Button color={{color: '#6200ee'}} style={styles.notesButton} title={'Add To Favourites'} onPress={() => addToNotesPress()}/>}
                            </>}
                            {route.params.reservationHistory && <Button style={styles.button} title={'Leave Review'} onPress={() => leaveReview()}/>}

                            <Text style={styles.date}>Publication created at
                                - {new Date(publication.createdAt).toLocaleDateString('pt-PT')}</Text>
                            <Text style={styles.title}>{publication.publicationTitle}</Text>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Text style={styles.description}>{publication.description}</Text>
                            <Text style={styles.price}>Price
                                - {publication.price}{publication.publicationType === 'sale' ? '$' : '$ / day'}</Text>
                            {/*<Text>{publication[0].address}</Text>*/}
                            <Text style={styles.area}>Area - {publication.realty.area}</Text>
                            <Text style={styles.city}>City - {publication.realty.city}</Text>
                            <Text style={styles.rooms}>Number of rooms - {publication.realty.numberOfRooms}</Text>
                            <Text style={styles.material}>Wall Material - {publication.realty.wallMaterial}</Text>
                            {publication.maxNumberOfPersons && <Text>publication[0].maxNumberOfPersons</Text>}
                            {publication.minNumberOfPersons && <Text>publication[0].minNumberOfPersons</Text>}
                            <TouchableOpacity onPress={userInfoPress}>
                                <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>Owner</Text>
                                <Avatar.Image size={60} source={{uri: `${publication.publicant.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                                <Text>{publication.publicant.name} {publication.publicant.surname}</Text>
                            </TouchableOpacity>
                            <View>
                                { publication?.review.length > 0 ? publication?.review.map(r => {
                                    return (
                                        <Card mode="outlined" key={r.id} style={{marginTop: 20}}>
                                            <Card.Content>
                                                <Title>Review rating - {r.rating}</Title>
                                                <Paragraph>{r.reviewText}</Paragraph>
                                                <Text>{new Date(r.createdAt).toLocaleDateString('pt-PT')}</Text>
                                            </Card.Content>
                                        </Card>
                                    )
                                }) : <Text style={styles.noData}>No reviews</Text>}
                            </View>
                        </View>
                    </ScrollView>
                </> :
                <View style={styles.container}>
                    <Text>No data</Text>
                </View>
            }
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 30
    },
    date: {},
    descriptionTitle: {
        fontSize: 22
    },
    description: {},
    price: {
        fontSize: 18
    },
    area: {
        fontSize: 18
    },
    city: {
        fontSize: 18
    },
    rooms: {
        fontSize: 18
    },
    material: {
        fontSize: 18
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    notesButton: {
      backgroundColor: 'white',
      marginVertical: 10,
      marginHorizontal: 10,
      borderColor: '#6200ee',
      borderWidth: 1,
    },
    noData: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
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
