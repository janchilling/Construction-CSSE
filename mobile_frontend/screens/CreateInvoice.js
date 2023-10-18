import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateInvoice = () => {

    const [SupplierName, setSupplierName] = useState('');
    const [OrderID, setOrderID] = useState('');
    const [SiteManagerID, setSiteManagerID] = useState('');
    const [SiteManagerName, setSiteManagerName] = useState('');
    const [SiteName, setSiteName] = useState('');
    const [IssuedDate, setIssuedDate] = useState('');
    const [TotalAmount, setTotalAmount] = useState('');
    const [Materials, setMaterials] = useState([]);
    const [MaterialName, setMaterialName] = useState('');
    const [MaterialQuantity, setMaterialQuantity] = useState('');

    const navigation = useNavigation();

    //setting the orderID from params which was passed on
    const route = useRoute();
    useEffect(() => {
        if (route.params?.id) {
            setOrderID(route.params.id);
        }
    }, []);

    //adding materials and quantity function
    const addMaterial = () => {
        const newMaterial = {
            MaterialName: MaterialName,
            MaterialQuantity: MaterialQuantity
        };
        setMaterials([...Materials, newMaterial]);
        setMaterialName('');
        setMaterialQuantity('');
    };

    //calling the create new Invoice api
    const handleCreateInvoice = () => {
        const newInvoice = {
            SupplierName: SupplierName,
            OrderID: OrderID,
            SiteManagerID: SiteManagerID,
            SiteManagerName: SiteManagerName,
            SiteName: SiteName,
            IssuedDate: IssuedDate,
            Materials: Materials,
            TotalAmount: TotalAmount
        }
        axios.post("http://192.168.1.4:8070/Invoices/newInvoice", newInvoice).then(() => {
            Alert.alert("Invoice Submitted Successfully!")
            navigation.navigate("InvoicesHome");
        }).catch((err) => {
            Alert.alert("Error creating invoice!");
        })
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white" }}>
                            Create an Invoice
                        </Text>
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <Ionicons name="ios-person" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SupplierName}
                                onChangeText={(text) => setSupplierName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Supplier Name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <FontAwesome name="user-md" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SiteManagerID}
                                onChangeText={(text) => setSiteManagerID(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Site Manager Id"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <FontAwesome name="user-md" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SiteManagerName}
                                onChangeText={(text) => setSiteManagerName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Site Manager Name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <Ionicons name="location" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={SiteName}
                                onChangeText={(text) => setSiteName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter site name"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <MaterialIcons name="date-range" size={24} color="gray" style={{ marginLeft: 8 }} />
                            <TextInput
                                value={IssuedDate}
                                onChangeText={(text) => setIssuedDate(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Issued date"
                            />
                        </View>

                        <View>
                            {Materials.map((material, index) => (
                                <View key={index}>
                                    <Text style={{ color: "white", marginVertical: 10, width: 300, fontSize: 16, textAlign: "center", marginTop: 30 }}>{material.MaterialName}</Text>
                                    <Text style={{ color: "white", marginVertical: 10, width: 300, fontSize: 16, textAlign: "center" }}>{material.MaterialQuantity}</Text>
                                </View>
                            ))}
                            <TextInput
                                placeholder="Material Name"
                                value={MaterialName}
                                onChangeText={(text) => setMaterialName(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, marginLeft: 20 }}
                            />
                            <TextInput
                                placeholder="Material Quantity"
                                value={MaterialQuantity}
                                onChangeText={(text) => setMaterialQuantity(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5, marginLeft: 20 }}
                            />
                            <TouchableOpacity onPress={addMaterial}>
                                <View style={{ backgroundColor: '#AA7AD0', padding: 10, marginLeft: 70, borderRadius: 10, width: 200, marginTop: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Add Material</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <MaterialIcons name="attach-money" size={24} color="gray" style={{ marginLeft: 8 }} />

                            <TextInput
                                value={TotalAmount}
                                onChangeText={(text) => setTotalAmount(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Total Amount"
                                keyboardType="numeric"
                            />
                        </View>

                        <Pressable
                            onPress={handleCreateInvoice}
                            style={{
                                width: 200,
                                backgroundColor: "#56c411",
                                borderRadius: 6,
                                marginLeft: "auto",
                                marginRight: "auto",
                                padding: 15,
                                marginTop: 30
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
                                Create Invoice
                            </Text>
                        </Pressable>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateInvoice

const styles = StyleSheet.create({})