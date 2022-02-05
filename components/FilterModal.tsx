import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {hideFilter, hideModal} from "../redux/reducers/mainSlice";
import {Modal, Portal, Text, Button, Provider, TextInput} from 'react-native-paper';
import {filterPublications} from "../redux/actions/mainActions";
import {StyleSheet} from "react-native";

const FilterModal = () => {
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [wallMaterial, setWallMaterial] = useState('');
    const [city, setCity] = useState('');
    const isModalVisible = useAppSelector(state => state.main.filterModalShow);
    const dispatch = useAppDispatch();
    const type = useAppSelector(state => state.main.filterType)
    const submitForm = () => {
        dispatch(filterPublications({
            numberOfRooms: Number(numberOfRooms),
            wallMaterial,
            city
        }, type))
        dispatch(hideFilter())
        setNumberOfRooms('')
        setWallMaterial('')
        setCity('')
    }
    return (
        <Portal>
            <Modal contentContainerStyle={{backgroundColor: 'white', padding: 20}} visible={isModalVisible} onDismiss={() => dispatch(hideFilter())}>
                <Text>Number Of Rooms</Text>
                <TextInput style={styles.input} value={numberOfRooms} onChangeText={rooms => setNumberOfRooms(rooms)}/>
                <Text>Wall Material</Text>
                <TextInput style={styles.input} value={wallMaterial} onChangeText={wallMaterial => setWallMaterial(wallMaterial)}/>
                <Text>City</Text>
                <TextInput style={styles.input} value={city} onChangeText={city => setCity(city)}/>
                <Button style={{marginTop: 30}} onPress={submitForm}>
                    Find
                </Button>
            </Modal>
        </Portal>
    )
}
const styles = StyleSheet.create({
    input: {}
})
export default FilterModal;
