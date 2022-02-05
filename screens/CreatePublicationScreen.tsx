import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import Button from "../components/Button";
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text} from "../components/Themed";
import {Divider, Menu, TextInput} from "react-native-paper";
import { Button as PaperBtn } from 'react-native-paper';
import {tintColorLight} from "../constants/Colors";
import {createPublication, register} from "../api/api";
import DropDown from "react-native-paper-dropdown";
import {showModal} from "../redux/reducers/mainSlice";
import {useAppDispatch} from "../redux/helpers";
export default function TabTwoScreen(props) {
    const [publicationTitle, setPublicationTitle] = useState(null);
    const [description, setDescription] = useState<string>('');
    const [publicationType, setPublicationType] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [numberOfRooms, setNumberOfRooms] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [wallMaterial, setWallMaterial] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [firstImage, setFirstImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [thirdImage, setThirdImage] = useState(null);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async (number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(number, ' - numberr');
            switch (number) {
                case 1:
                    setFirstImage(result);
                    break;
                case 2:
                    setSecondImage(result);
                    break;
                case 3:
                    setThirdImage(result);
                    break;
                default:
                    break;
            }

        }
    };

    const submitUserForm = async () => {
        // console.log(props.navigation.navigate('Login'))
        // navigator.navigate('Login')
        const form_data  = new FormData();
        if (firstImage) {
            form_data.append('photos', {
                name: 'photo1.jpg',
                type: 'image/jpeg',
                uri: firstImage.uri,
            })
        }
        if (secondImage) {
            form_data.append('photos', {
                name: 'photo2.jpg',
                type: 'image/jpeg',
                uri: secondImage.uri,
            })
        }
        if (thirdImage) {
            form_data.append('photos', {
                name: 'photo3.jpg',
                type: 'image/jpeg',
                uri: thirdImage.uri,
            })
        }
        form_data.append('data', JSON.stringify({
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
        }))
        try {

            const res = await createPublication(form_data);
            if (res.data) {
                console.log(res.data);
                props.navigation.navigate('RealtyOffersScreen')
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
                <TextInput style={styles.input} onChangeText={name => setPublicationTitle(name)}/>
                <Text>Description</Text>
                <TextInput style={styles.input} onChangeText={surName => setDescription(surName)}/>
                <Text>Price</Text>
                <TextInput style={styles.input} onChangeText={description => setPrice(description)}/>
                <Text>Number Of Rooms</Text>
                <TextInput style={styles.input} onChangeText={email => setNumberOfRooms(email)}/>
                <Text>Area</Text>
                <TextInput style={styles.input} onChangeText={password => setArea(password)}/>
                <Text>Wall Material</Text>
                <TextInput style={styles.input} onChangeText={password => setWallMaterial(password)}/>
                <Text>City</Text>
                <TextInput style={styles.input} onChangeText={password => setCity(password)}/>
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
                <PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={() => pickImage(1)}>
                    Pick first photo of realty
                </PaperBtn>
                <PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={() => pickImage(2)}>
                    Pick second photo of realty
                </PaperBtn>
                <PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={() => pickImage(3)}>
                    Pick third photo of realty
                </PaperBtn>
                <Button title="Create Publication" onPress={submitUserForm}/>
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
