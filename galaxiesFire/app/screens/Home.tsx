import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp} from "@react-navigation/native";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface RouterProps{
    navigation: NavigationProp<any, any>;
}

const Home = ({navigation}:RouterProps) => {
    const showAlertCardio = () => {
        alert('I dati del sistema cardiovascolare sono stati appena modificati con successo!');
    };

    const showAlertDKD = () => {
        alert('I dati del sistema renina-angiotensina sono stati appena modificati con successo!');
    };

    const showAlertTwin = () => {
        alert('I tuoi dati sono in fase di elaborazione. \nAl termine dell esecuzione li potrai visualizzare nello storage');
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

    const startScript = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/start_script');
            console.log('prima azione eseguita');

        } catch (error) {
            console.error('Errore durante la chiamata API:', error);
        }

    };

    return (
        <View style={styles.container}>

            <ImageBackground source={require('../../assets/Sfondo.png')} resizeMode='cover' style={styles.image}>

                <View >
                    <Image source={require('../../assets/BackgroundEraser_image.png')}
                           style={{
                               position: 'absolute',
                               width: wp('90%'),
                               height: hp('90%'),
                               top: hp('-35%'),
                               left: wp('6%'),
                           }}
                           resizeMode="contain"
                    />

                </View>
                <View>
                    <TouchableOpacity onPress={() => { cardio(); showAlertCardio(); }}>
                        <Image
                            source={require('../../assets/Cuorevero.png')}
                            style={{
                                position: 'absolute',
                                width: wp('22%'),
                                height: hp('22%'),
                                top: hp('-39%'),
                                left: wp('12%'),
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { dkd(); showAlertDKD(); }}>
                        <Image
                            source={require('../../assets/Polmons.png')}
                            style={{
                                position: 'absolute',
                                width: wp('20%'),
                                height: hp('20%'),
                                top: hp('-47%'),
                                left: wp('0%'),
                            }}

                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { startScript(); showAlertTwin(); }}>
                        <Image
                            source={require('../../assets/Picavi-Human-Digital-Twin-scaled-scaled-1.png')}
                            style={{
                                position: 'absolute',
                                width: wp('20%'),
                                height: hp('20%'),
                                top: hp('-28%'),
                                left: wp('1%'),
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Database')}>
                    <Image
                        source={require('../../assets/grafico.png')}
                        style={{
                            position: 'absolute',
                            width: wp('15%'),
                            height: hp('15%'),
                            top: hp('-16.5%'),
                            left: wp('14%'),
                        }}

                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()} title="Logout">
                    <Image
                        source={require('../../assets/imgbin_logout-icon-airport-icon-exit-icon-png.png')}
                        style={{
                            position: 'absolute',
                            width: wp('17%'),
                            height: hp('17%'),
                            top: hp('-51%'),
                            left: wp('83%'),
                        }}

                        resizeMode="contain"
                    />
                </TouchableOpacity>

            </ImageBackground>
        </View>
    );
};

export default Home;
const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',


    },

    linearGradient: {
    width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,

    },
    header: {
        flex: 0.5,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 25,

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontWeight: 'bold',
        fontSize: 15
    }
});