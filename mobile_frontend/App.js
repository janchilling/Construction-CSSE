import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import UserContext from './components/ContextComponent';
import StackNavigator from './navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  //passing user details
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('User');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.log('Error retrieving user from AsyncStorage:', e);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem('User', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('User');
        }
      } catch (e) {
        console.log('Error saving user to AsyncStorage:', e);
      }
    };

    saveUser();
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <StackNavigator />
      </UserContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fae60f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
