import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Addresses = () => {
    const navigation = useNavigation();
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        // Load saved addresses from AsyncStorage
        const loadAddresses = async () => {
            try {
                const storedAddresses = await AsyncStorage.getItem('addresses');
                if (storedAddresses) {
                    const addresses = JSON.parse(storedAddresses);
                    setAddressList(addresses);
                }
            } catch (error) {
                console.error('Error loading addresses:', error);
            }
        };

        // Call the loadAddresses function
        loadAddresses();
    }, []);

        const handleEditAddress = (index) => {
        // Navigate to the EditAddressScreen and pass the address data and index
        navigation.navigate('EditAddressScreen', {
            addressData: addressList[index],
            index,
        });
    };
    

    const handleDeleteAddress = async (index) => {
        try {
            // Create a copy of the current addressList without the deleted address
            const updatedAddressList = [...addressList];
            updatedAddressList.splice(index, 1);

            // Update the state and save the updated list to AsyncStorage
            await AsyncStorage.setItem('addresses', JSON.stringify(updatedAddressList));
            setAddressList(updatedAddressList);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <View style={styles.container}>
            {addressList.length > 0 ? (
                <ScrollView contentContainerStyle={styles.content}>
                    {addressList.map((item, index) => (
                        <View style={styles.addressBox} key={index}>
                            <View style={styles.addressIconSection}>
                                {item.addressType === 'Home' ? (
                                    <Image source={require('../../img/address/home.png')} style={styles.addressIcon} />
                                ) : (
                                    <Image source={require('../../img/address/work.png')} style={styles.addressIcon} />
                                )}
                            </View>
                            <View style={styles.addressTextSection}>
                                <View style={styles.addressEditButton}>
                                    <Text style={styles.addressTypeText}>{item.addressType}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => handleEditAddress(index)}>
                                            <Image source={require('../../img/address/edit.png')} style={styles.editIcon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteAddress(index)}>
                                            <Image source={require('../../img/address/delete.png')} style={styles.editIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.mainAddressText}>
                                    {item.apartment} {item.address} {item.street}, {item.postalCode}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.noAddressContainer}>
                    <Text style={styles.noAddressText}>No addresses to display.</Text>
                </View>
            )}
            <TouchableOpacity style={styles.addAddressButton} onPress={() => navigation.navigate('AddAddressScreen')}>
                <Text style={styles.addAddressButtonText}>Add New Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flexGrow: 1,
        padding: 20,
    },
    noAddressContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noAddressText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    addAddressButton: {
        backgroundColor: '#ff7622',
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAddressButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 18,
        textTransform: 'uppercase',
    },
    addressBox: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        marginBottom: 20,
    },
    addressIconSection: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginRight: 20,
    },
    addressIcon: {
        width: 20,
        height: 20,
    },
    addressTextSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    editIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        tintColor: '#ff7622',
    },
    addressEditButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    addressTypeText: {
        fontSize: 16,
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 5,
    },
    mainAddressText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#000',
        width: '100%',
    },
});

export default Addresses;
