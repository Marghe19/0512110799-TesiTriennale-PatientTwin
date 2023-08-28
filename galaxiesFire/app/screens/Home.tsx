import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp} from "@react-navigation/native";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import axios from "axios";


interface RouterProps{
    navigation: NavigationProp<any, any>;
}

const Home = ({navigation}:RouterProps) => {
    const [output, setOutput] = useState('');

    const startScript = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/start_script');
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
                    <Text style ={[styles.text_footer,{marginTop:35}]}>Visualizza grafici generati dal Patient Twin </Text>
                    <Button color={'#009387'} onPress={() => navigation.navigate('Details')} title="Patient"/>
                    <Text style ={[styles.text_footer,{marginTop:35}]}>Avvia il Patient Twin </Text>
                    <Button color={'#009387'} title="Run Python Code" onPress={startScript} />
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
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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