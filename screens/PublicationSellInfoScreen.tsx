import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useAppSelector} from "../redux/helpers";
import {Card, Paragraph, Title} from "react-native-paper";
import Swiper from 'react-native-swiper';
import Button from "../components/Button";
export default function PublicationSellInfoScreen({navigation, route}) {
    console.log(navigation, route.params.id)
    const publication = useAppSelector(state => state.main.publications.payload.filter(pub => pub.publicationId === route.params.id));
    console.log(publication[0]);
    return (
        <>
        <View style={styles.container}>
            {/*<Card mode="outlined">*/}
            {/*    <Card.Title title={publication[0].publicationTitle} titleStyle={{fontSize: 30}}/>*/}
            {/*    <Card.Content>*/}
            {/*        <Title>Description</Title>*/}
            {/*        <Paragraph>{publication[0].description}</Paragraph>*/}
            {/*        <Paragraph>Price - {publication[0].price}{publication[0].publicationType.includes('Rent') ? '$ / day' : '$'}</Paragraph>*/}
            {/*    </Card.Content>*/}
            {/*    {publication[0]?.realty?.images[0]?.imageUrl ? <Card.Cover source={{ uri: publication[0]?.realty?.images[0]?.imageUrl  }} /> : <Text>{''}</Text>}*/}
            {/*</Card>*/}
            <View style={{height: 300}}>
                <Swiper showsButtons={false} height={250}>
                    {publication[0].realty.images.map(img => {
                        return (
                            <View key={img.id}>
                                <Image source={{uri: img.imageUrl}} style={{ width: '100%', height: 250 }} />
                            </View>
                        )
                    } )}
                    {/*<Image source={publication[0].realty.} style={{ width: 305, height: 159 }} />*/}
                </Swiper>
            </View>
            <Text style={styles.date}>Publication created at - {new Date(publication[0].createdAt).toLocaleDateString('pt-PT')}</Text>
            <Text style={styles.title}>{publication[0].publicationTitle}</Text>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{publication[0].description}</Text>
            <Text style={styles.price}>Price - {publication[0].price}{publication[0].publicationType === 'sale' ? '$' : '$ / day'}</Text>
            {/*<Text>{publication[0].address}</Text>*/}
            <Text style={styles.area}>Area - {publication[0].realty.area}</Text>
            <Text style={styles.city}>City - {publication[0].realty.city}</Text>
            <Text style={styles.rooms}>Number of rooms - {publication[0].realty.numberOfRooms}</Text>
            <Text style={styles.material}>Wall Material - {publication[0].realty.wallMaterial}</Text>
            { publication[0].maxNumberOfPersons && <Text>publication[0].maxNumberOfPersons</Text> }
            { publication[0].minNumberOfPersons && <Text>publication[0].minNumberOfPersons</Text> }
        </View>
        {publication[0].publicationType === 'sale' ? <Button style={styles.button} title={"Buy"}/> : <Button style={styles.button} title={"Rent"}/>}
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
