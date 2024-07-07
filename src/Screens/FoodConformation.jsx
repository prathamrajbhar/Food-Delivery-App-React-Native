import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const AddGifImage = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/190/190411.png" }} style={{ width: 200, height: 200 }} />
        </View>
    )
}

const FoodConformation = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <AddGifImage />
            <Text style={styles.maintext}>Order Successfully</Text>
            <Text style={styles.thankLabel}>Thank you!</Text>
            <Text style={styles.greetText}>One of our delivery executives will deliver your order soon.</Text>
            <TouchableOpacity style={styles.moreOrder} onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.moreOrderText}>More Order</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        color: '#342826',
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
    },
    thankLabel: {
        color: '#342826',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
        marginTop: 30,
    },
    greetText: {
        color: '#342826',
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: 1,
        marginTop: 20,
    },
    moreOrder: {
        width: '75%',
        height: 60,
        backgroundColor: '#ffb11d',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 30,
    },
    moreOrderText: {
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
});

export default FoodConformation