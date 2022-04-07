import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = ({ unitsOrdered, totalPrice,status,itemName }) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.title}>{itemName}</Text>
    </View>
    <View>
      <Text style={styles.title}>{unitsOrdered}</Text>
      <Text >Qty</Text>

    </View>
    <View>
      <Text style={styles.title}>{totalPrice}</Text>
      <Text>Total bill</Text>

    </View>
    
    <Text style={status=='Pending'?{color:'orange'}:{color:'green'}}>{status}</Text>
  </View>
);

const index = ({data}) => {

  const { navigate } = useNavigation();
  console.log('orderList',data);


  const renderItem = ({ item }) => {

    const orderDetails = (item) => {
     // console.log('itemm', item);
      navigate('OderDetails', { item });
    }

    return (

      <TouchableOpacity onPress={() => orderDetails(item)}>
        <Item  itemName={item.itemName} unitsOrdered={item.unitsOrdered} totalPrice={item.totalPrice} status={item.status} />
      </TouchableOpacity>
    )
  };
  const ItemSeprator = () => {
    return (
      <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.3)", marginHorizontal: 10, }} />
    )
  }




  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '600', marginBottom: '5%' }}>Shop's Order List</Text>
      <FlatList
        data={data}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index}
        ListFooterComponent={(<View style={{ height: 300 }}></View>)}
        ItemSeparatorComponent={ItemSeprator}
        showsVerticalScrollIndicator={false}
      />
    </View>

  )
};
const styles = StyleSheet.create({

  item: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'black'
  }
})
export default index;