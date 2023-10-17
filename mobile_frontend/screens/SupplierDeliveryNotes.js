import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../components/ContextComponent.js';

const SupplierDeliveryNotes = () => {
    const [data, setData] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigation = useNavigation();

    const SupplierName = user.SupplierName;

    useEffect(() => {
        getDeliveryNotes();
    }, [])

    //calling the view all delivery notices api
    const getDeliveryNotes = async () => {
        const response = await axios.get("http://192.168.8.115:8070/Notices/allNotices");

        if (response.status === 200) {
            setData(response.data);
        }
        console.log(data);
    }

    const handleUpdate = (id) => {
        // Navigate to the update screen with the ID
        navigation.navigate('UpdateDeliveryNotice', { id: id });
    };

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
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Delivery Notices</Text>
                        <Text style={{ fontSize: 22, marginTop: 10, color: "white", textAlign: "center" }}>All submitted delivery notes are listed here</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.header}>Supplier</Text>
                            <Text style={styles.header}>S.Mgr Id</Text>
                            <Text style={styles.header}>Status</Text>
                            <Text style={styles.header}>Actions</Text>
                        </View>
                        {data && data.map((item, index) => {
                            if (item.SupplierName === SupplierName) {
                                return (
                                    <View style={styles.row} key={index}>
                                        <Text style={{ marginTop: 15 }}>{item.SupplierName}</Text>
                                        <Text style={{ marginTop: 15 }}>{item.SiteName}</Text>
                                        <Text style={{ marginTop: 15 }}>{item.Status}</Text>
                                        <View style={styles.buttonContainer}>
                                            <Pressable
                                                style={styles.button}
                                                onPress={() => handleUpdate(item._id)}
                                            >
                                                <Text style={styles.buttonText}>Update</Text>
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

export default SupplierDeliveryNotes

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
    },
    header: {
        textAlign: 'justify',
        fontWeight: 'bold',
        color: 'white',
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