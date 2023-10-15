import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import UserContext from '../components/ContextComponent.js';

const SupplierHome = () => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View>
                    <Image
                        style={{ width: 250, height: 200, marginLeft: 10 }}
                        source={require('../assets/images/mbktLogo.png')}
                    />
                </View>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Supplier Home</Text>
                    </View>
                </KeyboardAvoidingView>

                <Pressable
                    onPress={() => navigation.navigate("SupplierOrders")}
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

                    <FontAwesome name="shopping-cart" size={24} color="white" style={{ marginLeft: 65 }} />
                    <Text
                        style={{
                            marginTop: 15,
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Orders
                    </Text>


                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("InvoicesHome")}
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

                    <FontAwesome name="pencil" size={24} color="white" style={{ marginLeft: 65 }} />
                    <Text
                        style={{
                            marginTop: 15,
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Invoices
                    </Text>


                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("DeliveryHome")}
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

                    <FontAwesome name="shopping-basket" size={24} color="white" style={{ marginLeft: 63 }} />
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            marginTop: 15,
                        }}
                    >
                        Delivery
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        backgroundColor: "red",
                        marginTop: 80,
                        height: 50,
                        width: 100,
                        marginLeft: 80,
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

export default SupplierHome

const styles = StyleSheet.create({})