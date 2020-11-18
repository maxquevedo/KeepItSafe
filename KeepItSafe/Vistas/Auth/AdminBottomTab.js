//import liraries
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MantenedorAdmin from './Admin/MantenedorAdmin';

const config = Platform.select({
    web: { headerMode: 'screen'},
    default : {}
});

const stackMantenedor = createStackNavigator({
    Mantenedor: MantenedorAdmin
}, config)

stackMantenedor.navigationOptions = {
    tabBarLabel: 'Mantenedor',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-nutrition'}/>
    ),
}

stackMantenedor.path = '';
