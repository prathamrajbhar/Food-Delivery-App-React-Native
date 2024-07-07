import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import RateImage from '../img/rate.png';
import caloriesImage from '../img/calories.png';
import timeImage from '../img/time.png';
import star from '../img/star.png';

const FoodDetailScreen = ({ route }) => {
    const { item } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [isInCart, setIsInCart] = useState(false);
    const [isInFavorite, setIsInFavorite] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        checkIfInCart();
        checkIfInFavorite();
    }, []);

    const checkIfInCart = async () => {
        try {
            const existingCartItems = await AsyncStorage.getItem('cartItems');
            const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

            const itemInCart = cartItems.find((cartItem) => cartItem.name === item.name);

            setIsInCart(!!itemInCart);
        } catch (error) {
            console.error('Error checking cart:', error);
        }
    };

    const checkIfInFavorite = async () => {
        try {
            const existingFavoriteItems = await AsyncStorage.getItem('favoriteItems');
            const favoriteItems = existingFavoriteItems ? JSON.parse(existingFavoriteItems) : [];

            const itemInFavorite = favoriteItems.find(
                (favoriteItem) => favoriteItem.name === item.name
            );

            setIsInFavorite(!!itemInFavorite);
        } catch (error) {
            console.error('Error checking favorite:', error);
        }
    };

    const QuantityIncrease = () => {
        setQuantity(quantity + 1);
    };

    const QuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = async () => {
        try {
            const cartItem = {
                name: item.name,
                image: item.image,
                originalprice: item.price,
                price: item.price * quantity,
                quantity: quantity,
            };

            const existingCartItems = await AsyncStorage.getItem('cartItems');
            const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

            const itemInCartIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);

            if (itemInCartIndex !== -1) {
                cartItems.splice(itemInCartIndex, 1); // Remove item from cart
                setIsInCart(false);
            } else {
                cartItems.push(cartItem); // Add item to cart
                setIsInCart(true);
            }

            await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const navigateToCart = () => {
        navigation.navigate('CartScreen'); // Navigate to CartScreen
    };

    const cartButtonLabel = isInCart ? 'Go to Cart' : 'Add to Cart';

    const AddToFavorite = async () => {
        try {
            const favoriteItem = {
                name: item.name,
                image: item.image,
                originalprice: item.price,
                price: item.price * quantity,
                quantity: quantity,
            };

            const existingFavoriteItems = await AsyncStorage.getItem('favoriteItems');
            const favoriteItems = existingFavoriteItems ? JSON.parse(existingFavoriteItems) : [];

            const itemInFavoriteIndex = favoriteItems.findIndex(
                (favoriteItem) => favoriteItem.name === item.name
            );

            if (itemInFavoriteIndex !== -1) {
                favoriteItems.splice(itemInFavoriteIndex, 1); // Remove item from favorite
                setIsInFavorite(false);
            } else {
                favoriteItems.push(favoriteItem); // Add item to favorite
                setIsInFavorite(true);
                ToastAndroid.show('Item Added to Favorites', ToastAndroid.SHORT);
            }

            await AsyncStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
        } catch (error) {
            console.error('Error updating favorite:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.foodFavoriteContainer}>
                        <TouchableOpacity
                            style={styles.foodFavoriteButton}
                            onPress={() => {
                                AddToFavorite();
                            }}
                        >
                            <Image source={star} style={styles.foodFavoriteButtonImage} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.foodNameContainer}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <View style={styles.quantityContainer}>
                        <View style={styles.priceContainer}>
                            <Text style={styles.foodPrice}>{'₹ ' + item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={QuantityDecrease}>
                            <Text style={styles.quantityButton}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity onPress={QuantityIncrease}>
                            <Text style={styles.quantityButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.foodInfoContainer}>
                        <View style={styles.foodInfoBox}>
                            <Image source={RateImage} style={styles.foodInfoBoxImage} />
                            <Text style={styles.foodInfoBoxValue}>{item.rate}</Text>
                        </View>
                        <View style={styles.foodInfoBox}>
                            <Image source={timeImage} style={styles.foodInfoBoxImage} />
                            <Text style={styles.foodInfoBoxValue}>{item.time} min</Text>
                        </View>
                        <View style={styles.foodInfoBox}>
                            <Image source={caloriesImage} style={styles.foodInfoBoxImage} />
                            <Text style={styles.foodInfoBoxValue}>{item.calories} calories</Text>
                        </View>
                    </View>
                    <Text style={styles.foodDescription}>{item.descriptions}</Text>
                </View>
            </ScrollView>
            <View style={styles.foodPriceContainer}>
                <Text style={styles.totalfoodPrice}>{'₹ ' + item.price * quantity}</Text>
                <TouchableOpacity
                    style={[styles.cartButton, { backgroundColor: isInCart ? '#F68E1F' : '#0080FF' }]}
                    onPress={isInCart ? navigateToCart : addToCart}
                >
                    <Text style={styles.cartButtonText}>{cartButtonLabel}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 60 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    image: {
        width: '100%',
        height: 300,
    },
    imageContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    foodNameContainer: {
        padding: 16,
    },
    foodName: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
    },
    foodDescription: {
        fontSize: 18,
        color: 'black',
        textAlign: 'justify',
    },
    foodPriceContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#EDEDED',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalfoodPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
    },
    cartButton: {
        backgroundColor: '#0080FF',
        borderRadius: 4,
        padding: 8,
    },
    cartButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    foodInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 16,
    },
    foodInfoBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodInfoBoxImage: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    foodInfoBoxValue: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
    quantityContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    quantityButton: {
        backgroundColor: '#fdb72c',
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    quantity: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#f7f7f7',
    },
    foodPrice: {
        fontSize: 18,
        backgroundColor: '#d7d7d7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        fontWeight: '700',
        color: 'black',
    },
    foodFavoriteContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 16,
    },
    foodFavoriteButton: {
        backgroundColor: '#F68E1F',
        borderRadius: 50,
        padding: 8,
    },
    foodFavoriteButtonImage: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
});

export default FoodDetailScreen;
