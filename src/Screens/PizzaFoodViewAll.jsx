import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import star from '../img/star.png';

const PizzaFoodViewAll = () => {
    const navigation = useNavigation();
    const [gujaratiFoodData, setGujaratiFoodData] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/FoodieMunch/Foodie-Munch/main/FoodAPI.json')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.PizzaFoodAPI) {
                    setGujaratiFoodData(data.PizzaFoodAPI);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleFoodPress = (item) => {
        navigation.navigate('FoodDetailScreen', { item });
    };

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
                <View style={styles.foodContainer}>
                    {gujaratiFoodData.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleFoodPress(item)} style={styles.foodItem}>
                            <Image source={{ uri: item.image }} style={styles.foodImage} />
                            <Text style={styles.foodName}>{item.name}</Text>
                            <View style={styles.row1}>
                                <Text style={styles.foodPrice}>₹ {item.price}</Text>
                                <View style={styles.row1}>
                                    <Image source={star} style={styles.star} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    SectionHeading: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        marginTop: 16,
        marginBottom: 20,
    },
    foodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    foodItem: {
        width: '48%', // Adjust the width as needed
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
    },
    foodImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        color: 'black',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 4,
    },
    foodRating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    foodPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
    },
});

export default PizzaFoodViewAll;
