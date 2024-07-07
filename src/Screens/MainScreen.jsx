import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Greeting from './Greeting';
import PopularFood from './PopularFood';
import GujaratiFood from './GujaratiFood';
import PubjabiFood from './PunjabiFood';
import RollsFood from './RollsFood';
import BurgerFood from './BurgerFood';
import CakeFood from './CakeFood';
import { useNavigation } from '@react-navigation/native';
import SouthIndianFood from './SouthIndianFood';
import PizzaFood from './PizzaFood';


const Offer = ({ title, imageSource }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.OfferView} onPress={() => navigation.navigate("DailyFood")}>
            <Image source={imageSource} style={styles.Newimage} />
            <Text style={styles.OfferText}>{title}</Text>
        </TouchableOpacity>
    );
}
const Offers = () => {
    return (
        <View style={styles.OfferContainer}>
            <Offer title="Automatic Food Delivery" imageSource={require('../img/newImage.png')} />
        </View>
    );
}

const MainScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Greeting />
            <Offers />
            <PopularFood />
            <GujaratiFood />
            <PubjabiFood />
            <SouthIndianFood />
            <PizzaFood />
            <RollsFood />
            <BurgerFood />
            <CakeFood />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    OfferContainer: {
        padding: 10,
    },
    OfferView: {
        backgroundColor: '#fdc912',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row', // Align image and text horizontally
        alignItems: 'center', // Align items vertically
    },
    OfferText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
    },
    Newimage: {
        width: 50,
        height: 50,
    },

})


export default MainScreen