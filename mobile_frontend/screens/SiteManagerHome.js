import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SiteManagerHome = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View>
                    <Image
                        style={{ width: 250, height: 200, marginLeft: 25 }}
                        source={require('../assets/images/mbktLogo.png')}
                    />
                </View>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Site Manager Home</Text>
                    </View>
                </KeyboardAvoidingView>

                <Pressable
                    onPress={() => navigation.navigate("RequisitionHome")}
                    style={{
                        width: 180,
                        backgroundColor: "#AA7AD0",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 60,
                        height: 100,
                    }}
                >

                    <FontAwesome name="pencil" size={24} color="white" style={{marginLeft: 65}} />
                    <Text
                        style={{
                            marginTop: 15,
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Requisition
                    </Text>


                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("SiteManagerOrders")}
                    style={{
                        width: 180,
                        backgroundColor: "#AA7AD0",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 60,
                        height: 100,
                    }}
                >
                    
                    <FontAwesome name="shopping-basket" size={24} color="white" style={{marginLeft: 63}} />      
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            marginTop: 15,
                        }}
                    >
                        Orders
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("SiteManagerDeliveryInfo")}
                    style={{
                        width: 180,
                        backgroundColor: "#AA7AD0",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 60,
                        height: 100
                    }}
                >
                    <MaterialCommunityIcons name="truck-delivery" size={24} color="white" style={{marginLeft: 63}} />
                    <Text
                        style={{
                            marginTop: 10,
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Delivery Infomation
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        backgroundColor: "red",
                        marginTop: 60,
                        height: 50,
                        width: 100,
                        marginLeft: 90,
                        borderRadius: 6,
                    }}>
                                        <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            marginTop: 15
                        }}
                    >
                        Log Out
                    </Text>
                </Pressable>

            </ScrollView>

        </SafeAreaView>
    )
}

export default SiteManagerHome

const styles = StyleSheet.create({})