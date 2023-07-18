 import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Effettua l'autenticazione con l'email e la password
        // Implementa la logica di autenticazione qui
        if (email === 'example@example.com' && password === 'password') {
            console.log('Accesso riuscito!');
            // Esegui l'azione desiderata dopo il login
        } else {
            console.log('Accesso fallito!');
            // Esegui l'azione desiderata in caso di accesso fallito
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Accedi" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default LoginScreen;