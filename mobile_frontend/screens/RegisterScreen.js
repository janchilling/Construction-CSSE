import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert, TouchableOpacity, ScrollView} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const navigation = useNavigation();
    const handleRegister = () => {
        const user = {
            name: name,
            address: address,
            email: email,
            phoneNo: phoneNo,
            password: password,
        };

        const handleTypeSelection = (type) => {
            setSelectedType(type);
        };
        // send a POST  request to the backend API to register the user
        axios
            .post("http://localhost:8000/register", user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration successful",
                    "You have been registered Successfully"
                );
                setName("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred while registering"
                );
                console.log("registration failed", error);
            });
    };
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View>
                <Image
                    style={{ width: 250, height: 200, marginLeft: 40 }}
                    source={require('../assets/images/mbktLogo.png')}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white"
                        }}
                    >
                        Register your Account
                    </Text>
                </View>

                {/* Radio buttons for user type */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => handleTypeSelection("supplier")}
                    >
                        <MaterialIcons name={selectedType === "supplier" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="white" />
                        <Text style={{ color: "white", marginLeft: 8 }}>Supplier</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 5 }}>
                    <View
                        style={{flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30}}>
                        <Ionicons
                            name="ios-person"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: name ? 16 : 16}}
                            placeholder="Enter your name"
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30}}>
                        <Ionicons
                            name="location"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }} />

                        <TextInput
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: address ? 16 : 16,
                            }}
                            placeholder="Enter your address"/>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30}}>
                        
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16}}
                            placeholder="Enter your Email"
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30}}>
                    <FontAwesome 
                            style={{ marginLeft: 8 }}
                            name="phone"
                            size={24}
                            color="gray" />
                        <TextInput
                            value={phoneNo}
                            onChangeText={(text) => setPhoneNo(text)}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: phoneNo ? 16 : 16}}
                            placeholder="Enter your phone number"
                        />
                    </View>
                </View>

                <View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30}}>
                        <AntDesign
                            name="lock1"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 16 : 16}}
                            placeholder="Enter your Password"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        width: 200,
                        backgroundColor: "#AA7AD0",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        Already have an account? Sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>

            </ScrollView>
            
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({});