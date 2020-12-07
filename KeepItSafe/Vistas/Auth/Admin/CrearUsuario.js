//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CrearUsuarioForm from '../Forms/CrearUsuarioForm';
import styles from '../../styles';
// create a component
class CrearUsuario extends Component {
    render() {
        const { navigation } = this.props;
        //console.log("Navigation desde la clase",navigation);
        return (
            <View style={styles.container}>
                <CrearUsuarioForm navigation ={ navigation }/>
            </View>
        );
    }
}

//make this component available to the app
export default CrearUsuario;
