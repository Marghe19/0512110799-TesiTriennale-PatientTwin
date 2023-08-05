import React, { useEffect, useState } from 'react';
import {View, Image, StyleSheet, ScrollView, Text} from 'react-native';
import axios from "axios";

const Details = () => {
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        const fetchImageLink = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_image_link');
                setImageLink(response.data.link);
            } catch (error) {
                console.error('Error fetching image link:', error);
            }
        };
        fetchImageLink();
    }, []);

    return (
        <View style={styles.container}>
            {imageLink !== '' && (
                <Image source={{ uri: imageLink }} style={styles.image} />
            )}
        </View>
    );
};


export default Details;

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    }
});