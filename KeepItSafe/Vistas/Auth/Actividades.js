//import liraries
import React, { Component } from 'react';
import { View, Button ,ActivityIndicator } from 'react-native';
import styles from '../styles';
import ActividadesForm from './Forms/ActividadesForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class Actividades extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            id2:'',
            usuario:'',
            visitas: '',
            asesorias: '',
            capacitaciones: '',
            loading: true,
        }
    }
    getData = async () =>{
        this.setState({loading: !(this.state.loading)});
        let aidi = await AsyncStorage.getItem("id");
        let usuario = await AsyncStorage.getItem("tipoUsuario")
        let aidi2 = await AsyncStorage.getItem("id2");
        let resp = await fetch(`http://10.0.2.2:8080/actividades/${aidi}/${usuario}/${aidi2}`);
        let respJson = await resp.json();
        let asesorias = await respJson[0];
        let capacitaciones = await respJson[1];
        let visitas = await respJson[2];
        this.setState({asesorias,capacitaciones,visitas,loading: !(this.state.loading)});
    }

    async componentDidMount() {
        let aidi = await AsyncStorage.getItem("id");
        let usuario = await AsyncStorage.getItem("tipoUsuario")
        let aidi2 = await AsyncStorage.getItem("id2");
        let resp = await fetch(`http://10.0.2.2:8080/actividades/${aidi}/${usuario}/${aidi2}`);
        let respJson = await resp.json();
        let asesorias = await respJson[0];
        let capacitaciones = await respJson[1];
        let visitas = await respJson[2];
        this.setState({asesorias,capacitaciones,visitas,loading: !(this.state.loading)});
    }

   

    render() {
        const { visitas, asesorias, capacitaciones, loading } = this.state;
        console.log("Asesorias: ",asesorias[0],"Capacitaciones: ",capacitaciones[0], "Visitas: ",visitas[0], "Cargando: ",loading);
        return (
        <View style={styles.topBar}>
            {
                loading? <ActivityIndicator size="large" color="#095813" style={{alignSelf:"center",justifyContent:'center'}}/>:<View>
                
                    <ActividadesForm visitas={visitas[0]} asesorias={asesorias[0]} capacitaciones={capacitaciones[0]}/>
                    <Button title="Refrescar calendario" onPress={this.getData} color="#095813"/>
                    </View>
            }
        </View>
        );
    }
}

//make this component available to the app
export default Actividades;
