import {View, Text, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp} from "@react-navigation/native";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import axios from "axios";
import {render} from "react-dom";

interface RouterProps{
    navigation: NavigationProp<any, any>;
}

const Home = ({navigation}:RouterProps) => {
    const [output, setOutput] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageLinks, setImageLinks] = useState([]);

    /*useEffect(() => {
        const fetchImageLink = async () => {
            try {
                const serverBaseURL = 'http://localhost:8000';
                const response = await axios.get(`${serverBaseURL}/get_image_link`);
                setImageLinks(`${serverBaseURL}${response.data.links}`);
                console.log(`${serverBaseURL}${response.data.links}`);
                console.log(response);
            } catch (error) {
                console.error('Error fetching image link:', error);
            }
        };
        fetchImageLink();
    }, []);*/




    /*useEffect(() => {
        // Effettua una richiesta POST all'API Flask per ottenere gli array di percorsi delle immagini
        fetch('http://localhost:8000/api/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ timestamp: 'selectedTimestamp' }), // Sostituisci con il timestamp desiderato
        })
            .then((response) => response.json())
            .then((data) => {
                setImagePaths(data);
            })
            .catch((error) => console.error(error));
    }, []);*/




    const startScript = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/start_script');
            console.log(response);
        } catch (error) {
            console.error('Errore durante la chiamata API:', error);
        }
    };

    const cardio = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/cardio');
            console.log(response);
        } catch (error) {
            console.error('Errore durante la chiamata API:', error);
        }
    };

    const dkd = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/dkd');
            console.log(response);
        } catch (error) {
            console.error('Errore durante la chiamata API:', error);
        }
    }


    return(
        <View style={styles.container}>

            <View style = {styles.header}>
                <Text style={styles.text_header}>Patient Twin</Text>
            </View>

            <View style = {styles.footer}>
                <View>
                        <Button color={'#009387'} title="Nuova pagina" onPress={() => navigation.navigate('Database')}/>

                </View>

                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style ={[styles.text_footer,{marginTop:35}]}>Avvia il Patient Twin </Text>
                    <Button color={'#009387'} title="Start" onPress={startScript} />
                    <Text style ={[{marginTop:35}]}> </Text>
                    <Text>{output}</Text>
                    <Text style ={[styles.text_footer,{marginTop:35}]}>CARDIO </Text>
                    <Button color={'#009387'} title="Start" onPress={cardio} />
                    <Text style ={[{marginTop:35}]}> </Text>
                    <Text>{output}</Text>
                    <Text style ={[styles.text_footer,{marginTop:35}]}>DKD </Text>
                    <Button color={'#009387'} title="Start" onPress={dkd} />
                    <Text style ={[{marginTop:35}]}> </Text>
                    <Text>{output}</Text>
                    <Button color={'#009387'} onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>

                </View>

            </View>


        </View>
    );
};


export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    imageNameContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
    },
    imageName: {
        fontSize: 16,
    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 25
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontWeight: 'bold',
        fontSize: 15
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    imageContainer: {
        marginVertical: 10,
    }
});