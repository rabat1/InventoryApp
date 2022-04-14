import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import List from '../../Components/List'
import { CustomHeader } from '../../navigation/CustomHeader'
import { useNavigation } from '@react-navigation/core';
import Database from '../../Database';
import { useIsFocused } from "@react-navigation/native";


const index = (props) => {
  const { navigate } = useNavigation();
  const db = new Database();

  const [productss, setProducts] = useState([]);
  const isFocused = useIsFocused();


  const getProducts = async() => {
    let products = [];
    await db.listProduct().then((data) => {
      products = data;
      setProducts(products);
    
    }).catch((err) => {
      console.log(err);

    })
  }

  useEffect(() => {
    getProducts();
  }, [isFocused]);
  useEffect(()=>{},[productss]);

  const onDelete = (item) => {
    db.deleteProduct(item.itemId);
    getProducts();

  }
  const onAdd = () => {
    navigate('AddItem');
  }

  const onEdit = (item) => {
    navigate('AddItem', { item })
  }

  const showDescription = (item) => {
    navigate('itemDescription', { item })
  }


  return (
    <View>
      <CustomHeader title='Inventory' />
      {productss?
      <List data={productss} onDelete={onDelete} onEdit={onEdit} onAdd={onAdd} showDescription={showDescription}/>
      :null}
      </View>
  )
}

export default index;