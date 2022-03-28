import { View, Text, ScrollView, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'

const index = ({ data, onConfirm }) => {
    console.log(data);

    const [orderData, setOrderData] = useState();
    useEffect(() => {
        setOrderData({ ...orderData, status: 'Pending', itemId: data.itemId, totalPrice: 0 });
    }, []);

    const setOrderQty = (e) => {
        orderData.unitsOrdered = parseInt(e);
        var totalPricee = parseInt(e) * data.salePricePerUnit;
        orderData.totalPrice = totalPricee;
    }
    return (

        <View style={{ marginHorizontal: 20 }}>
            <View style={styles.alignRow}>
                <Text style={styles.text}>{data.itemName}</Text>
                <View style={{ flex: 1 }}>
                    <Text >{data.salePricePerUnit} </Text>
                    <Text >SalePrice</Text>
                </View>
                <TextInput onChangeText={(e) => setOrderQty(e)} style={styles.input} placeholder="No.Ordered" />
            </View>

            <View style={styles.button}>
                <Button title="Confirm" onPress={() => onConfirm(orderData)} />
            </View>

            <View style={styles.scan}>
                <Button title='Scan item Again' onPress={() => navigate("Scanner")} />
            </View>

        </View>
    )
}

export default index;