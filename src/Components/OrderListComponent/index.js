import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order 1', //itemName from itemId
    unitsOrdered: '20',
    totalPrice: 'Rs. 1000',
    status: 'Completed',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', //by customerunitsOrdered
   },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order2',
    unitsOrdered: '50',
    totalPrice: 'Rs. 1000',

    status: 'Pending',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order3',
    unitsOrdered: '200',
    totalPrice: 'Rs. 1000',
    status: 'Completed',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: 'bd71acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order 1',
    unitsOrdered: '20',
    totalPrice: 'Rs. 1000',
    status: 'Pending',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: '3a1c68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order2',
    unitsOrdered: '50',
    totalPrice: 'Rs. 1000',
    status: 'Completed',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: '581694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order3',
    unitsOrdered: '200',
    totalPrice: 'Rs. 1000',
    status: 'Pending',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: 'bd7ac1bea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order 1',
    unitsOrdered: '20',
    totalPrice: 'Rs. 1000',
    status: 'Pending',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: '3ac68af1c-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order2',
    unitsOrdered: '50',
    totalPrice: 'Rs. 1000',
    status: 'Completed',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
  {
    id: '58694a30f-3da1-471f-bd96-145571e29d72',
    title: 'Order3',
    unitsOrdered: '200',
    totalPrice: 'Rs. 1000',
    status: 'Pending',
    orderCreatedOn:'24 jan 2022',
    orderedBy:'ahmed', 
  },
];


const Item = ({ title, unitsOrdered, totalPrice,status }) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.title}>{title}</Text>
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
        <Item title={item.title} unitsOrdered={item.unitsOrdered} totalPrice={item.totalPrice} status={item.status} />
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
        data={DATA}
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