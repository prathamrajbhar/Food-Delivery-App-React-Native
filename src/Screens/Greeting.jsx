import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStatusBar from './AppStatusBar';



const Greeting = () => {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedFullName = await AsyncStorage.getItem('fullName');
                if (storedFullName) {
                    // Split the full name and get the first part (first name)
                    const nameParts = storedFullName.split(' ');
                    if (nameParts.length > 0) {
                        setFirstName(nameParts[0]);
                    }
                }
            } catch (error) {
                console.error('Error loading full name:', error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.Profile}>
                <View style={styles.ProfileText}>
                    <Text style={styles.UsernameText}>Hello, {firstName}</Text>
                    <Text style={styles.description}>Search and Order</Text>
                </View>
                <Image
                    style={styles.ProfileImage}
                    source={require('../img/settingImages/profileimage.png')}
                />
            </View>
            <ScrollView style={styles.Banner} horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.card}>
                    <Image
                        style={styles.foodImage}
                        source={{
                            uri: 'https://img.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg.transform/schema-16x9/image.jpg',
                        }}
                    />
                    <View style={styles.backgroundOverlay} />
                    <View style={styles.foodDeals}>
                        <Text style={styles.foodDiscount}>Up to 49% off</Text>
                        <Text style={styles.Date}>Jan 12 - Feb 12</Text>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Order Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    Banner: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    Profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ProfileText: {
        flex: 1,
        paddingLeft: 20,
    },
    UsernameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff5d00',
    },
    description: {
        fontSize: 18,
        color: '#31312f',
    },
    ProfileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
        borderColor: 'white',
        overflow: 'hidden',
        borderWidth: 2,
    },
    card: {
        width: 370,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden', // This prevents the background image from overflowing the card.
    },
    foodImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    backgroundOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(10, 10, 100, 0.5)',
        position: 'absolute',
    },
    foodDeals: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        padding: 10,
    },
    foodDiscount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        paddingBottom: 8,
    },
    Date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    orderButton: {
        width: '35%',
        height: 40,
        backgroundColor: '#ff5e04',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Greeting;
