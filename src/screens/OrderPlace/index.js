import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const index = () => {

    const { params: { response } = {} } = useRoute();
    console.log(response);
    const { navigate } = useNavigation();

    return (
        <View>

            <Text>Order Place</Text>
            <Text>{response.rawData}</Text>
            <Text>{response.type}</Text>
            <Text>{response.data}</Text>
            <View>
                <TouchableOpacity onPress={() => navigate("Scanner")}>
                    <Text>
                        Scan Again
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default index;
