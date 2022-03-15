import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from '../../Utils/Icon';
import styles from './styles';
import ImagePickerCropper from 'react-native-image-crop-picker';

const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
    console.log("jjj")
    const options = [
        {name:'Open Camera', icon:<Icon color='grey' size={17} name='camera' />,
        onPress:()=>{
            ImagePickerCropper.openCamera({
                width:300,
                height:300,
                cropping:true,
                freeStyleCropEnabled:true,
            })
            .then((images)=>{
                onFileSelected(images);
            })
            .catch((error)=>{
                console.log('pickerError', error);
            })

        }},
        {name:'Select from Gallery', icon:<Icon color='grey' size={17} name='image' />,
        onPress:()=>{
            ImagePickerCropper.openPicker({
                width:300,
                height:300,
                cropping:true,
                freeStyleCropEnabled:true,
            })
            .then((images)=>{
                onFileSelected(images);
            })
            .catch((error)=>{
                console.log('pickerError', error);
            })
        },},
    ]
    return (
        <RBSheet
        ref={ref}
        height={150}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: {
           borderTopLeftRadius:20,
           borderTopRightRadius:20,
        
          }
        }}
      >
         <View style={styles.wrapper}>
       {options.map(({name, onPress, icon})=>(
           <TouchableOpacity key={name} onPress={onPress} style={styles.pickerOption}>
               {icon}
               <Text style={styles.imageText} >{name}</Text>
           </TouchableOpacity>
           
       ))}
       </View>
      </RBSheet>
    )

});

export default ImagePicker;
