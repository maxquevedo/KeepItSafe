//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { range } from 'lodash';
import styles from '../styles';
import DiasCalendario from './Frag/DiasCalendario';
import ActividadesForm from './Forms/ActividadesForm';

// create a component
class Actividades extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <View style={styles.topBar}>
            <ActividadesForm />
        </View>
        );
    }
}

//make this component available to the app
export default Actividades;
