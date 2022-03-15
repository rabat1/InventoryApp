import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import Colors from '../../Utils/Colors';
import styles from './styles';

const CustomButton = ({
    title,
    disabled,
    secondary,primary,danger,
    loading,
    onPress,
    style
}) => {
    const getBgColor=()=>{
        if(disabled){
            return Colors.grey;
        }
        if(secondary){
            return Colors.secondary;
        }
        else if(danger){
            return Colors.danger;
        }
        else if(primary){
            return Colors.primary;
        }
        }
    return (
        <>
        {loading?<ActivityIndicator style={{marginTop:'10%'}}  />:
        <TouchableOpacity onPress={onPress}
         style={[styles.wrapper,{backgroundColor:getBgColor()},style]}>
                <View style={[styles.loadingSection]}>
                 {loading&& <ActivityIndicator color={primary?Colors.blue:Colors.secondary}/>}   
                {title&&
                <Text style={{
                    color: disabled?'black':Colors.white,
                     paddingLeft: loading?5:0,
                     fontFamily:'Charm-Bold',fontSize:16}}>
                    {loading ? 'Please wait': title}
                </Text>
                }

                </View>
          
        
        </TouchableOpacity>
}
        </>
    )
}

export default CustomButton;
