import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Dimensions,
    Image, Platform
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {createUserWithEmailAndPassword} from "firebase/auth";
import styled from "styled-components";
import {StatusBar} from "expo-status-bar";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async()=>{
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }catch (error: any){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }finally{
            setLoading(false);
        }
    }

    const signUp = async()=>{
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        }catch (error: any){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text style={styles.text_header}>Benvenuto!</Text>
            </View>
            <View style = {styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "user-o"
                    color="#05375a"
                    size={20}/>
                    <TextInput value={email} placeholder="Your Email"style={styles.textInput} autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>

                </View>
                <Text style ={[styles.text_footer,{marginTop:35}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name = "lock"
                        color="#05375a"
                        size={20}/>
                    <TextInput secureTextEntry={true} value={password} style={styles.textInput} placeholder="Your Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

                </View>

                <Button color={'#009387'} title="Login" onPress={signIn}/>
            </View>

        </View>
    );
};

export default Login;

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
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    }
});