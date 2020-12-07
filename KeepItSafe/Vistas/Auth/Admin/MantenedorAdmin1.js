//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native';
import styles from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const MantenedorAdmin1 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <Button title="Cerrar Sesion" color="#095813" onPress={async()=> {
                await AsyncStorage.removeItem('id');
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('name');
                await AsyncStorage.removeItem('tipoUsuario');
                await AsyncStorage.removeItem('username');
                await AsyncStorage.removeItem('id2');
                navigation.reset({
                    index:0,
                    routes: [{
                        name: 'Login'
                    }]
                })
            }}/>
            <View style={{flex:0.5,justifyContent: 'space-evenly',}}>
            <Button color={'#095813'} title="Crear usuario" onPress={ () => navigation.navigate("Agregar usuario") }/>
            <Text style={styles.textUnderlined}>Clientes</Text>
            <Button color={'#095813'} title="Ver clientes" onPress={() => navigation.navigate("Ver clientes")}/>
            </View>
            <View style={{flex:0.5,justifyContent: 'space-evenly',}}>
            <Text style={styles.textUnderlined}>Profesionales</Text>
            <Button color={'#095813'}  title="Ver profesionales" onPress={() => navigation.navigate("Ver profesionales")}/>
            </View>
        </View>
    );
};

//make this component available to the app
export default MantenedorAdmin1;
