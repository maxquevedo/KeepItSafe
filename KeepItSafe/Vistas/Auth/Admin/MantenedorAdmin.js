//import liraries

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import MantenedorAdmin1 from './MantenedorAdmin1';
import Login from '../Actividades';
import CrearUsuario from './CrearUsuario';
import VerClientes from './VerClientes';
import VerProfesionales from './VerProfesionales';

// create a component
class MantenedorAdmin extends Component {
    
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MantenedorAdmin1} options={{headerShown:false}} />
                <Stack.Screen name="Agregar usuario" component={CrearUsuario}/>
                <Stack.Screen name="Ver profesionales" component={VerProfesionales}/>
                <Stack.Screen name="Ver clientes" component={VerClientes}/>
                
            </Stack.Navigator>
        );
    }
}
const Stack = createStackNavigator();

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default MantenedorAdmin;
