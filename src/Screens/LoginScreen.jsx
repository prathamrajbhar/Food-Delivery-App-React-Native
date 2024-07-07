import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem('password', password)
            const storedFullName = await AsyncStorage.getItem('fullName');
            if (storedFullName != 0) {
                navigation.navigate('EditProfile')
            }
            else {
                navigation.navigate('MainScreen')
            }
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.loginLabel}>Log In</Text>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7541/7541708.png' }} style={styles.loginlogo} />
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/646/646094.png' }} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000000"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2549/2549910.png' }} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000000"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={storeData}
                >
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.facebookButton}
                >
                    <Text style={styles.facebookButtonText}>Sign Up with</Text>
                    <Text style={styles.facebookButtonBoldText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.googleButton}
                >
                    <Text style={styles.googleButtonText}>Sign Up with</Text>
                    <Text style={styles.googleButtonBoldText}>Google</Text>
                </TouchableOpacity>
                <Text style={styles.SignUpText}>Don't have an account? <Text style={styles.SignUpBoldText}>Sign Up</Text></Text>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        paddingTop: 20,
    },
    loginLabel: {
        fontSize: 35,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 1,
        paddingLeft: 20,
    },
    loginlogo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 20,
    },
    inputContainer: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: '#7bcc6a',
    },
    input: {
        borderBottomColor: '#000000',
        borderBottomWidth: 0.8,
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        flex: 1,
        color: '#000000',
    },
    loginButton: {
        marginTop: 30,
        backgroundColor: '#42b729',
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
    },
    loginButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
    },

    facebookButton: {
        marginTop: 20,
        backgroundColor: '#3b5998',
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    facebookButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 1,
    },
    facebookButtonBoldText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 5,
    },
    googleButton: {
        marginTop: 20,
        backgroundColor: '#d73d33',
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    googleButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 1,
    },
    googleButtonBoldText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1,
        paddingLeft: 5,
    },
    SignUpText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
        color: '#000000',
    },
    SignUpBoldText: {
        color: '#42b729',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
    },
});


export default LoginScreen