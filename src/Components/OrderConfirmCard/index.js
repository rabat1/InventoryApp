import { View, Text,ScrollView,TextInput,Button } from 'react-native'
import React from 'react'
import styles from './styles'

const index = ({data}) => {
console.log(data);
    return (

            <View style={{ marginHorizontal: 20 }}>
                <View style={styles.alignRow}>
                    <Text style={styles.text}>{data.itemName}</Text>
                    <View style={{ flex: 1 }}>
                        <Text >{data.salePricePerUnit} </Text>
                        <Text >SalePrice</Text>

                    </View>
                    <TextInput style={styles.input} placeholder="No.Ordered" />
                </View>
                <View style={styles.button}>
                    <Button title="Confirm" onPress={() => console.log('pressed')} />
                </View>
            <View style={styles.scan}>
                <Button title='Scan item Again' onPress={() => navigate("Scanner")} />
            </View>


            </View>
           

    )
}

export default index;