import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RollsFoodAPI from '../FoodAPI.json';

const BurgerFood = () => {
    const [BurgerFoodAPI, setBurgerFoodData] = useState([]);
    const navigation = useNavigation();

    const handleFoodPress = (item) => {
        navigation.navigate('FoodDetailScreen', { item });
    };

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/FoodieMunch/Foodie-Munch/main/FoodAPI.json')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.BurgerFoodAPI) {
                    setBurgerFoodData(data.BurgerFoodAPI);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Burger</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.foodContainer}>
                {BurgerFoodAPI.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.foodItem}
                            onPress={() => handleFoodPress(item)}>
                            <View style={styles.foodImageContainer}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.foodImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.foodNameContainer}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <View style={styles.foodCart}>
                                    <Text style={styles.foodPrice}>{'₹ ' + item.price}</Text>
                                    
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F7F7F7',
    },
    text: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: 'black',
    },
    foodContainer: {
        flexDirection: 'row',
    },
    foodItem: {
        width: 150,
        marginRight: 16,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
    },
    foodImageContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    foodImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    foodNameContainer: {
        flex: 1,
        marginTop: 12,
    },
    foodName: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },
    foodPrice: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
        marginTop: 4,
    },
    cartButton: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
        backgroundColor: '#F68E1F',
        borderRadius: 4,
        padding: 4,
        marginTop: 8,
        textAlign: 'center',
    },
    foodCart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    foodCartImage: {
        width: 20,
        height: 20,
        tintColor: '#F68E1F',
    },
    AddtoCart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BurgerFood;
