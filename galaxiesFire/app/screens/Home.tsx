import {View, Text, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp} from "@react-navigation/native";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import axios from "axios";


interface RouterProps{
    navigation: NavigationProp<any, any>;
}

const Home = ({navigation}:RouterProps) => {
    const [output, setOutput] = useState('');
    const [folders, setFolders] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedTimestamp, setSelectedTimestamp] = useState(null);


    const handleFolderPress = async (folder) => {
        try {
            // Invia una richiesta POST al server con il timestamp della cartella selezionata
            const response = await axios.post('http://localhost:8000/api/images', { timestamp: folder.timestamp });

            // Ottieni i nomi delle immagini dalla risposta del server
            const imageNames = response.data;

            // Imposta l'elenco delle immagini selezionate e il timestamp corrente
            setSelectedImages(imageNames);
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
    };
    return(
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text style={styles.text_header}>Patient Twin</Text>
            </View>
            <View style = {styles.footer}>
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
            <ScrollView>
                <Text>Elenco delle Cartelle:</Text>
                {folders.map((folder, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => handleFolderPress(folder)}>
                            <Text>{folder.timestamp}</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Visualizza le immagini selezionate */}
                {selectedTimestamp && (
                    <View>
                        <Text>Immagini nella cartella {selectedTimestamp}:</Text>
                        {selectedImages.map((imageName, index) => (
                            <Image
                                source={{ uri: 'http://localhost:8000/api/get_image' }}
                                style={{ width: 200, height: 200 }}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>

        </View>
    );
};


export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
    }
});