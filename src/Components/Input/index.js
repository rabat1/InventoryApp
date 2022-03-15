import React,{useState} from 'react'
import { View, Text, TextInput } from 'react-native'
import Colors from '../../Utils/Colors';
import styles from './styles';

const Input = ({label,multiline,onChangeText,error,icon,iconPosition, style, value, ...props}) => {
   const [focus, setFocus] = useState(false)
   
   const getFlexDirection=()=>{
        if(icon && iconPosition){
            if(iconPosition=='left'){
                return 'row';
            } else if(iconPosition=='right'){
                return 'row-reverse';
            }
        }
    }
    const getBorderColor=()=>{
        if(error){
            return Colors.danger;
        }
        if(focus){
            return Colors.primary;
        }
       
        else return Colors.grey;
    }
    return (
        <View style={styles.inputContainer}>

            {label&&<Text style={{color:'black'}}>{label}</Text>}

         <View style={[styles.wrapper,{alignItems:icon?'center':'baseline',height:multiline?100:45},
         {borderColor:getBorderColor(),
                flexDirection: getFlexDirection()}]}>
                 <View >{icon&&icon}</View>
                    <TextInput 
                    onChangeText={onChangeText}
                    value={value}
                    style={[styles.textInput,style]}
                    onFocus={()=>setFocus(true)}
                    onBlur={()=>setFocus(false)}
                
                    {...props}
                    />
                </View>

           {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

export default Input;
