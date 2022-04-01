import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    base: {
        backgroundColor: 'white',
      },
      alignRow: {
        flexDirection: 'row',
        display:'flex',
        marginTop:'10%'
      },
      input: {
        borderWidth: 1,
        width: 40,
        height: 35,
        fontSize: 15,
        paddingVertical: 0,
        paddingHorizontal: 7,
        flex:1,
    
      },
      text: {
        fontSize: 18,
        color: 'black',
        flex:2
      }
    
})