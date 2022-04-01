import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../Utils/Icon';
import Colors from '../../Utils/Colors';
import { CustomerStack, InventoryStack, OrderScannerStack, SalesHistoryStack } from '../StackNavihation';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Scanner"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: { textAlign: 'center', fontSize: 11, marginBottom: 5 },
        tabBarIndicatorStyle: {
          borderBottomColor: 'red',
          borderBottomWidth: 2,
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
          paddingVertical: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

        },
        tabBarIcon: ({ focused, Color, size }) => {
          let iconName;
          if (route.name === 'PlaceOrder') {
            [iconName, Color, size] = focused ? ['qr-code-scanner', 'black', 25] : ['qr-code-scanner', Colors.grey, 22]
          }
          else if (route.name === 'Inventory') {
            [iconName, Color, size] = focused ? ['cases', 'black', 25] : ['cases', Colors.grey, 22]
          }

          else if (route.name === 'SalesHistory') {
            [iconName, Color, size] = focused ? ['date-range', 'black', 25] : ['date-range', Colors.grey, 22]
          }
          else if (route.name === 'Customer') {
            [iconName, Color, size] = focused ? ['how-to-reg', 'black', 25] : ['how-to-reg', Colors.grey, 22]
          }

          return <Icon color={Color} name={iconName} type='material' size={size} />;
        },
      })}
    >

      <Tab.Screen name="PlaceOrder" component={OrderScannerStack} />
      <Tab.Screen name="Inventory" component={InventoryStack} />
      <Tab.Screen name="SalesHistory" component={SalesHistoryStack} />
      <Tab.Screen name="Customer" component={CustomerStack} />

    </Tab.Navigator>
  );
}
