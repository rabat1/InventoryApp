import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Card from '../Card'
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    order: '20',
    price: 'Rs. 1000'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    order: '50',
    price: 'Rs. 1000'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    order: '200',
    price: 'Rs. 1000'
  },
];

const Item = ({ title, order, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{order}</Text>
    <Text style={styles.title}>{price}</Text>
  </View>
);

const index = () => {

  const renderItem = ({ item, order, price }) => (
    <Item title={item.title} order={item.order} price={item.price} />
  );

  return (
    <Card style={styles.base}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Card>
  )
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: 'beige',
    elevation: 5
  },
  item: {
    backgroundColor: 'beige',
    padding: 10,
    elevation: 10,
    shadowColor: 'brown',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: 'black'
  }
})
export default index