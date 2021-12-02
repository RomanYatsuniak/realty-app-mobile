import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {tintColorLight} from './../constants/Colors';
const DefaultBtn = (props) => {
    return (
        <TouchableOpacity style={[styles.btn, props.style]} onPress={props.onPress}>
            <Text style={styles.text}>{props.title || 'Next'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: tintColorLight,
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        paddingVertical: 20,
        color: 'white'
    }
});

export default DefaultBtn;
