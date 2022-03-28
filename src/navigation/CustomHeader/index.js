import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from '../../Utils/Icon';
import styles from './styles';
import Colors from '../../Utils/Colors';

export function CustomHeader(props) {
    const { setOptions, toggleDrawer, navigate, goBack } = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {props.backIcon ?
                    <TouchableOpacity onPress={() => goBack()} >
                        <Icon color={Colors.secondary} type='ant' name='back' size={25} style={{ padding: 10 }} />
                    </TouchableOpacity>
                    : null}
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>

            <View style={{ flex: 1 }}></View>

        </View>
    )
}
