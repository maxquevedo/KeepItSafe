//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Listar from '../Frag/Listar';

// create a component
class VerClientes extends Component {
    constructor(props){
        super(props)
        this.state = {
            clientes: '',
        }
    }


    async componentDidMount(){
        let url = "http://10.0.2.2:8080/clientes";
        let resp = await fetch(url);
        let respJson = await resp.json();

        this.setState({clientes:respJson})
    }


    render() {
        const { clientes } = this.state;
        
        return (
            <View style={styles.container}>
                <Listar datos={clientes} campos={3}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
});

//make this component available to the app
export default VerClientes;
