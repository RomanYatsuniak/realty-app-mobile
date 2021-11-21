import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import Button from "../components/Button";
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text} from "../components/Themed";
import {TextInput} from "react-native-paper";
import { Button as PaperBtn } from 'react-native-paper';
import {tintColorLight} from "../constants/Colors";
import {register} from "../api/api";
export default function TabTwoScreen(props) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const submitUserForm = async () => {
    // console.log(props.navigation.navigate('Login'))
    // navigator.navigate('Login')
    const form_data  = new FormData();
    if (image) {
      form_data.append('avatar', {
        name: 'avatar.jpg',
        type: 'image/jpeg',
        uri: image.uri,
      })
    }
    form_data.append('data', JSON.stringify({
      name,
      surname,
      phoneNumber,
      description,
      auth: {
        email,
        password
      }
    }))
    try {
      const res = await register(form_data);
      if (res.data) {
        console.log(res.data);
        props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  return (
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <Text>Name</Text>
          <TextInput style={styles.input} onChangeText={name => setName(name)}/>
          <Text>Surname</Text>
          <TextInput style={styles.input} onChangeText={surName => setSurname(surName)}/>
          <Text>Phone number</Text>
          <TextInput style={styles.input} onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}/>
          <Text>Description</Text>
          <TextInput style={styles.input} onChangeText={description => setDescription(description)}/>
          <Text>Email</Text>
          <TextInput style={styles.input} onChangeText={email => setEmail(email)}/>
          <Text>Password</Text>
          <TextInput style={styles.input} onChangeText={password => setPassword(password)}/>
          <PaperBtn icon="camera" mode="contained" style={styles.pickAvatar} onPress={pickImage}>
            Pick Avatar
          </PaperBtn>
          <Button title="Register" onPress={submitUserForm}/>
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
    height: 40,
    marginBottom: 10,
  },
  pickAvatar: {
    backgroundColor: tintColorLight,
    marginBottom: 40,
  }
});
