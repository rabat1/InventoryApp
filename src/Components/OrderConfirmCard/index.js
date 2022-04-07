import { View, Text, ScrollView, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import CustomButton from '../CustomButton';
import Input from '../Input';
import Icon from '../../Utils/Icon';
import { useNavigation } from '@react-navigation/core';

const index = ({ data, onConfirm }) => {
    //    console.log(data);
    const { navigate } = useNavigation();

    const [orderData, setOrderData] = useState({
        unitsOrdered: 1,
        status: 'Pending',
        itemId: data.itemId,
        totalPrice: data.salePricePerUnit,
        itemName: data.itemName,

    });

    const setOrderQty = (e) => {

        orderData.unitsOrdered = parseInt(e);
        var totalPricee = parseInt(e) * data.salePricePerUnit;
        orderData.totalPrice = totalPricee;
        setOrderData({ ...orderData, 'unitsOrdered': e });
    }

    return (

        <View style={{ marginHorizontal: 20 }}>

            <View style={styles.alignRow}>
                <Text style={styles.text}>{data.itemName}</Text>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 17 }} >{data.salePricePerUnit} </Text>
                    <Text style={{ color: 'black', fontSize: 15 }}>SalePrice</Text>
                </View>
            </View>

            <Input
                keyboardType="numeric"
                value={(orderData.unitsOrdered).toString()}
                label="Order Quantity"
                onChangeText={(e) => setOrderQty(e)}
                autoFocus={true}
            />

            <CustomButton title='Confirm' primary style={{ marginTop: '5%' }} onPress={() => onConfirm(orderData)} />
        </View>
    )
}

export default index;