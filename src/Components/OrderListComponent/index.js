import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order 1',
    order: '20',
    price: 'Rs. 1000'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order2',
    order: '50',
    price: 'Rs. 1000'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order3',
    order: '200',
    price: 'Rs. 1000'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order 1',
    order: '20',
    price: 'Rs. 1000'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order2',
    order: '50',
    price: 'Rs. 1000'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order3',
    order: '200',
    price: 'Rs. 1000'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Order 1',
    order: '20',
    price: 'Rs. 1000'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Order2',
    order: '50',
    price: 'Rs. 1000'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Order3',
    order: '200',
    price: 'Rs. 1000'
  },
];

const Item = ({ title, order, price }) => (
  <View style={styles.item}>
    <View>
    <Text style={styles.title}>{title}</Text>
    </View>
    <View>
    <Text style={styles.title}>{order}</Text>
    <Text >Qty</Text>
    
    </View>
    <View>
    <Text style={styles.title}>{price}</Text>
    <Text>Total bill</Text>
   
    </View>
    <Text>Status</Text>
  </View>
);

const index = () => {

  const renderItem = ({ item, order, price }) => (
    <Item title={item.title} order={item.order} price={item.price} />
  );
  const ItemSeprator = () => {
    return (
      <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.3)", marginHorizontal: 10, }} />
    )
  }
  
  return (
      <View style={{marginHorizontal:20}}>
        <Text style={{textAlign:'center',fontSize:17,fontWeight:'600',marginBottom:'5%'}}>Past Order List</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item,index) => index}
      ListFooterComponent={(<View style={{height:300}}></View>)}
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
export default index