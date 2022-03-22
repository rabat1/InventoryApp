import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    base: {
        backgroundColor: 'white',
      },
      scan: {
        alignSelf:'center',
        width:'60%',
        marginVertical:'6%'
      },
      alignRow: {
        flexDirection: 'row',
        display:'flex',
        marginTop:'10%'
      },
      button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        width: '100%'
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
        fontSize: 16,
        color: 'black',
        flex:1
      }
    
})