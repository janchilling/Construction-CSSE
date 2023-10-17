import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
    const [SupplierName, setSupplierName] = useState("");
    const [SupplierAddress, setSupplierAddress] = useState("");
    const [SupplierEmail, setSupplierEmail] = useState("");
    const [SupplierPhone, setSupplierPhone] = useState("");
    const [Password, setPassword] = useState("");

    const navigation = useNavigation();

    //calling the create new supplier api
    const handleRegister = () => {
        const NewSupplier = {
            SupplierName: SupplierName,
            SupplierEmail: SupplierEmail,
            SupplierAddress: SupplierAddress,
            SupplierPhone: SupplierPhone,
            Password: Password
        }

        axios.post("http://192.168.8.115:8070/auth/registerSupplier", NewSupplier).then(() => {
            Alert.alert("Registration successful!");

            setSupplierName("");
            setSupplierEmail("");
            setSupplierAddress("");
            setSupplierPhone("");
            setPassword("");
            
        }).catch((error) => {
            console.log(error)
            Alert.alert("Your registration failed!");
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <Image
                        style={{ width: 250, height: 200, marginLeft: 40 }}
                        source={require('../assets/images/mbktLogo.png')}
                    />
                </View>

                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white" }}>
                            Register your Account
                        </Text>
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <Ionicons name="ios-person" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SupplierName}
                                onChangeText={(text) => setSupplierName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: SupplierName ? 16 : 16 }}
                                placeholder="Enter supplier name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <Ionicons name="location" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SupplierAddress}
                                onChangeText={(text) => setSupplierAddress(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: SupplierAddress ? 16 : 16 }}
                                placeholder="Enter supplier address"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <MaterialIcons name="email" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SupplierEmail}
                                onChangeText={(text) => setSupplierEmail(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: SupplierEmail ? 16 : 16 }}
                                placeholder="Enter supplier email"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <FontAwesome name="phone" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SupplierPhone}
                                onChangeText={(text) => setSupplierPhone(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: SupplierPhone ? 16 : 16 }}
                                placeholder="Enter supplier phone number"
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <AntDesign name="lock" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={Password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: Password ? 16 : 16 }}
                                placeholder="Enter Password"
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 80 }} />

                    <Pressable
                        onPress={handleRegister}
                        style={{
                            width: 200,
                            backgroundColor: "#AA7AD0",
                            borderRadius: 6,
                            marginLeft: "auto",
                            marginRight: "auto",
                            padding: 15,
                        }}
                    >
                        <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>Already have an account? Sign In</Text>
                    </Pressable>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
