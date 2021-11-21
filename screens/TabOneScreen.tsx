import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useEffect, useState} from "react";
import axios from '../api/configuration';
import Button from "../components/Button";
import {useAppDispatch} from "../redux/helpers";
import {loginUser} from "../redux/actions/userAction";
import {useDispatch} from "react-redux";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  // useEffect(() => {
  //   axios.post('/auth/login', {
  //     "email": "ryatsuniak@gmail.com",
  //     "password": "1234567890"
  //   }).then(res => {
  //     console.log(res.data);
  //   })
  // }, [])
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const submitLoginForm = async () => {
    dispatch(loginUser({email, password}));
  }
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <Text>Email</Text>
        <TextInput onChangeText={loginData => setEmail(loginData)}/>
        <Text>Password</Text>
        <TextInput onChangeText={passwordData => setPassword(passwordData)} secureTextEntry={true} style={styles.passwordField}/>
        <Button title="Login" onPress={submitLoginForm}/>
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
  passwordField: {
    marginBottom: 20,
  }
});
