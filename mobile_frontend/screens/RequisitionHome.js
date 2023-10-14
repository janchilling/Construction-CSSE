import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const RequisitionHome = () => {

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
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Requisitions</Text>
                    </View>
                </KeyboardAvoidingView>

                <Pressable
                    onPress={() => navigation.navigate("RequisitionRequests")}
                    style={{
                        width: 250,
                        backgroundColor: "#AA7AD0",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 60,
                        height: 180,
                    }}
                >

                    <FontAwesome name="shopping-basket" size={24} color="white" style={{ marginLeft: 95, marginTop: 40 }} />
                    <Text
                        style={{
                            marginTop: 15,
                            textAlign: "center",
                            color: "white",
                            fontSize: 20,
                            fontWeight: "bold",
                        }}
                    >
                        Requisition Requests
                    </Text>


                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("CreateRequisition")}
                    style={{
                        width: 250,
                        backgroundColor: "#AA7AD0",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                        marginTop: 60,
                        height: 180,
                    }}
                >
                    <FontAwesome name="pencil" size={24} color="white" style={{ marginLeft: 95, marginTop: 40 }} />
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 15,
                        }}
                    >
                        Create a requisition
                    </Text>
                </Pressable>

            </ScrollView>

        </SafeAreaView>
    )
}

export default RequisitionHome

const styles = StyleSheet.create({})