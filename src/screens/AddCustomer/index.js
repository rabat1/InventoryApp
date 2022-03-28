import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomHeader } from '../../navigation/CustomHeader';
import Input from '../../Components/Input';
import CustomButton from '../../Components/CustomButton';
import Database from '../../Database';
import { useNavigation, useRoute } from '@react-navigation/core';

const index = () => {
  const [form, setForm] = useState({ customerPhone: '', customerName: '' });
  const db = new Database();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    if (params?.item) {
      const { customerName, customerPhone, customerId } = params?.item;
      setForm((prev) => {
        return {
          customerName,
          customerPhone,
        };
      });
    }
  }, []);

  const onChangeText = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    const { customerName, customerPhone } = form;
    const phone = parseInt(customerPhone);
    form.customerPhone = phone;
    console.log('form', form);
    var re = /^[+]?[0-9]+$/;

    if (params?.item) {

      if (!customerName || !form.customerPhone) {
        Alert.alert("Please fill all the Required Fields");
      }
      else if (!re.test(customerPhone) || form.customerPhone.length < 11 || form.customerPhone.length > 13) {
        Alert.alert("Please Enter Number In 03XXXXXXXXX this format");
      }
      else {
        db.updateCustomer(form, params?.item.customerId);
        navigate('CustomerStack');
      }
    }

    else {
      if (!customerName || !form.customerPhone) {
        Alert.alert("Please fill all the Required Fields");
      }
      else if (!re.test(customerPhone) || form.customerPhone.length < 11 || form.customerPhone.length > 13) {
        Alert.alert("Please Enter Number In 03XXXXXXXXX this format");
      }
      else {
        db.addCustomer(form);

        navigate('CustomerStack');
      }
    }
  }
  return (

    <SafeAreaView style={{ minHeight: '100%', backgroundColor: 'white' }}>
      <CustomHeader title='Add Item' backIcon />

      <ScrollView style={{ marginHorizontal: 20, }} showsVerticalScrollIndicator={false} >

        <Input value={form.customerName || ""}
          label='Item Name' placeholder="Customer Name" onChangeText={(value) => onChangeText({ name: 'customerName', value })} />
        <Input value={form.customerPhone.toString() || ""} label='Phone No.' keyboardType='numeric' placeholder="+923111111111" onChangeText={(value) => onChangeText({ name: 'customerPhone', value })} />

        <CustomButton title='Submit' primary style={{ marginTop: '10%' }} onPress={onSubmit} />

      </ScrollView>
    </SafeAreaView>
  )
}

export default index;