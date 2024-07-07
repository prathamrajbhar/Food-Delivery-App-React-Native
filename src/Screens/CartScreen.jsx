import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import box from '../img/box.png';
const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCartItems();
        console.log(cartItems[0]);
    }, []);

    const fetchCartItems = async () => {
        try {
            const storedCartItems = await AsyncStorage.getItem('cartItems');
            if (storedCartItems) {
                const parsedCartItems = JSON.parse(storedCartItems);
                setCartItems(parsedCartItems);
            }

        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + item.originalprice * item.quantity;
        }, 0);
        return totalPrice;
    };
    const updateQuantity = async (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = newQuantity;
        setCartItems(updatedCartItems);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const removeFromCart = async (index) => {
        try {
            const updatedCartItems = cartItems.filter((item, i) => i !== index);
            setCartItems(updatedCartItems);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const renderCartItem = ({ item, index }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <View style={styles.row1}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹ {item.originalprice}</Text>
                </View>
                <View style={styles.row1}>
                    <View style={styles.iteamQuantitySection}>
                        <TouchableOpacity onPress={() => updateQuantity(index, item.quantity - 1)}>
                            <Text style={styles.iteamQuantity}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.Quantity}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => updateQuantity(index, item.quantity + 1)}>
                            <Text style={styles.iteamQuantity}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeFromCart(index)}
                        >
                            <Image style={styles.removeButtonImage} source={require('../img/trash.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.itemTotalPrice}>₹ {item.originalprice * item.quantity}</Text>
                </View>
            </View>
            <View>

            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={box} style={{ width: 120, height: 120 }} />
                    <TouchableOpacity style={styles.OrderButton}
                        onPress={() => navigation.navigate('HomeScreen')}
                    >
                        <Text style={styles.OrderButtonText}>Please Add Items</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.totalSection}>
                        <View style={styles.row1}>

                            <Text style={styles.totalIteam}>Items Total:</Text>
                            <Text style={styles.totalPrice}>₹ {calculateTotalPrice()}</Text>
                        </View>
                        <View style={styles.row1}>
                            <Text style={styles.totalDilivery}>Dilivery Charges:</Text>
                            <Text style={styles.totalPrice}>₹ 10</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.row1}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalPrice}>₹ {calculateTotalPrice() + 10}</Text>
                        </View>
                        <TouchableOpacity style={styles.OrderButton}
                            onPress={() => navigation.navigate('OrderPlace')}
                        >
                            <Text style={styles.OrderButtonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 20,
    },
    itemName: {
        fontSize: 20,
        color: 'black',
        fontWeight: '600',
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 18,
        color: 'grey',
        fontWeight: '600',
        marginBottom: 8,
    },
    itemTotalPrice: {
        fontSize: 20,
        color: 'black',
        fontWeight: '600',
    },
    iteamQuantity: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        backgroundColor: 'orange',
        marginHorizontal: 4,
        paddingHorizontal: 4,
        height: 30,
        width: 30,
        borderRadius: 15,
        textAlign: 'center',
    },
    Quantity: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    iteamQuantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        padding: 4,
        width: 80,
    },
    removeButton: {
        borderRadius: 4,
        padding: 8,
    },
    removeButtonImage: {
        width: 20,
        height: 20,
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    totalSection: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    totalIteam: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    totalDilivery: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 8,
    },
    OrderButton: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    OrderButtonText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },

});


export default CartScreen;