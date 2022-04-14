import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/core';
import { CustomHeader } from '../../navigation/CustomHeader';

const index = () => {
    const { params: { item } = {} } = useRoute();
    return (
        <View style={{ minHeight: '100%', backgroundColor: 'white' }}>
            <CustomHeader title="Item Details" backIcon />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: '5%', marginHorizontal: 10 }}>
                <Image source={{ uri: item.itemImage }}
                    style={{ width: 200, height: 200, alignSelf: 'center', resizeMode: 'cover', padding: 10, borderRadius: 200 / 2, }}
                />
                <Text style={{ textAlign: 'center', margin: '3%', color: 'black', fontSize: 22 }}>{item.itemName}</Text>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>
                    {item.itemDesc}</Text>
            <View style={{marginTop:20, alignContent:'center'}}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 17 }}>Stock : {item.itemStock}</Text>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 17 }}>Unit Cost Price : {item.costPerUnit}</Text>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 17 }}>Unit Sale Price: {item.salePricePerUnit}</Text>
            </View>
            </ScrollView>
        </View>
    )
}

export default index;