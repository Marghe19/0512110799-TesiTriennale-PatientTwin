import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import Details from "./app/screens/Details";
import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {FIREBASE_AUTH} from "./FirebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import Database from "./app/screens/Database";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout(){
    return(
        <InsideStack.Navigator>
            <InsideStack.Screen name="Home" options={{ headerShown: false }} component={Home}/>
            <InsideStack.Screen name="Database" component={Database}/>
        </InsideStack.Navigator>
    )
}
export default function App() {
    const[user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) =>{
            setUser(user);
        });
    },[]);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
                ) : (
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
}
