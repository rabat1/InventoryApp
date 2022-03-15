import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    container:
        { 
            marginHorizontal: 20,
            marginVertical: 10, 
            flexDirection: 'row', 
            display: 'flex', 
            alignItems: 'center' 
    },
    itemName:{ flex: 7, fontSize: 16},
    qtyContainer:{ flex: 5, alignItems: 'center' },
    IconContainer:{ flex: 2.5, alignItems: 'center' },
    qtyText:{fontSize:16,fontWeight:'bold'},
    textColor:{ color: 'black' },
    addButton:{
        position: 'absolute', right: '10%', top: '60%',
        borderRadius: 50, borderColor: 'black', borderWidth: 2, padding: 12, backgroundColor: 'black',
      }
   
})