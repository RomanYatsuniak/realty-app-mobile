import React from 'react';
import {useAppDispatch, useAppSelector} from "../redux/helpers";
import {hideModal} from "../redux/reducers/mainSlice";
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const DefaultModal = () => {
    const isModalVisible = useAppSelector(state => state.main.modalIsShown);
    const modalData = useAppSelector(state => state.main.modalData);
    const dispatch = useAppDispatch();
    return (
            <Portal>
                <Modal contentContainerStyle={{backgroundColor: 'white', padding: 20}} visible={isModalVisible} onDismiss={() => dispatch(hideModal())}>
                    <Text>{modalData}</Text>
                    <Button style={{marginTop: 30}} onPress={() => dispatch(hideModal())}>
                        OK
                    </Button>
                </Modal>
            </Portal>
    )
}

export default DefaultModal;
