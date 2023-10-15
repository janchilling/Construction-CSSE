import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import UserContext from '../components/ContextComponent.js';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

const InvoicesHome = () => {

    const [data, setData] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigation = useNavigation();

    const SupplierName = user.SupplierName;

    useEffect(() => {
        getInvoices();
    }, [])

    const getInvoices = async () => {
        const response = await axios.get("http://192.168.8.115:8070/Invoices/allInvoices");

        if (response.status === 200) {
            setData(response.data);
        }
        console.log(data);
    }

    const handleCreateDeliveryNotice = (id) => {
        // Navigate to the create delivery notice screen with the ID
        navigation.navigate('CreateDeliveryNotice', { id: id });
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View>
                    <Image
                        style={{ width: 250, height: 200, marginLeft: 70 }}
                        source={require('../assets/images/mbktLogo.png')}
                    />
                </View>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Submitted Invoices</Text>
                        <Text style={{ fontSize: 22, marginTop: 10, color: "white", textAlign: "center" }}>All created invoices are listed here</Text>
                        <Text style={{ fontSize: 12, marginTop: 10, color: "white", textAlign: "center" }}>Create Delivery Advice Notes by clicking the button</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.header}>S.Mgr Id</Text>
                            <Text style={styles.header}>Issued Date</Text>
                            <Text style={styles.header}>Amount</Text>
                            <Text style={styles.header}>Create</Text>
                        </View>
                        {data && data.map((item, index) => {
                            if (item.SupplierName === SupplierName) {
                                return (
                                    <View style={styles.row} key={index}>
                                        <Text style={{ marginTop: 10 }}>{item.SiteManagerID}</Text>
                                        <Text style={{ marginTop: 10, marginLeft: 10 }}>{item.IssuedDate}</Text>
                                        <Text style={{ marginTop: 10, marginLeft: 20 }}>{item.TotalAmount}</Text>
                                        <View style={styles.buttonContainer}>
                                            <Pressable
                                                style={styles.button}
                                                onPress={() => handleCreateDeliveryNotice(item._id)}
                                            >
                                                <Text style={styles.buttonText}>Notice</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                );
                            }
                        })}
                    </View>
                </KeyboardAvoidingView>
                <Pressable
                    onPress={() => navigation.navigate("SupplierHome")}
                    style={{ width: 60, height: 60, backgroundColor: "#AA7AD0", marginTop: 60, marginLeft: 165, borderRadius: 100 }}
                >
                    <Ionicons name="home" size={24} color="white" style={{ marginLeft: 17, marginTop: 16 }} />
                </Pressable>

            </ScrollView>

        </SafeAreaView>
    )
}

export default InvoicesHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    table: {
        width: 400,
        flex: 1,
        backgroundColor: "#AA7AD0",
        marginTop: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontWeight: 'bold',
        marginLeft: 20
    },
    header: {
        textAlign: 'justify',
        fontWeight: 'bold',
        color: 'white',
        marginRight: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#56c411',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
})