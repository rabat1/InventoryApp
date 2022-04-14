import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import { CustomHeader } from '../../navigation/CustomHeader'
import Database from '../../Database';
import { useIsFocused } from '@react-navigation/core';

const index = () => {
  const db = new Database();
  const [saleRecord, setSaleRec] = useState(null);
  const isFocused = useIsFocused();

  const getSaleRec = async () => {
    await db.listSalesHistory().then((data) => {
      var temp = [];
      for (var i = 0; i < data.length; i++) {
        temp.push(
          [
            data[i].itemName,
            data[i].totalPrice,
            data[i].unitsOrdered,
            data[i].OrderCompletedOn,
            data[i].salePricePerUnit,
            data[i].costPerUnit
          ]
        )
      };
      if(temp.length>0){
          setSaleRec(temp);}
    }).catch((err) => {
      console.log(err);
    });
  };
  
  // useEffect(() => {
  //   getSaleRec();
  // }, []);
  useEffect(() => {
    getSaleRec();
  }, [isFocused]);
  

  useEffect(() => { }, [saleRecord]);

  return (
    <>
      <CustomHeader title='Sales History' />
      <View style={{ backgroundColor: 'white',minHeight:'100%' }}>
        <Text style={{ marginVertical: '5%', textAlign: 'center', fontSize: 18 }}>Sales History Record</Text>
        <ScrollView>
          {saleRecord ?
            <Table saleRecord={saleRecord} /> : <Text style={{textAlign:'center',fontSize:16,marginTop:'70%'}}>No Sales Record</Text>
          }
        </ScrollView>
        <View style={{ minHeight: '40%' }} />
      </View>
    </>
  )
}

export default index;