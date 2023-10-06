import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Image} from 'react-native';
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
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text style={styles.text_header}>Patient Twin</Text>
            </View>
            <View style = {styles.footer}>
                <View >
                    <ScrollView >
                        <Text style ={[styles.text_footer,{marginTop:35}]}>Elenco delle Cartelle:</Text>
                        {folders.map((folder, index) => (
                            <View key={index}>
                                <TouchableOpacity onPress={() => handleFolderPress(folder)}>
                                    <Text style ={[styles.text_footer,{marginTop:35}, ]}>{folder.timestamp}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View >
                    {imagePaths.map((imagePath, index) => (
                        <View key={index}>
                            <Text>{imagePath}</Text>
                            <Image
                                source={{ uri: `${serverBaseURL}${imagePath}` }}
                                style={styles.image}
                            />
                        </View>
                    ))}
                </View>


            </View>
        </View>
    );
}

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
        width: 200, // Larghezza desiderata
        height: 200, // Altezza desiderata
        backgroundColor: '#009387', // Colore di sfondo
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
    },
    imageContainer: {
        marginVertical: 10,
    },

});
export default Database;
