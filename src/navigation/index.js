import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';


const AuthLoading = props => {

  return (
    <NavigationContainer>
  <BottomNavigation></BottomNavigation>
    </NavigationContainer>
  );
};

export default AuthLoading;
