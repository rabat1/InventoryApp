import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomHeader } from '../../navigation/CustomHeader'
import Input from '../../Components/Input';
import Icon from '../../Utils/Icon';
import ImagePicker from '../../Components/ImagePicker';
import ScannerComponent from '../../Components/ScannerComponent'
import CustomButton from '../../Components/CustomButton';
import Colors from '../../Utils/Colors';
import Database from '../../Database';
import { useNavigation, useRoute } from '@react-navigation/core';
import styles from './styles';

const index = () => {
  const [localFile, setLocalFile] = useState(null);
  const [Scanstart, setScanstart] = useState(false);
  const [form, setForm] = useState({ itemStock: 1, salePricePerUnit: '', costPerUnit: '' });
  const [scan, setScan] = useState(false);
  const [ScanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  //const [edit, setEdit] = useState(false);
  const { navigate } = useNavigation();

  const db = new Database();
  const { params } = useRoute();

  useEffect(() => {

    if (params?.item) {
      const {
        itemName,
        itemDesc,
        itemImage,
        itemId,
        costPerUnit,
        salePricePerUnit,
        itemStock,
      } = params?.item;
      setForm((prev) => {
        return {
          itemName,
          itemDesc,
          itemImage,
          itemId,
          costPerUnit,
          salePricePerUnit,
          itemStock,
        };
      });
    }
  }, []);

  const onSuccess = (response) => {
    const check = response.data.substring(0, 4);

    setResult(response);
    setScan(false);
    setScanResult(true);
    setForm({ ...form, 'itemId': response.rawData });

    if (check === 'http') {
      setScanResult(false);

    } else {
      setResult(response);
      setScan(false);
      setScanResult(false);
    }
  }


  const activeQR = () => {
    setScan(true);
  }

  useEffect(() => { }, [result])

  const onChangeText = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };


  const onIncrease = (value) => {
    var z = parseInt(value);
    setForm({ ...form, 'itemStock': z + 1 });
  }

  const onDecrease = (value) => {
    var z = parseInt(value);
    if (z > 1) {
      setForm({ ...form, 'itemStock': z - 1 });
    }
    else {
      Alert.alert("Already Minimum Quantity 1");
    }
  }

  const onSubmit = async() => {

    const re = /^[0-9\b]+$/;
    const { itemName, itemDesc, salePricePerUnit, itemStock, costPerUnit, itemImage } = form;

    if (params?.item) {

      if (!itemName || !itemDesc || !salePricePerUnit || !itemImage || !costPerUnit) {
        Alert.alert("Please fill all the Required Fields");
      }
      else if (!re.test(itemStock)) {
        Alert.alert("Please Enter Correct Quantity ");
      }
      else {
        await db.updateProduct(form, form.itemId);
        navigate('InventoryStack');
      }

    }
    else {
      if (!itemName || !itemDesc || !salePricePerUnit || !itemImage || !result || !costPerUnit) {
        Alert.alert("Please fill all the Required Fields");
      }
      else if (!re.test(itemStock)) {
        Alert.alert("Please Enter Correct Quantity ");
      }
      else {
        var response=await db.addProductItem(form);
      
        if(response.message){
          if(response.message.includes("UNIQUE constraint failed")){
          Alert.alert("Item Already Exist Please add Unique item");
          }
          else{
            Alert.alert("Item could not added please try Again");
          }
          navigate('InventoryStack');
        }
      
        else{
        navigate('InventoryStack');
        }
      }
    }
  }

  const sheetRef = useRef(null);

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  }
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  }

  const onFileSelected = (image) => {
    closeSheet();
    setLocalFile(image);
    setForm({ ...form, 'itemImage': image.path });
  }
  const setView = () => {
    setScanstart(prev => !prev);
  }

  return (
    <SafeAreaView style={{ minHeight: '100%', backgroundColor: 'white' }}>
      <CustomHeader title='Add Item' backIcon />

      <ScrollView style={{ marginHorizontal: 20, }} showsVerticalScrollIndicator={false} >

        <Input value={form.itemName || ""}
          label='Item Name' placeholder="Enter Name" onChangeText={(value) => onChangeText({ name: 'itemName', value })} />
        <Input value={form.itemDesc || ""} label='Description' multiline placeholder="Enter Description" onChangeText={(value) => onChangeText({ name: 'itemDesc', value })} />

        <View style={styles.subContainer}>

          <View style={styles.viewContainer}>

            <Input
              keyboardType="numeric"
              value={(form.itemStock).toString()}
              label="Stock"
              icon=
              {
                <View>
                  <TouchableOpacity onPress={() => onIncrease(form.itemStock)}>
                    <Icon name='chevron-up' size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDecrease(form.itemStock)}>
                    <Icon name='chevron-down' size={18} />
                  </TouchableOpacity>
                </View>
              }
              iconPosition='right'
              onChangeText={(value) => onChangeText({ name: 'itemStock', value })} />
          </View>

          <View style={styles.viewContainer}>
            <Input value={form.salePricePerUnit.toString() || ""} keyboardType="numeric" label='Unit Price' placeholder="Price" onChangeText={(value) => onChangeText({ name: 'salePricePerUnit', value })} />
          </View>

        </View>

        <Input value={form.costPerUnit.toString() || ""} keyboardType="numeric" label='Unit Cost' placeholder="Cost" onChangeText={(value) => onChangeText({ name: 'costPerUnit', value })} />


        <TouchableOpacity onPress={openSheet} >
          <Image source={{ uri: localFile?.path || form.itemImage || 'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder.png' }} width={150} height={150}
            style={styles.img} />
          <Text style={styles.txt}>Choose Image</Text>
        </TouchableOpacity>


        <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />

        {params?.item ? null :
          Scanstart ?
            <ScannerComponent
              ScanResult={ScanResult}
              scan={scan}
              activeQR={activeQR}
              onSuccess={onSuccess}
            />
            : null
        }
        
        {
        params?.item ? null :
          <TouchableOpacity onPress={setView} style={{ marginTop: '5%', backgroundColor: Colors.primary, height: 40, borderRadius: 20, justifyContent: 'center' }} >
            {
            Scanstart ? <Text style={styles.txtWhite}>Hide Scanner</Text> :
              <Text style={styles.txtWhite}>Scan Item to Add</Text>
            }
          </TouchableOpacity>
        }
        <CustomButton title='Submit' primary style={{ marginTop: '10%' }} onPress={onSubmit} />
        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default index;