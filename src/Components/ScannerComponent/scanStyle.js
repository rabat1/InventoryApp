import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
   heading:{fontSize:20,textAlign:'center',color:'black'},
   center:{alignItems:'center'},
   subHeading:{ color: 'black',fontSize:18},
}
export default styles;