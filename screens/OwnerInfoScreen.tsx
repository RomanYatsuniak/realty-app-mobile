import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {setOwnerInfo} from "../redux/reducers/mainSlice";
import {getOwnerInfo} from "../api/api";
import {getOwner} from "../redux/actions/mainActions";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import Button from "../components/Button";

export default function OwnerInfoScreen({route, navigation}) {
    const user = useAppSelector(state => state.main.ownerInfo);
    // const user = data?.payload;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOwner(route.params.userId));
    }, []);
    const leaveReviewToUser = () => {
        console.log(route.params.userId);
        console.log()
        navigation.navigate('CreateUserReviewScreen', {id: route.params.userId});
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {user ?
                    <View style={{paddingTop: 20,}}>
                        <Avatar.Image size={120} source={{uri: `${user.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                        <Text style={styles.text}>{user.name} {user.surname}</Text>
                        <Text style={styles.text}>Account created at - {new Date(user.registeredDate).toLocaleDateString('pt-PT')}</Text>
                        <Text style={styles.text}>Email - {user.email}</Text>
                        <Text style={styles.text}>Phone - +{user.phoneNumber}</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Description</Text>
                        <Text>{user.description}</Text>
                        {route.params.userReview && <Button style={{marginTop: 20}} title={"Leave Review"} onPress={leaveReviewToUser}/>}
                        <Text style={[styles.text, {textAlign: 'center', marginTop: 20, fontWeight: 'bold'}]}>User Reviews</Text>
                        {user.writtenReview ? user.writtenReview.map((review) => {
                            console.log(review.writtenBy.avatarUrl);
                            return (
                                <Card mode="outlined" key={review.id} style={{marginTop: 20}}>
                                    <Card.Content>
                                        <Avatar.Image size={60} source={{uri: `${review.writtenBy.avatarUrl || 'https://avios.pl/wp-content/uploads/2018/01/no-avatar.png'}`}} />
                                        <Title>Rating - {review.rating}</Title>
                                        <Paragraph>{review.description}</Paragraph>
                                        <Text>{new Date(review.createdAt).toLocaleDateString('pt-PT')}</Text>
                                    </Card.Content>
                                </Card>
                            );
                        }) : <Text>No Reviews yet</Text>}
                    </View>
                    : <Text style={styles.title}>Owner {route.params.userId}</Text>}

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
    text: {
      fontSize: 20,
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
