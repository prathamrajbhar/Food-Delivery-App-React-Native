import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your images at the top of the file
import homeIcon from '../img/home.png';
import cartIcon from '../img/cart.png';
import profileIcon from '../img/profile.png';
import search from '../img/search.png';

const iconMap = {
    home: homeIcon,
    cart: cartIcon,
    search: search,
    profile: profileIcon,
};

const BottomNavigation = () => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const TabItem = ({ iconName, text, screenName }) => {
        return (
            <TouchableOpacity onPress={() => navigateToScreen(screenName)}>
                <View style={styles.tabItem}>
                    <Image style={styles.tabIcon} source={iconMap[iconName]} />
                    <Text style={styles.tabText}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TabItem iconName="home" text="Home" screenName="HomeScreen" />
            <TabItem iconName="cart" text="Cart" screenName="CartScreen" />
            <TabItem iconName="search" text="search" screenName="SearchBox" />
            <TabItem iconName="profile" text="Profile" screenName="Profile" />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    tabItem: {
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 30,
    },
    tabText: {
        fontSize: 10,
        color: '#545454',
        marginTop: 5,
    },
});

export default BottomNavigation;
