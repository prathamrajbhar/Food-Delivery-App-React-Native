import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PaymentMethod = ({ name, imageSource, isSelected, onSelect }) => (
    <TouchableOpacity style={[styles.method, isSelected && styles.selectedMethod]} onPress={onSelect}>
        <Image source={imageSource} style={styles.methodImage} />
        <Text style={[styles.methodText, isSelected && styles.selectedMethodText]}>{name}</Text>
    </TouchableOpacity>
);

const OrderPlaceScreen = () => {
    const [customerName, setCustomerName] = useState('');
    const [addressList, setAddressList] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const navigation = useNavigation();

    // Load customer name from AsyncStorage
    const loadCustomerName = async () => {
        const storedCustomerName = await AsyncStorage.getItem('fullName');
        if (storedCustomerName) {
            setCustomerName(storedCustomerName);
        }
    };

    // Load addresses from AsyncStorage
    const loadAddresses = async () => {
        try {
            const storedAddresses = await AsyncStorage.getItem('addresses');
            const parsedAddresses = JSON.parse(storedAddresses);
            if (parsedAddresses) {
                setAddressList(parsedAddresses);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return day + '/' + month + '/' + year;
    };

    // Handle placing order
    const handlePlaceOrder = async () => {
        try {
            const storedCartItems = await AsyncStorage.getItem('cartItems');
            const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

            if (storedCartItems) {
                const parsedCartItems = JSON.parse(storedCartItems);
                const foodItems = parsedCartItems.map((item) => ({
                    name: item.name,
                    price: '₹ ' + item.price,
                    quantity: item.quantity,
                }));

                const response = await axios.post('https://foodie-munch-7505f-default-rtdb.firebaseio.com/CustomerData.json', {
                    CustomerName: customerName,
                    PhoneNumber: storedPhoneNumber,
                    FoodItems: foodItems,
                    orderDate: getDate(),
                    address: addressList[0].apartment + ' ' + addressList[0].address + ' ' + addressList[0].street + ' ' + addressList[0].postalCode,
                });

                if (response.status === 200) {
                    navigation.navigate('FoodConformation')
                } else {
                    Alert.alert('Error', 'Something went wrong');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong');

        } finally {
            try {
                await AsyncStorage.removeItem('cartItems');
            } catch (error) {
                console.error('Error removing data', error);
                Alert.alert('Error', 'Something went wrong');
            }
        }
    };

    // Load addresses and customer name on component mount
    useEffect(() => {
        loadAddresses();
        loadCustomerName();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.paymentMethod}>
                <PaymentMethod name="Cash" imageSource={require('../img/orderplace/cash.png')} isSelected={selectedPaymentMethod === 'Cash'} onSelect={() => setSelectedPaymentMethod('Cash')} />
                <PaymentMethod name="Card" imageSource={require('../img/orderplace/mastercard.png')} isSelected={selectedPaymentMethod === 'Card'} onSelect={() => setSelectedPaymentMethod('Card')} />
                <PaymentMethod name="Paypal" imageSource={require('../img/orderplace/paypal.png')} isSelected={selectedPaymentMethod === 'Paypal'} onSelect={() => setSelectedPaymentMethod('Paypal')} />
                <PaymentMethod name="Visa" imageSource={require('../img/orderplace/visa.png')} isSelected={selectedPaymentMethod === 'Visa'} onSelect={() => setSelectedPaymentMethod('Visa')} />
            </ScrollView>

            {selectedPaymentMethod === 'Card' && <PaymentForm />}

            <View style={styles.DeliveryAddressSelect}>
                <Text style={styles.DeliveryAddressSelectText}>Select Delivery Address</Text>
                <ScrollView>
                    {addressList.map((address, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.address}
                            onPress={() => {
                                Alert.alert('Success', 'Address selected successfully: ' + address.address);
                            }}
                        >
                            <Text style={styles.addressText}>
                                {address.apartment} {address.address} {address.street} {address.postalCode}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                <Text style={styles.orderButtonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const PaymentForm = () => {
    const card = {
        number: '1234 5678 9012 3456',
        name: 'John Doe',
        expiry: '12/24',
        cvv: '123',
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardRow}>
                <TextInput style={styles.cardNumText}>{card.number}</TextInput>
            </View>
            <View style={styles.cardRow}>
                <Text style={styles.cardLabelText}>Card Holder</Text>
                <TextInput style={styles.cardText}>{card.name}</TextInput>
            </View>
            <View style={styles.cardRow}>
                <Text style={styles.cardLabelText}>Expiry</Text>
                <Text style={styles.cardLabelText}>CVV</Text>
            </View>
            <View style={styles.cardRow}>
                <TextInput style={styles.cardText}>{card.expiry}</TextInput>
                <TextInput style={styles.cardText}>{card.cvv}</TextInput>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        padding: 20,
    },
    paymentMethod: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    method: {
        width: 100,
        height: 100,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    selectedMethod: {
        borderColor: 'orange',
        borderWidth: 2,
    },
    methodImage: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    methodText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    selectedMethodText: {
        color: 'orange',
    },
    orderButton: {
        width: '100%',
        height: 60,
        backgroundColor: '#ff7622',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderButtonText: {
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
    DeliveryAddressSelect: {
        marginTop: 10,
    },
    DeliveryAddressSelectText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    address: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        marginBottom: 20,
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    showMethods: {
        marginTop: 20,
    },

    // Card Stylesheet
    card: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f5fa',
        borderRadius: 10,
        padding: 20,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: -10,
        paddingBottom: 8,
    },
    cardNumText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 4,
        width: '100%',
    },
    cardLabelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    cardText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
});

export default OrderPlaceScreen;
