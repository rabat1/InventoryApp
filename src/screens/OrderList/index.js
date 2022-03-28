import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import OrderListComponent from '../../Components/OrderListComponent'
import { CustomHeader } from '../../navigation/CustomHeader';
import Database from '../../Database';
import OrderConfirmCard from '../../Components/OrderConfirmCard';
import { useIsFocused } from "@react-navigation/native";
import { Alert, View } from 'react-native';
const index = () => {

  const { params: { response } = {} } = useRoute();
  console.log(response.rawData);
  const { navigate } = useNavigation();
  const db = new Database();

  const [data, setData] = useState();
  const isFocused = useIsFocused();

  const getProduct = () => {
    let product = [];
    db.productById(response.rawData).then((data) => {
      product = data;
      setData(product);
    }).catch((err) => {
      console.log(err);

    })
  }


  useEffect(() => {
    response ? getProduct() : null;
  }, []);

  useEffect(() => { }, [data]);

  const onConfirm = (data) => {
    console.log(data);
    //customer..???
    Alert.alert("Added.. Status: " + data.status+' Total Bill: '+data.totalPrice+' Total Qty: '+data.unitsOrdered);
    //After Confrim update inventory quantity in db
    setData(null);

  }

  return (
    <>
      <CustomHeader title="Order List" backIcon />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {
          data ?
            <OrderConfirmCard data={data} onConfirm={onConfirm} />
            : null
        }
        <OrderListComponent />
      </View>
    </>
  )
};

export default index;