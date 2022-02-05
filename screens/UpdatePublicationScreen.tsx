import React, {useState, useEffect, useRef} from 'react';
import { Image, View, Platform } from 'react-native';
import Button from "../components/Button";
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text} from "../components/Themed";
import {Divider, Menu, TextInput} from "react-native-paper";
import { Button as PaperBtn } from 'react-native-paper';
import {tintColorLight} from "../constants/Colors";
import {createPublication, register, updatePublication} from "../api/api";
import DropDown from "react-native-paper-dropdown";
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {getPublicationInfo} from "../redux/actions/mainActions";
import {showModal} from "../redux/reducers/mainSlice";
export default function UpdatePublicationScreen({route, navigation}) {
    const [publicationTitle, setPublicationTitle] = useState('');
    const [description, setDescription] = useState<string>('');
    const [publicationType, setPublicationType] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [numberOfRooms, setNumberOfRooms] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [wallMaterial, setWallMaterial] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.main.publication?.payload);
    const publicationTitleRef = useRef('');
    useEffect(() => {
        (async function getPublication() {
            dispatch(getPublicationInfo(route.params.id));
        })()
    }, []);
    useEffect(() => {
        if (data) {
            setPublicationTitle(data.publicationTitle)
            setPublicationType(data.publicationType)
            setArea(data.realty.area.toString())
            setWallMaterial(data.realty.wallMaterial)
            setCity(data.realty.city)
            setNumberOfRooms(data.realty.numberOfRooms.toString())
            setPrice(data.price.toString())
            setDescription(data.description)
            // setPublicationTitle(data.publicationTitle)
        }

    }, [data]);

    const submitUserForm = async () => {
        // console.log(props.navigation.navigate('Login'))
        // navigator.navigate('Login')
        // const form_data  = new FormData();
        // if (firstImage) {
        //     form_data.append('photos', {
        //         name: 'photo1.jpg',
        //         type: 'image/jpeg',
        //         uri: firstImage.uri,
        //     })
        // }
        // if (secondImage) {
        //     form_data.append('photos', {
        //         name: 'photo2.jpg',
        //         type: 'image/jpeg',
        //         uri: secondImage.uri,
        //     })
        // }
        // if (thirdImage) {
        //     form_data.append('photos', {
        //         name: 'photo3.jpg',
        //         type: 'image/jpeg',
        //         uri: thirdImage.uri,
        //     })
        // }
        // form_data.append('data', JSON.stringify())
        try {

            const res = await updatePublication(route.params.id, {
                publicationTitle,
                description,
                publicationType,
                price: Number(price),
                realty: {
                    numberOfRooms: Number(numberOfRooms),
                    area: Number(area),
                    wallMaterial,
                    city,
                    address: "testtesttest"
                }
            });
            if (res.data) {
                console.log(res.data);
                navigation.navigate('MyPublicationsScreen')
            }
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
            <View style={{width: '100%'}}>
                <Text>Publication Title</Text>
                <TextInput style={styles.input} value={publicationTitle} onChangeText={name => setPublicationTitle(name)}/>
                <Text>Description</Text>
                <TextInput style={styles.input} value={description} onChangeText={surName => setDescription(surName)}/>
                <Text>Price</Text>
                <TextInput style={styles.input} value={price} onChangeText={description => setPrice(description)}/>
                <Text>Number Of Rooms</Text>
                <TextInput style={styles.input} value={numberOfRooms} onChangeText={email => setNumberOfRooms(email)}/>
                <Text>Area</Text>
                <TextInput style={styles.input} value={area} onChangeText={password => setArea(password)}/>
                <Text>Wall Material</Text>
                <TextInput style={styles.input} value={wallMaterial} onChangeText={password => setWallMaterial(password)}/>
                <Text>City</Text>
                <TextInput style={styles.input} value={city} onChangeText={password => setCity(password)}/>
                <DropDown
                    style={{zIndex: 1000}}
                    label={"Publication Type"}
                    mode={"outlined"}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={publicationType}
                    setValue={setPublicationType}
                    list={[
                        {
                            label: "Rent",
                            value: "rent",
                        },
                        {
                            label: "Sell",
                            value: "sale",
                        }]}
                />
                {/*<PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={() => pickImage(1)}>*/}
                {/*    Pick first photo of realty*/}
                {/*</PaperBtn>*/}
                {/*<PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={() => pickImage(2)}>*/}
                {/*    Pick second photo of realty*/}
                {/*</PaperBtn>*/}
                {/*<PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={() => pickImage(3)}>*/}
                {/*    Pick third photo of realty*/}
                {/*</PaperBtn>*/}
                <Button title="Update Publication" onPress={submitUserForm}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    input: {
        height: 30,
        marginBottom: 5,
    },
    pickAvatar: {
        backgroundColor: tintColorLight,
        marginBottom: 10,
    }
});
