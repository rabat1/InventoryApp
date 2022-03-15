import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddCustomer, AddInventoryItem, Customer, Inventory, Itemdescription, OrderDetails, OrderPlace, SalesHistory, Scanner, Transaction } from '../../screens';

const ApplicationStack= createNativeStackNavigator();

export function OrderScannerStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='Scanner'>
        <ApplicationStack.Screen name='Scanner' component={Scanner} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='Order Place' component={OrderPlace} options={{headerShown:false}}/>
  
      </ApplicationStack.Navigator>
    )
  }
  export function TransactionStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='TransactionStack'>
        <ApplicationStack.Screen name='TransactionStack' component={Transaction} options={{headerShown:false}}/>
        
      </ApplicationStack.Navigator>
    )
  }
  export function InventoryStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='InventoryStack'>
        <ApplicationStack.Screen name='InventoryStack' component={Inventory} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='AddItem' component={AddInventoryItem} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='itemDescription' component={Itemdescription} options={{headerShown:false}}/>
   
      </ApplicationStack.Navigator>
    )
  }
  export function SalesHistoryStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='SalesHistoryStack'>
        <ApplicationStack.Screen name='SalesHistoryStack' component={SalesHistory} options={{headerShown:false}}/>
        
      </ApplicationStack.Navigator>
    )
  }
  export function CustomerStack(){
    return(
      <ApplicationStack.Navigator initialRouteName='CustomerStack'>
        <ApplicationStack.Screen name='CustomerStack' component={Customer} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='AddCustomer' component={AddCustomer} options={{headerShown:false}}/>
        <ApplicationStack.Screen name='OderDetails' component={OrderDetails} options={{headerShown:false}} />
      </ApplicationStack.Navigator>
    )
  }

  
