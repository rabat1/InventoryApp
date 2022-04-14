import { Text, View } from 'react-native'
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
      if(data.length>0){
      setOrderr(orderss);
      }
    }).catch((err) => {
      console.log(err);

    });
  }
  useEffect(() => {
    getOrders();
  }, [isFocused]);
  
  return (
    <View style={{backgroundColor:'white',minHeight:'100%'}}>
      <CustomHeader title="Shop's Orders" backIcon />
      {orderr?
      <OrderListComponent data={orderr} />:
      <Text style={{textAlign:'center',fontSize:16,marginTop:'70%'}}>
        No Data
        </Text>
      }
    </View>
  )
}

export default index;