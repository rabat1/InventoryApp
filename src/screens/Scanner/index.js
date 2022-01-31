import { useNavigation } from '@react-navigation/native';
import React, { Component, Fragment, useEffect, useState } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';



const Scanner = () => {

    const { navigate } = useNavigation();

    const [scan, setScan] = useState(false);
    const [ScanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);
    const callScreen = () => {

    }

    onSuccess = (response) => {
        const check = response.data.substring(0, 4);
        console.log('scanned data' + check);

        setResult(response);
        setScan(false);
        setScanResult(true);

        if (check === 'http') {
            Linking.openURL(response.data).catch(err => console.error('An error occured', err));
        } else {
            setResult(response);
            setScan(false);
            setScanResult(true);
            navigate("Order Place", { response });

        }
    }


    activeQR = () => {
        setScan(true)
    }


    scanAgain = () => {
        setScan(true);
        setScanResult(false);

    }
    useEffect(() => {

    }, [result])

    return (
        <View style={styles.container}>
            <Text style={styles.textHead}>Scan QR Code</Text>
            {!scan && !ScanResult &&
                <View style={styles.cardView} >
                    <Text style={{ color: 'black' }}>Scan the item to place order</Text>
                    <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
                        <View style={styles.buttonWrapper}>
                            <Image source={require("../../assets/images/qrCode.jpg")} style={{ height: 36, width: 36 }}></Image>
                            <Text style={{ color: '#2196f3',marginLeft:10 }}>Press to Scan QR Code</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            {ScanResult &&
                <Fragment>
                    <View style={ScanResult ? styles.scanCardView : styles.cardView}>

                        <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                            <View style={styles.buttonWrapper}>
                                <Image
                                    source={require("../../assets/images/qrCode.jpg")} style={{ height: 36, width: 36 }}></Image>
                                <Text style={{ marginLeft: '5%', color: '#258ce3' }}>Click to scan again</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            }
            {scan &&
                <QRCodeScanner
                    reactivate={true}
                    showMarker={true}
                    ref={(node) => { scanner = node }}
                    onRead={onSuccess}
                    topContent={
                        <Text style={{ color: 'white', flex: 1, marginTop: '4%', textAlign: 'center' }}>
                            Please move your camera {"\n"} over the QR Code
                        </Text>
                    }
                    bottomContent={
                        <View>
                            <TouchableOpacity style={{ alignSelf: 'center', width: 100, height: 100 }}
                                onPress={() => scanner.reactivate()}
                                onLongPress={() => setScan(false)}>
                                <Image style={{ width: '100%', height: '50%' }}
                                    source={{ uri: 'https://media.istockphoto.com/photos/wideangle-lens-on-a-camera-picture-id152128250?b=1&k=20&m=152128250&s=170667a&w=0&h=_iiQ1kORC9A7XL8Hdde7X4BxCGfVJJOFclWg83rHXTc=' }}></Image>
                            </TouchableOpacity>

                        </View>
                    }
                />
            }
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                <Text style={styles.textHead}>Exit App</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Scanner;

