import { StyleSheet } from "react-native"
import Colors from '../../Utils/Colors';

export default StyleSheet.create({
  
wrapper:{
    height:42,
    marginVertical:5,
    borderRadius:10,
    alignItems:'center',
    paddingHorizontal:5,
    justifyContent:'space-evenly'
},
error:{
    color:Colors.danger,
    paddingTop:4,
    fontSize:12
},
loadingSection:{
flexDirection:'row'
},

});