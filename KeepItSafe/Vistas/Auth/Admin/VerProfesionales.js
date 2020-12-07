//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Listar from '../Frag/Listar';

// create a component
class VerProfesionales extends Component {
    constructor(props){
        super(props)
        this.state = {
            profesionales: '',
        }
    }

    async componentDidMount(){
        let url = "http://10.0.2.2:8080/profesionales";
        let resp = await fetch(url);
        let respJson = await resp.json();

        this.setState({profesionales:respJson})
    }

    render() {
        const { profesionales } = this.state;
        return (
            <View style={styles.container}>
                <Listar datos={profesionales}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default VerProfesionales;
