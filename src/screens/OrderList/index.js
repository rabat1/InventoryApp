import { View, Text } from 'react-native'
import React from 'react'
import OrderListComponent from '../../Components/OrderListComponent';
import { CustomHeader } from '../../navigation/CustomHeader';

const index = () => {
  return (
    <View>
        <CustomHeader title="Shop's Orders" backIcon />
      <OrderListComponent />
    </View>
  )
}

export default index