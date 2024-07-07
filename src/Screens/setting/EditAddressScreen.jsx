import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddressTypeButton = ({ type, selectedType, onSelect }) => (
    <TouchableOpacity
        style={selectedType === type ? styles.selectedButtonStyle : styles.buttonStyle}
        onPress={() => onSelect(type)}
    >
        <Text style={selectedType === type ? styles.selectedButtonText : styles.buttonText}>{type}</Text>
    </TouchableOpacity>
);

const EditAddressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [formData, setFormData] = useState({
        address: '',
        street: '',
        postalCode: '',
        apartment: '',
        addressType: 'Home',
    });

    useEffect(() => {
        // If route.params contains addressData, it means we are editing an address
        if (route.params?.addressData) {
            const { addressData } = route.params;
            setFormData(addressData);
        }
    }, [route.params]);

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const saveEditedAddress = async () => {
        const updatedAddressData = formData;

        try {
            // Load existing addresses from AsyncStorage
            const storedAddresses = await AsyncStorage.getItem('addresses');
            if (storedAddresses) {
                const addresses = JSON.parse(storedAddresses);

                // Find the index of the edited address in the addresses array
                const index = route.params?.index;

                // Replace the existing address with the updated data
                if (index !== undefined && index >= 0 && index < addresses.length) {
                    addresses[index] = updatedAddressData;

                    // Save the updated addresses back to AsyncStorage
                    await AsyncStorage.setItem('addresses', JSON.stringify(addresses));
                }
            }

            navigation.goBack(); // Navigate back to the Addresses screen
        } catch (error) {
            console.error('Error saving edited address:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter address"
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
            />

            <Text style={styles.label}>Street</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter street"
                value={formData.street}
                onChangeText={(text) => handleInputChange('street', text)}
            />

            <Text style={styles.label}>Postal code</Text>
            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={formData.postalCode}
                onChangeText={(text) => handleInputChange('postalCode', text)}
            />

            <Text style={styles.label}>Apartment</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter apartment"
                value={formData.apartment}
                onChangeText={(text) => handleInputChange('apartment', text)}
            />

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
            <TouchableOpacity style={styles.addAddressButton} onPress={saveEditedAddress}>
                <Text style={styles.addAddressButtonText}>Save Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
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
        marginBottom: 16,
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
        color: '#fff',
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

export default EditAddressScreen;
