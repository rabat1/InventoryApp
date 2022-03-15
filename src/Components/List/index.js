import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Icon from '../../Utils/Icon'
import styles from './styles'
import Colors from '../../Utils/Colors'

const index = (props) => {
  
  const ItemSeprator = () => {
    return (
      <View style={{ height: 1, backgroundColor: "rgba(0,0,0,0.3)", marginHorizontal: 10, }} />
    )
  }
  

  const EditDelete = ({ item }) => {
    return (
      <>
        <TouchableOpacity style={styles.IconContainer} onPress={() => props.onEdit(item)} >
          <Icon size={22} name='pencil' color='black' />
          <Text style={styles.textColor}  >Edit</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.onDelete(item)} style={styles.IconContainer}>
          <Icon size={22} name='trash' color='red' />
          <Text style={styles.textColor} >Delete</Text>

        </TouchableOpacity>
      </>
    )

  }

  const renderView = ({ item, index }) => {
    return (
      <>
        {item.itemName ?
          (
            <TouchableOpacity style={styles.container} onPress={() => props.showDescription(item)} >
              <Text style={[styles.itemName, styles.textColor]} >{item.itemName}</Text>

              <View style={styles.qtyContainer} >
                <Text style={[styles.qtyText, styles.textColor]}>{item.itemStock}</Text>
                <Text style={styles.textColor}>Qty</Text>
              </View>
              <EditDelete item={item} />


            </TouchableOpacity>
          )
          :
          (
            <View style={styles.container}  >
              <View style={{ flex: 7 }}>

                <Text style={[styles.itemName, styles.textColor]} >{item.customerName}</Text>
                <Text style={styles.textColor} >{item.customerPhone}</Text>
              </View>
              <TouchableOpacity style={{flex:5}} onPress={()=>props.customerOrderDetails(item)}>
                <Text style={{color:Colors.primary}}>Order Details</Text>

              </TouchableOpacity>
              <EditDelete item={item} />


            </View>
          )
        }
      </>
    )
  }

  const ListEmptyComponent = () => {
    return (
      <Text>No Items</Text>
    )
  }
  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%', }}>

      <FlatList
        data={props.data}
        renderItem={(item, index) => renderView(item, index)}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={ItemSeprator}
        ListFooterComponent={() => (
          <View style={{ height: 400 }}></View>
        )}
      />
      <TouchableOpacity onPress={props.onAdd} style={styles.addButton}>
        <Icon name='plus' size={25} color='white' />
      </TouchableOpacity>



    </View>
  )
}

export default index;