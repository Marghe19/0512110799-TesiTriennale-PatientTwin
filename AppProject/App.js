import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
      <div>
          <h1> Benvenuto! </h1>
          <br />
          <p> You are not logged in</p>
          <div>
              <a href="/login"><button>Login</button></a>
          </div>
      </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
