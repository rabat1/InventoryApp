import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Table from '../../Components/Table'
import {CustomHeader} from '../../navigation/CustomHeader'
const index = () => {
  
  return (
    <>
    <CustomHeader title='Sales History'/>
    <View style={{backgroundColor:'white'}}>
    <Text style={{marginVertical:'5%',textAlign: 'center',fontSize:18}}>Sales History Record</Text>
    <ScrollView>
<Table />
    </ScrollView>
    </View>
    </>
  )
}

export default index;