import { View, Text, Button, Alert } from 'react-native'
import React from 'react';
import { useRoute } from '@react-navigation/core';
import { CustomHeader } from '../../navigation/CustomHeader';
import styles from './styles';

const index = (props) => {

  const { params } = useRoute();


  console.log('description', params?.item);

  const DetailView = ({ title, value }) => (
    <View style={styles.displayView}>
      <Text style={styles.title}>{title} </Text>
      <Text style={[params?.item.status == 'Completed' ? { color: 'green' } : { color: 'orange' }, { fontSize: 17, flex: 1 }]}>{value}</Text>
    </View>
  );
  const updateStatus=()=>{
    Alert.alert('Order Status Has Been updated');
    //backend updation in orders table
  }

  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
      <CustomHeader title='Order Details' backIcon />
      <View style={styles.container}>
        <DetailView title='Item Name :' value={params?.item.title} />
        <DetailView title='Status :' value={params?.item.status} />
        <DetailView title='Units Ordered :' value={params?.item.unitsOrdered} />
        <DetailView title='Oder Created On :' value={params?.item.orderCreatedOn} />
        <DetailView title='Odered By :' value={params?.item.orderedBy} />
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