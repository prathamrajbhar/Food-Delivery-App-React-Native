import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const checkEmail = async () => {
            try {
                const email = await AsyncStorage.getItem('email');

                if (email) {
                    // Email exists, navigate to MainScreen
                    navigation.replace('MainScreen');
                } else {
                    // Email is empty, navigate to LoginScreen
                    navigation.replace('LoginScreen');
                }
            } catch (e) {
                alert('Failed to fetch the data from storage');
            }
        };

        // Call the function to check email when the component mounts
        checkEmail();
    }, [navigation]);

    // Render an empty View or any other components you might need
    return <View />;
};

export default HomeScreen;
