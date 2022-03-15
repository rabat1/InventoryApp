import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import List from '../../Components/List'
import { CustomHeader } from '../../navigation/CustomHeader';
import Input from '../../Components/Input'
import Icon from '../../Utils/Icon';
import Database from '../../Database';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";

const index = () => {
  const [search, setSearch] = useState('');
  const { navigate } = useNavigation();
  const [sendData, setSendData] = useState();
  const db = new Database();
  const { params } = useRoute();
  const isFocused = useIsFocused();


  const [data, setData] = useState([]);


  useEffect(() => {

  }, [search]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(
        function (item) {
          const itemData = item.customerName
            ? item.customerName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setSendData(newData);
      setSearch(text);
    } else {
      setSendData(data);
      setSearch(text);
    }
  };

  const getCustomers = () => {
    let customers = [];
    db.listCustomers().then((data) => {
      customers = data;
      setData(customers);
      setSendData(customers);
    }).catch((err) => {
      console.log(err);

    })
  }


  useEffect(() => {
    getCustomers();
  }, [isFocused]);

  const onDelete = (customer) => {
    db.deleteCustomer(customer.customerId);
    getCustomers();
    

  }
  const onAdd = () => {
    navigate('AddCustomer');

  }


  const onEdit = (item) => {
    navigate('AddCustomer', { item });


  }

  const customerOrderDetails = (item) => {
    navigate('OderDetails', { item } );


  }



  return (
    <View style={{ backgroundColor: 'white' }}>
      <CustomHeader title="Customers" />
      <View style={{ marginHorizontal: 20 }}>
        <Input placeholder='Search'
          icon={<Icon name='search' size={20} />}
          iconPosition='right'
          onChangeText={(value) => searchFilterFunction(value)}
        />
      </View>
      <List data={sendData} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} customerOrderDetails={customerOrderDetails} />
    </View>
  )
}

export default index;