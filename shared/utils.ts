import {Platform} from "react-native";

export const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('avatar', {
        name: 'test.png',
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};
