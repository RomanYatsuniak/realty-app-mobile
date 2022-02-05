import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {getMyInfo, getUserSellings, leavePublicationReview, leaveUserReview} from "../api/api";
import {Avatar, TextInput} from "react-native-paper";
import Button from "../components/Button";
import DropDown from "react-native-paper-dropdown";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";

export default function CreatePublicationReviewScreen({navigation, route}) {
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const dispatch = useAppDispatch();
    const leaveReview = async () => {
        try {
            const res = await leavePublicationReview(route.params.id, {reviewText: review, rating});
            console.log(res.data)
            navigation.navigate('RealtyOffersScreen');
        } catch (e) {
            if (e.response?.data?.message) {
                dispatch(showModal(e.response?.data?.message))
            } else {
                dispatch(showModal('Something went wrong'))
            }

            console.log(e.response?.data?.message);
        }

    }
    return (
        <View style={styles.container}>


            <DropDown
                style={{zIndex: 1000}}
                label={"Rating"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={rating}
                setValue={setRating}
                list={[
                    {
                        label: "1",
                        value: 1,
                    },
                    {
                        label: "2",
                        value: 2,
                    },
                    {
                        label: "3",
                        value: 3,
                    },
                    {
                        label: "4",
                        value: 4,
                    },
                    {
                        label: "5",
                        value: 5,
                    },
                ]}
            />
            <Text style={{marginTop: 20}}>Review</Text>
            <TextInput onChangeText={review => setReview(review)}/>
            <Button title={"Leave Review"} style={{marginTop: 40}} onPress={leaveReview}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 28,
        paddingTop: 240
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
