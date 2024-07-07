import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouriteScreen = () => {
    const navigation = useNavigation();
    const [favoriteItems, setFavoriteItems] = useState([]);

    const getFavoriteItems = async () => {
        try {
            const favoriteItems = await AsyncStorage.getItem('favoriteItems');
            if (favoriteItems !== null) {
                setFavoriteItems(JSON.parse(favoriteItems));
            }
        } catch (error) {
            console.error('Error fetching favorite items', error);
        }
    };

    const removeFavoriteItem = async (item) => {
        try {
            const items = await AsyncStorage.getItem('favoriteItems');
            let favoriteItems = [];
            if (items !== null) {
                favoriteItems = JSON.parse(items);
            }
            const index = favoriteItems.findIndex(
                (favoriteItem) => favoriteItem.id === item.id
            );
            if (index !== -1) {
                favoriteItems.splice(index, 1);
                await AsyncStorage.setItem(
                    'favoriteItems',
                    JSON.stringify(favoriteItems)
                );
                setFavoriteItems(favoriteItems);
            }
        } catch (error) {
            console.error('Error removing item from favorites', error);
        }
    };

    useEffect(() => {
        getFavoriteItems();
    }, []);

    const handleFoodPress = (item) => {
        navigation.navigate('FoodDetailScreen', { item });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {favoriteItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.itemContainer}
                        onPress={() => handleFoodPress(item)} // Navigate to FoodDetailScreen
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>₹ {item.originalprice}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => removeFavoriteItem(item)}
                            style={styles.removeButton}
                        >
                            <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: 'black',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: 'grey',
    },
    removeButton: {
        padding: 8,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    removeText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});

export default FavouriteScreen;
