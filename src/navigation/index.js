import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Scanner from '../screens/Scanner';
import OrderPlace from '../screens/OrderPlace';
import OrderList from '../screens/OrderList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AuthLoading = props => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Scanner" component={Scanner} options={{ title: 'Scan Order' }} />
        {/* <Stack.Screen name="Order Place" component={OrderPlace} /> */}
        <Stack.Screen name="OrderList" component={OrderList} options={{ title: 'Orders' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthLoading;
