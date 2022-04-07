import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderListComponent from '../../Components/OrderListComponent';
import { CustomHeader } from '../../navigation/CustomHeader';
import Database from '../../Database';
import { useIsFocused } from '@react-navigation/core';

const index = () => {
  const db= new Database();
  const[orderr,setOrderr]=useState();
  const isFocused = useIsFocused();


  const getOrders = async() => {
    let orderss = [];
    await db.listOrders().then((data) => {
      orderss = data;
      setOrderr(orderss);
      console.log('data',data);
    }).catch((err) => {
      console.log(err);

    });
  }
  useEffect(() => {
    getOrders();
  }, [isFocused]);
  
  return (
    <View style={{backgroundColor:'white'}}>
      <CustomHeader title="Shop's Orders" backIcon />
      <OrderListComponent data={orderr} />
    </View>
  )
}

export default index;