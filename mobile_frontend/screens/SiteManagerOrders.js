import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

const SiteManagerOrders = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getOrders();
    }, [])

    //calling the create new delivery notice api
    const getOrders = async () => {
        const response = await axios.get("http://192.168.1.4:8070/orders/allOrders");

        if (response.status === 200) {
            setData(response.data);
        }
        console.log(data);
    }

    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#550C9E", alignItems: "center" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View>
                    <Image
                        style={{ width: 150, height: 100, marginLeft: 120 }}
                        source={require('../assets/images/mbktLogo.png')}
                    />
                </View>

                <KeyboardAvoidingView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 10, color: "white", textAlign: "center" }}>Confirmed Orders</Text>
                        <Text style={{ fontSize: 22, marginTop: 10, color: "white", textAlign: "center" }}>All confirmed orders are listed here</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.header}>S.Mgr Id</Text>
                            <Text style={styles.header}>Supplier</Text>
                            <Text style={styles.header}>Site</Text>
                            <Text style={styles.header}>Amount</Text>
                        </View>
                        {data && data.map((item, index) => (
                            <View style={styles.row} key={index}>
                                <Text>{item.SiteManagerID}</Text>
                                <Text>{item.SupplierName}</Text>
                                <Text>{item.SiteName}</Text>
                                <Text>{item.TotalAmount}</Text>
                            </View>
                        ))}
                    </View>
                </KeyboardAvoidingView>
                <Pressable
                    onPress={() => navigation.navigate("SiteManagerHome")}
                    style={{width: 60, height: 60, backgroundColor: "#AA7AD0", marginTop: 60, marginLeft: 165, borderRadius: 100}}
                >
                    <Ionicons name="home" size={24} color="white" style={{ marginLeft: 17, marginTop: 16 }} />
                </Pressable>

            </ScrollView>

        </SafeAreaView>
    )
}

export default SiteManagerOrders

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
        marginTop: 5,
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