import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateDeliveryNotice = () => {

    const [InvoiceID, setInvoiceID] = useState('');
    const [SupplierName, setSupplierName] = useState('');
    const [SiteManagerID, setSiteManagerID] = useState('');
    const [SiteManagerName, setSiteManagerName] = useState('');
    const [SiteName, setSiteName] = useState('');
    const [Date, setDate] = useState('');
    const [TotalAmount, setTotalAmount] = useState('');
    const [Status, setStatus] = useState('');
    const [Materials, setMaterials] = useState([]);
    const [MaterialName, setMaterialName] = useState('');
    const [MaterialQuantity, setMaterialQuantity] = useState('');

    const navigation = useNavigation();

    //setting the invoice id from params
    const route = useRoute();
    useEffect(() => {
        if (route.params?.id) {
            setInvoiceID(route.params.id);
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

    //calling the create new delivery notice api
    const handleCreateDeliveryNotice = () => {
        const newDeliveryNotice = {
            InvoiceID: InvoiceID,
            SupplierName: SupplierName,
            SiteManagerID: SiteManagerID,
            SiteManagerName: SiteManagerName,
            SiteName: SiteName,
            Date: Date,
            TotalAmount: TotalAmount,
            Status: Status,
            Materials: Materials,
        }
        axios.post("http://192.168.1.4:8070/Notices/newNotice", newDeliveryNotice).then(() => {
            Alert.alert("Delivery Notice Submitted Successfully!")
            navigation.navigate("DeliveryHome");
        }).catch((err) => {
            Alert.alert("Error creating Delivery Advice Notice!");
        })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 10, color: "white" }}>
                            Create Delivery Advice Note
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
                                value={Date}
                                onChangeText={(text) => setDate(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter date"
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
                            <MaterialCommunityIcons name="list-status" size={24} color="gray" style={{ marginLeft: 8 }} />

                            <TextInput
                                value={Status}
                                onChangeText={(text) => setStatus(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16 }}
                                placeholder="Enter Status"
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
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30, marginLeft: 30 }}
                            />
                            <TextInput
                                placeholder="Material Quantity"
                                value={MaterialQuantity}
                                onChangeText={(text) => setMaterialQuantity(text)}
                                style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 16, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5, marginLeft: 30 }}
                            />
                            <TouchableOpacity onPress={addMaterial}>
                                <View style={{ backgroundColor: '#AA7AD0', padding: 10, marginLeft: 80, borderRadius: 10, width: 200, marginTop: 10 }}>
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
                            onPress={handleCreateDeliveryNotice}
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

export default CreateDeliveryNotice

const styles = StyleSheet.create({})