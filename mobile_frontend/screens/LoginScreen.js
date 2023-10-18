import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserContext from '../components/ContextComponent';


const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [UserType, setUserType] = useState('');
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext)

    //setting the user type
    const handleTypeSelection = (type) => {
        setUserType(type);
    };

    //calling the login api depending on the user type
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (UserType === "site manager") {
            try {
                const response = await fetch('http://192.168.1.4:8070/auth/loginEmployee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Email: email, Password: password }),
                });
                const data = await response.json();

                if (response.status === 200) {
                    const employee = data.employee
                    setUser(employee);
                    navigation.navigate("SiteManagerHome");

                } else {
                    Alert.alert("Invalid Details!");
                }
            } catch (err) {
                Alert.alert("Login not done! Please check your network connection.");
            }
        }
        else if(UserType === "supplier"){
            try {
                const response = await fetch('http://192.168.1.4:8070/auth/loginSupplier', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ SupplierEmail: email, Password: password }),
                });
                const data = await response.json();

                if (response.status === 200) {
                    const supplier = data.supplier
                    setUser(supplier);
                    navigation.navigate("SupplierHome");
                } else {
                    Alert.alert("Invalid Details!");
                }
            } catch (err) {
                Alert.alert("Login not done! Please check your network connection.");
            }
        }
    };


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}
        >
            <View>
                <Image
                    style={{ width: 250, height: 200 }}
                    source={require('../assets/images/mbktLogo.png')}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 12, color: "white" }}>Login</Text>
                </View>

                {/* Radio buttons for user type */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 40 }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
                        onPress={() => handleTypeSelection("site manager")}
                    >
                        <MaterialIcons name={UserType === "site manager" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="white" />
                        <Text style={{ color: "white", marginLeft: 8 }}>Site Manager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => handleTypeSelection("supplier")}
                    >
                        <MaterialIcons name={UserType === "supplier" ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="white" />
                        <Text style={{ color: "white", marginLeft: 8 }}>Supplier</Text>
                    </TouchableOpacity>
                </View>

                {/* Email input */}
                <View style={{ marginTop: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "#D0D0D0",
                        paddingVertical: 5,
                        borderRadius: 5,
                    }}>
                        <MaterialIcons name="email" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Enter your Email'
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                        />
                    </View>
                </View>

                {/* Password input */}
                <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                        }}
                    >
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
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 16,
                            }}
                            placeholder="Enter your Password"
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        Forgot Password?
                    </Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleSubmit}
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
                        Login
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Register")}
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        Don't have an account? Sign Up
                    </Text>
                </Pressable>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
