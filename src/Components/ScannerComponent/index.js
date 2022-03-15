import { useNavigation } from '@react-navigation/native';
import React, { Component, Fragment, useEffect, useState } from 'react';

import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler,ScrollView } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';



const index = (props) => {
    console.log('hhg',props.scan);
  return (
    <ScrollView>
    

    <Text style={styles.heading}>Scan QR Code</Text>
    {!props.scan && !props.ScanResult &&
        <View style={{padding:20}} >
            <TouchableOpacity onPress={props.activeQR} style={styles.center}>
            
                    <Image source={require("../../assets/images/qrCode.jpg")} style={{ height: 100, width: 100 }}></Image>
                    <Text style={styles.subHeading}>Press to Scan QR or Bar Code</Text>
    
            </TouchableOpacity>
        </View>
    }
    
    {props.scan &&
        <QRCodeScanner
            reactivate={true}
            showMarker={true}
          //  ref={(node) => { scanner = node }}
            onRead={props.onSuccess}
            topContent={
                <Text style={{ color: 'black', flex: 1, textAlign: 'center' }}>
                    Please move your camera {"\n"} over the QR Code
                </Text>
            }
         
        />
    }

</ScrollView>

  )
}

export default index;