import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScannerComponent from '../../Components/ScannerComponent'
import { CustomHeader } from '../../navigation/CustomHeader';
import Database from '../../Database';
import CustomButton from '../../Components/CustomButton';

const Scanner = () => {

    const { navigate } = useNavigation();
    const [scan, setScan] = useState(false);
    const [ScanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);
    const db = new Database();

    // useEffect(() => {
    //     db.initDB();
    // }, []);

    const onSuccess = (response) => {
        const check = response.data.substring(0, 4);
        setResult(response);
        setScan(false);
        setScanResult(true);

        if (check === 'http') {
            Linking.openURL(response.data).catch(err => console.error('An error occured', err));
            setScanResult(false);

        } else {
            setResult(response);
            setScan(false);
            //  setScanResult(true);
            navigate("Order Place", { response });
            setScanResult(false);
        }
    }

    const activeQR = () => {
        setScan(true);
    }

    useEffect(() => { }, [result]);
    
    const viewOrderList=()=>{
        navigate('OderList');
    }

    return (
        <>
            <CustomHeader title="Place Order" />
            <SafeAreaView style={{ minHeight: '100%', backgroundColor: 'white' }}>
                <View style={{ marginTop: '40%' }}>
                    <ScannerComponent
                        ScanResult={ScanResult}
                        scan={scan}
                        activeQR={activeQR}
                        onSuccess={onSuccess}
                    />
                </View>
                <View style={{marginHorizontal:20,marginTop:'50%'}}>
                <CustomButton title="View Order list" primary onPress={viewOrderList} />
                </View>
            </SafeAreaView>
        </>
    );
};

export default Scanner;

