import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const navigation = useNavigation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');

    // Load profile data from AsyncStorage on component mount
    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            // Load profile data from AsyncStorage
            const storedFullName = await AsyncStorage.getItem('fullName');
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
            const storedBio = await AsyncStorage.getItem('bio');
            // Check if values are not null before setting state
            if (storedFullName) setFullName(storedFullName);
            if (storedEmail) setEmail(storedEmail);
            if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
            if (storedBio) setBio(storedBio);
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    };

    const saveProfileData = async () => {
        try {
            // Save profile data to AsyncStorage
            await AsyncStorage.setItem('fullName', fullName);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('phoneNumber', phoneNumber);
            await AsyncStorage.setItem('bio', bio);
            console.log('Profile data saved successfully!');
            // navigation.navigate('Profile');
            // navigation.navigate('MainScreen');
            const addresses = await AsyncStorage.getItem('addresses');
            if (addresses) {
                navigation.navigate('MainScreen');
            } else {
                navigation.navigate('AddAddressScreen');
            }
        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.photoInputContainer}>
                <View style={styles.profileCardImageContainer}>
                    <Image
                        style={styles.profileCardImage}
                        source={{
                            uri: 'https://www.faceplusplus.com/demo/images/demo-pic35.jpg',
                        }}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.uploadOverlay}>
                        <Text style={styles.uploadText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>Full Name</Text>
                <TextInput
                    style={styles.formInput}
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                    style={styles.formInput}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>Phone number</Text>
                <TextInput
                    style={styles.formInput}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>Bio</Text>
                <TextInput
                    style={styles.bioInput}
                    multiline
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
                <Text style={styles.saveButtonText}>
                    Save
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formControl: {
        borderColor: '#ccc',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        marginLeft: 5,
        color: '#000',
        textAlign: 'left',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    formInput: {
        padding: 13,
        margin: 5,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        fontSize: 18,
        color: '#000',
    },
    bioInput: {
        padding: 13,
        margin: 5,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        fontSize: 18,
        paddingBottom: 100,
        color: '#000',
    },
    saveButton: {
        padding: 13,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#ff7622',
        borderRadius: 10,
        fontSize: 18,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 18,
        padding: 8,
    },
    photoInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    profileCardImageContainer: {
        position: 'relative', // Needed for positioning the overlay
    },
    profileCardImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    uploadOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add a semi-transparent background
        borderRadius: 100,
    },
    uploadText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 18,
        padding: 8,
    },
});

export default EditProfile;
