import { View, Text, Button, Alert } from 'react-native'
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { CustomHeader } from '../../navigation/CustomHeader';
import styles from './styles';
import Database from '../../Database';

const index = (props) => {

  const { params } = useRoute();
  const db = new Database();
  const { navigate } = useNavigation();

  const DetailView = ({ title, value }) => (
    <View style={styles.displayView}>
      <Text style={styles.title}>{title} </Text>
      <Text style={[params?.item.status == 'Completed' ? { color: 'green' } : { color: 'orange' }, { fontSize: 17, flex: 1 }]}>{value}</Text>
    </View>
  );

  const updateStatus = async () => {
    const { orderId, itemId } = params?.item;
    await db.updateOrderStatus(orderId);
    Alert.alert('Order Status Has Been updated');
    await db.addSalesHistory(orderId, itemId);
    navigate('OderList');
  };

  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
      <CustomHeader title='Order Details' backIcon />
      <View style={styles.container}>
        <DetailView title='Item Name :' value={params?.item.itemName} />
        <DetailView title='Status :' value={params?.item.status} />
        <DetailView title='Units Ordered :' value={params?.item.unitsOrdered} />
        <DetailView title='Oder Created On :' value={params?.item.orderCreatedOn} />
        <DetailView title='Total Bill :' value={params?.item.totalPrice} />

        {params?.item.status == 'Pending' ?
          <View style={{ marginTop: 20 }}>
            <Button title='Mark As Completed' onPress={updateStatus} />
          </View> :
          null
        }
      </View>
    </View>
  )
}

export default index;