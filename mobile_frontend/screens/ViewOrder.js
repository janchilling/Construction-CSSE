import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

const ViewOrder = () => {

    const [SupplierName, setSupplierName] = useState('');
    const [RequisitionID, setRequisitionID] = useState('');
    const [SiteManagerID, setSiteManagerID] = useState('');
    const [SiteManagerName, setSiteManagerName] = useState('');
    const [SiteName, setSiteName] = useState('');
    const [Date, setDate] = useState('');
    const [TotalAmount, setTotalAmount] = useState('');
    const [Materials, setMaterials] = useState([]);
    const [CardType, setCardType] = useState([]);
    const [CardNumber, setCardNumber] = useState('');

    const navigation = useNavigation();

    const route = useRoute();
    const orderId = route.params?.id; // Getting orderId from route params

    useEffect(() => {
        getOrderDetails();
    }, [])

    const getOrderDetails = async () => {

        let result = await fetch(`http://192.168.8.115:8070/orders/singleOrder/${orderId}`);
        result = await result.json();

        setSupplierName(result.SupplierName);
        setRequisitionID(result.RequisitionID);
        setSiteManagerID(result.SiteManagerID);
        setSiteManagerName(result.SiteManagerName);
        setSiteName(result.SiteName);
        setDate(result.Date);
        setTotalAmount(result.TotalAmount);
        setMaterials(result.Materials);
        setCardType(result.CardType);
        setCardNumber(result.CardNumber);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 10, color: "white" }}>
                            Received Order Details
                        </Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <Ionicons name="ios-person" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                editable={false}
                                value={SupplierName}
                                onChangeText={(text) => setSupplierName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Supplier Name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <FontAwesome name="user-md" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                editable={false}
                                value={SiteManagerID}
                                onChangeText={(text) => setSiteManagerID(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Site Manager Id"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <FontAwesome name="user-md" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                editable={false}
                                value={SiteManagerName}
                                onChangeText={(text) => setSiteManagerName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Site Manager Name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <Ionicons name="location" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                editable={false}
                                value={SiteName}
                                onChangeText={(text) => setSiteName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter site name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <MaterialIcons name="date-range" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                editable={false}
                                value={Date}
                                onChangeText={(text) => setDate(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter date"
                            />
                        </View>

                        <View>
                            {Materials.map((material, index) => (
                                <View key={index}>
                                    <Text style={{ color: "white", marginVertical: 10, width: 300, fontSize: 16, textAlign: "center", marginTop: 30, marginLeft: 30 }}>{material.MaterialName}</Text>
                                    <Text style={{ color: "white", marginVertical: 10, width: 300, fontSize: 16, textAlign: "center", marginLeft: 30 }}>{material.MaterialQuantity}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <MaterialIcons name="attach-money" size={24} color="gray" style={{ marginLeft: 8 }} />

                            <TextInput
                                editable={false}
                                value={TotalAmount.toString()}
                                onChangeText={(text) => setTotalAmount(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Total Amount"
                                keyboardType="numeric"
                            />
                        </View>

                    </View>

                    <Pressable
                        onPress={() => navigation.navigate("SupplierOrders")}
                        style={{ width: 60, height: 60, backgroundColor: "#AA7AD0", marginTop: 60, marginLeft: 155, borderRadius: 100 }}
                    >
                        <AntDesign name="back" size={24} color="white" style={{ marginLeft: 17, marginTop: 16 }} />
                    </Pressable>


                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewOrder

const styles = StyleSheet.create({})