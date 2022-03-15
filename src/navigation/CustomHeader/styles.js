import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    container:{
        flexDirection: 'row',
        height:55,
        backgroundColor:'white',
        borderBottomWidth:0.5,
    },
    iconContainer:{
        flex:1,
        justifyContent:'center',
    },
    textContainer:{
        flex:1.5,
        justifyContent:'center',
    },
    headerText:{
        textAlign:'center',
        fontSize:22,
        color:Colors.secondary,
      
    }
})