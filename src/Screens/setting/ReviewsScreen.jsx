import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'

const ReviewsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>List of Reviews</Text>
            </View>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.textBody}>You have no reviews</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: "#ffffff",
        height: 200,
    },
    textHeader: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 20,
    },
    body: {
        marginTop: 40,
        backgroundColor: "#ffffff",
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    textBody: {
        fontSize: 20,
        color: "#000000",
        marginTop: 10,
        textAlign: 'center',
    },
});


export default ReviewsScreen