import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const SiteManagerDeliveryInfo = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Delivery Information</Text>
                    </View>
                </KeyboardAvoidingView>

            </ScrollView>

        </SafeAreaView>
    )
}

export default SiteManagerDeliveryInfo

const styles = StyleSheet.create({})