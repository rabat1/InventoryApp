import { StyleSheet } from "react-native"
import Colors from "../../Utils/Colors"

export default StyleSheet.create({
    subContainer: {
        flexDirection: 'row',
        display: 'flex',
    },
    viewContainer: {
        flex: 2,
        padding: 10
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    img: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'stretch',
        padding: 10,
    },
    txt: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
    },
    txtWhite:{ 
        textAlign: 'center', 
        color: 'white' 
    },

})