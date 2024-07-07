import React from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your food data
import PopularFoodAPI from '../FoodAPI.json'; // You only need to import the data once

const Foods = () => {
    const navigation = useNavigation();

    const handleFoodPress = (item) => {
        navigation.navigate('FoodDetailScreen', { item });
    };

    const FoodButtons = ({ item }) => { // You can pass the whole item as a prop
        return (
            <View>
                <Button
                    onPress={() => handleFoodPress(item)} // Use the handleFoodPress function
                    title={item.name}
                    color="#000000"
                    accessibilityLabel={item.name}
                />
                <Image source={item.image} style={{ width: 100, height: 100 }} />
                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                    {item.price}
                </Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={PopularFoodAPI}
                renderItem={({ item }) => <FoodButtons item={item} />}
                keyExtractor={(item) => item.id.toString()} // Add a keyExtractor for the FlatList
            />
        </View>
    );
};

export default Foods;
