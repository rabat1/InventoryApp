import { View, Text } from 'react-native'
import React from 'react';
import {useNavigation, useRoute } from '@react-navigation/core';

const index = (props) => {

    const {navigate}=useNavigation();
    const {params} = useRoute();

    console.log('description', params?.item.customerId);
    
    
  return (
    <View>
      <Text>Order  Details</Text>
    </View>
  )
}

export default index;