import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

const RequisitionRequests = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getRequisitions();
    }, [])

    const getRequisitions = async () => {
        const response = await axios.get("http://192.168.8.115:8070/requisitions/allRequistions");

        if (response.status === 200) {
            setData(response.data);
        }
        console.log(data);
    }

    const handleUpdate = (id) => {
        // Navigate to the update screen with the ID
        navigation.navigate('UpdateRequisition', { _id: id });
    };

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
                        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 2, color: "white", textAlign: "center" }}>Requisition Requests</Text>
                        <Text style={{ fontSize: 22, marginTop: 10, color: "white", textAlign: "center" }}>All submitted requests are listed here</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.header}>SMgr Id</Text>
                            <Text style={styles.header}>Site</Text>
                            <Text style={styles.header}>Status</Text>
                            <Text style={styles.header}>Actions</Text>
                        </View>
                        {data && data.map((item, index) => (
                            <View style={styles.row} key={index}>
                                <Text>{item.SiteManagerID}</Text>
                                <Text>{item.SiteName}</Text>
                                <Text>{item.Status}</Text>
                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        style={styles.button}
                                        onPress={() => handleUpdate(item._id)}
                                    >
                                        <Text style={styles.buttonText}>Update</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>
                </KeyboardAvoidingView>

            </ScrollView>

        </SafeAreaView>
    )
}

export default RequisitionRequests

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    table: {
        width: 400,
        flex: 1,
        backgroundColor: "#AA7AD0",
        marginTop: 30
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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