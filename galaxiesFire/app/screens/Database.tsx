import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground} from 'react-native';
import axios from "axios";

const Database = () => {
    const [imageNames, setImageNames] = useState([]);
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [folders, setFolders] = useState([]);
    const [output, setOutput] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageLinks, setImageLinks] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const serverBaseURL = 'http://localhost:8000';

    const handleFolderPress = async (folder) => {
        try {
            // Invia una richiesta POST al server con il timestamp della cartella selezionata
            const response = await axios.post('http://localhost:8000/api/images', { timestamp: folder.timestamp });

            // Ottieni i nomi delle immagini dalla risposta del server
            //const imageNames = response.data;
            const immaginiArray = response.data.image_paths


            // Imposta l'elenco delle immagini selezionate e il timestamp corrente
            //setImageNames(imageNames);
            const replaceBackslashes = (path) => {
                return path.replace(/\\/g, '/');
            };

            const updatedPaths = immaginiArray.map(replaceBackslashes);
            console.log('Nomi delle immagini:', updatedPaths);
            setImagePaths(updatedPaths)
            setSelectedTimestamp(folder.timestamp);

        } catch (error) {
            console.error('Errore nella richiesta:', error);
        }
    };

    useEffect(() => {
        // Funzione per ottenere l'elenco delle cartelle dal server
        const fetchFolders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/folders');
                setFolders(response.data);
            } catch (error) {
                console.error('Errore durante la richiesta delle cartelle:', error);
            }
        };
        // Chiama la funzione per ottenere l'elenco delle cartelle all'avvio dell'app
        fetchFolders();

        // Aggiorna l'elenco delle cartelle ogni tot millisecondi (ad esempio, ogni 10 secondi)
        const intervalId = setInterval(fetchFolders, 10000); // Intervallo di 10 secondi

        // Pulisce l'intervallo quando il componente viene smontato
        return () => clearInterval(intervalId);
    }, []);




    return (
        <ImageBackground source={require('../../assets/sfondodatabase.png')} resizeMode='cover' style={styles.container}>

        <Text style ={[styles.text_titolo]}>Storage:</Text>
            <View style={[styles.lista]}>
                <ScrollView >

                    {folders.map((folder, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => handleFolderPress(folder)}>
                                <Text style ={[styles.text_footer,{marginTop:10}, ]}>{folder.timestamp}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View >
                {imagePaths.map((imagePath, index) => (
                    <View style={styles.imageContainer}key={index}>

                        <Image
                            source={{ uri: `${serverBaseURL}${imagePath}` }}
                            style={styles.image}
                        />
                    </View>
                ))}
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    lista:{
        justifyContent: 'center',
        marginLeft: 100,

    },
    container: {
        flex: 1,
        width: 640,
        height: 1000,

    },
    imageNameContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
    },
    imageName: {
        fontSize: 16,
        width: 200, // Larghezza desiderata
        height: 200, // Altezza desiderata
        backgroundColor: '#fbfcfb', // Colore di sfondo
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
    text_titolo: {
        marginLeft: 125,
        color: '#4faacc',
        fontWeight: 'bold',
        fontSize: 35,
        fontFamily: 'lucida grande',
        marginTop: 20
    },
    text_footer: {
        color: '#63c4e8',

        fontSize: 20,
        padding:1,
        fontFamily: 'lucida grande'
    },
    image: {
        width: 400,
        height: 300,
        marginTop: 10,
        marginLeft: 0,
        padding:20
    },
    imageContainer: {
        marginVertical: 40,
        marginTop: 10
    },

});
export default Database;