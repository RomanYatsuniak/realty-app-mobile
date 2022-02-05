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
import {createPublication, getMyInfo, register, updatePublication, updateUserInfo} from "../api/api";
import DropDown from "react-native-paper-dropdown";
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {getPublicationInfo} from "../redux/actions/mainActions";
import {useIsFocused} from "@react-navigation/core";
import {showModal} from "../redux/reducers/mainSlice";
export default function UpdateUserInfoScreen({route, navigation}) {
    const [user, setUser] = useState(null);
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async function getInfo() {
            try {
                const userInfo = await getMyInfo()
                setUser({...userInfo.data});
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
    useEffect(() => {
        (async function getInfo() {
            if (isFocused) {
                const userInfo = await getMyInfo()
                setUser({...userInfo.data});
            }
        })()

    },[isFocused]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    useEffect(() => {
        if (user) {
            setName(user.name)
            setSurname(user.surname)
            setPhoneNumber(user.phoneNumber)
            setDescription(user.description)
        }

    }, [user]);

    const submitUserForm = async () => {
        try {
            const res = await updateUserInfo({
                name, surname, description, phoneNumber
            });
            if (res.data) {
                console.log(res.data);
                navigation.navigate('UserInfoScreen')
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
                <Text>Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={name => setName(name)}/>
                <Text>Surname</Text>
                <TextInput style={styles.input} value={surname} onChangeText={surName => setSurname(surName)}/>
                <Text>Phone Number</Text>
                <TextInput style={styles.input} value={phoneNumber} onChangeText={description => setPhoneNumber(description)}/>
                <Text>Description</Text>
                <TextInput style={styles.input} value={description} onChangeText={description => setDescription(description)}/>
                {/*<Text>Number Of Rooms</Text>*/}
                {/*<TextInput style={styles.input} value={numberOfRooms} onChangeText={email => setNumberOfRooms(email)}/>*/}
                {/*<Text>Area</Text>*/}
                {/*<TextInput style={styles.input} value={area} onChangeText={password => setArea(password)}/>*/}
                {/*<Text>Wall Material</Text>*/}
                {/*<TextInput style={styles.input} value={wallMaterial} onChangeText={password => setWallMaterial(password)}/>*/}
                {/*<Text>City</Text>*/}
                {/*<TextInput style={styles.input} value={city} onChangeText={password => setCity(password)}/>*/}
                <Button title="Update User Info" onPress={submitUserForm}/>
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
