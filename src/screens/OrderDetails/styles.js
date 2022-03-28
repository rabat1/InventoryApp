import { StyleSheet } from "react-native"

export default StyleSheet.create({
    displayView:
    {
        flexDirection: 'row',
        display: 'flex',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    title: {
        fontSize: 18,
        flex: 1.3,
        color: 'black'
    },
    container:
    {
        marginHorizontal: 20, marginTop: 50, padding: 20, paddingVertical: 70,
        borderColor: '#ddd',
        shadowColor: 'grey',
        shadowOpacity: 3,
        shadowRadius: 5,
        elevation: 5,
    },

});