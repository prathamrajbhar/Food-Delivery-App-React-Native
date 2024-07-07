import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
const Profile = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');


    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('fullName');
                const storedBio = await AsyncStorage.getItem('bio');
                if (storedUsername) setUsername(storedUsername);
                if (storedBio) setBio(storedBio);
            } catch (error) {
                console.error('Error loading username:', error);
            }
        };

        loadUserData();

        const unsubscribe = navigation.addListener('focus', () => {
            loadUserData();
        });
        return unsubscribe;
    }, [navigation]);


    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('email');
            navigation.navigate('LoginScreen');
        }
        catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    };

    const UserProfileCard = () => {
        return (
            <View style={styles.profilecontainer}>
                <View style={styles.profileCard}>
                    <View style={styles.profileImageSection}>
                        <Image style={styles.profileCardImage}
                            source={require('../../img/settingImages/profileimage.png')}
                        />
                    </View>
                    <View style={styles.profileInfoSection}>
                        <View style={styles.profileNameSection}>
                            <Text style={styles.profileName}>
                                {username}
                            </Text>
                        </View>
                        <View style={styles.profileDescription}>
                            <Text style={styles.profileDescriptionText}>
                                {bio}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };



    return (
        <ScrollView style={styles.container}>
            <UserProfileCard />
            <View style={styles.BlankSpace} />
            <View style={styles.boxSetting}>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("EditProfile")}>
                    <View style={styles.profilesinner}>
                        <Image style={styles.profileImage} source={require('../../img/settingImages/profile.png')} />
                        <Text style={styles.profileText}>Personal Info</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("Addresses")}>
                    <View style={styles.profilesinner}>
                        <Image style={styles.profileImage} source={require('../../img/settingImages/address.png')} />
                        <Text style={styles.profileText}>Addresses</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.boxSetting}>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("DailyFood")}>
                    <View style={styles.profilesinner}>
                        <Image style={styles.profileImage} source={require('../../img/settingImages/clock.png')} />
                        <Text style={styles.profileText}>Schedule Daily Food</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.boxSetting}>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("CartScreen")}>
                    <View style={styles.profilesinner}>
                        <Image style={styles.profileImage} source={require('../../img/settingImages/cart.png')} />
                        <Text style={styles.profileText}>Cart</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("FavouriteScreen")}>
                    <View style={styles.profilesinner}>
                        <Image style={[styles.profileImage, { tintColor: '#c56afc' }]} source={require('../../img/settingImages/heart.png')} />
                        <Text style={styles.profileText}>Favourite</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("NotificationScreen")}>
                    <View style={styles.profilesinner}>
                        <Image style={[styles.profileImage, { tintColor: '#ffaa2a' }]} source={require('../../img/settingImages/bell.png')} />
                        <Text style={styles.profileText}>Notification</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("PaynemtMethod")}>
                    <View style={styles.profilesinner}>
                        <Image style={styles.profileImage} source={require('../../img/settingImages/card.png')} />
                        <Text style={styles.profileText}>Payment Method</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.boxSetting}>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("FAQsScreen")}>
                    <View style={styles.profilesinner}>
                        <Image style={[styles.profileImage, { tintColor: '#fb7f53' }]} source={require('../../img/settingImages/FAQs.png')} />
                        <Text style={styles.profileText}>FAQs</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilesButton} onPress={() => navigation.navigate("ReviewsScreen")}>
                    <View style={styles.profilesinner}>
                        <Image style={[styles.profileImage, { tintColor: '#8eefef' }]} source={require('../../img/settingImages/FAQs.png')} />
                        <Text style={styles.profileText}>User Reviews</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilesButton}>
                    <View style={styles.profilesinner}>
                        <Image style={[styles.profileImage, { tintColor: '#413dfb' }]} source={require('../../img/settingImages/setting.png')} />
                        <Text style={styles.profileText}>Settings</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.boxSetting}>
                <TouchableOpacity style={styles.profilesButton} onPress={() => logOut()}>
                    <View style={styles.profilesinner}>
                        <Image style={[styles.profileImage, { tintColor: '#fc7782' }]} source={require('../../img/settingImages/logout.png')} />
                        <Text style={styles.profileText}>Log Out</Text>
                    </View>
                    <Image style={styles.arrow} source={require('../../img/settingImages/arrow.png')} />
                </TouchableOpacity>

            </View>
            <View style={styles.BlankSpace} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    BlankSpace: {
        height: 30,
    },
    boxSetting: {
        backgroundColor: '#f6f8fa',
        marginBottom: 25,
        marginRight: 25,
        marginLeft: 25,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    profilesButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#32343e',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 1,
        lineHeight: 24,
    },
    profileImage: {
        width: 30,
        height: 30,
        // borderRadius: 0,
        marginRight: 10,
        marginLeft: 10,
    },
    profilesinner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrow: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        tintColor: '#a5a8af',
        marginRight: 20,
    },
    profilecontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#c5e6fd',
        borderRadius: 10,
        paddingBottom: 10,
        padding: 20,
        width: '90%',
    },
    profileCardImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#32343e',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 1,
        lineHeight: 24,
    },
    profileNameSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileDescriptionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#32343e',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 1,
        lineHeight: 24,
    },
    profileDescriptionSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Profile;