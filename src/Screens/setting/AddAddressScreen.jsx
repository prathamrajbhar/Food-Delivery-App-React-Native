import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressTypeButton = ({ type, selectedType, onSelect }) => (
    <TouchableOpacity
        style={selectedType === type ? styles.selectedButtonStyle : styles.buttonStyle}
        onPress={() => onSelect(type)}
    >
        <Text style={selectedType === type ? styles.selectedButtonText : styles.buttonText}>{type}</Text>
    </TouchableOpacity>
);

const AddAddressScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        address: '',
        street: '',
        postalCode: '',
        apartment: '',
        addressType: 'Home',
    });
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        // Load addresses from AsyncStorage when the component mounts
        const loadAddresses = async () => {
            try {
                const addresses = await AsyncStorage.getItem('addresses');
                if (addresses) {
                    setAddressList(JSON.parse(addresses));
                }
            } catch (error) {
                console.error('Error loading addresses:', error);
            }
        };
        loadAddresses();
    }, []); // Empty dependency array to run only once on mount

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const addAddress = async () => {
        const newAddress = formData;

        try {
            const updatedAddressList = [...addressList, newAddress];
            await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddressList));
            setAddressList(updatedAddressList);
            navigation.goBack(); // Navigate back to the Addresses screen
        } catch (error) {
            console.error('Error saving address:', error);
        }

        setFormData({
            address: '',
            street: '',
            postalCode: '',
            apartment: '',
            addressType: 'Home',
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter address"
                    value={formData.address}
                    onChangeText={(text) => handleInputChange('address', text)}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Street</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter street"
                    value={formData.street}
                    onChangeText={(text) => handleInputChange('street', text)}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Postal code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChangeText={(text) => handleInputChange('postalCode', text)}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Apartment</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter apartment"
                    value={formData.apartment}
                    onChangeText={(text) => handleInputChange('apartment', text)}
                />
            </View>
            <Text style={styles.label}>Label as</Text>
            <View style={styles.addressTypesButton}>
                <AddressTypeButton
                    type="Home"
                    selectedType={formData.addressType}
                    onSelect={(type) => handleInputChange('addressType', type)}
                />
                <AddressTypeButton
                    type="Work"
                    selectedType={formData.addressType}
                    onSelect={(type) => handleInputChange('addressType', type)}
                />
                <AddressTypeButton
                    type="Other"
                    selectedType={formData.addressType}
                    onSelect={(type) => handleInputChange('addressType', type)}
                />
            </View>
            <TouchableOpacity style={styles.addAddressButton} onPress={addAddress}>
                <Text style={styles.addAddressButtonText}>Save Location</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    formControl: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        textTransform: 'uppercase',
        color: '#4c4d56',
        letterSpacing: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#f0f5fa',
        borderRadius: 8,
        backgroundColor: '#f0f5fa',
        fontSize: 16,
        padding: 16,
        color: '#000',
    },
    addressTypesButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    buttonStyle: {
        backgroundColor: '#f0f5fa',
        padding: 16,
        borderRadius: 40,
        alignItems: 'center',
        width: '30%',
    },
    selectedButtonStyle: {
        backgroundColor: '#f58d1d',
        padding: 16,
        borderRadius: 40,
        alignItems: 'center',
        width: '30%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1,
    },
    selectedButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff', // Change the text color to white for selected button
        letterSpacing: 1,
    },
    addAddressButton: {
        backgroundColor: '#ff7622',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 16,
    },
    addAddressButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});

export default AddAddressScreen;
