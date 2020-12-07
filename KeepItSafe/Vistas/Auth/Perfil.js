//import liraries
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from '../styles';
import EditarPerfilForm from '../Forms/EditarPerfilForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class Perfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            correo: 'hr@falabella.com',
            nombre:'Falabella S.A',
            tipoUsuario:'',
            tipoAsociado:'',
            asociado:'',
            editar:false,
            loading: true,
        }
    }

    toggleEditar = async (editar) => {
        let corre = await AsyncStorage.getItem('email');

        this.setState({editar:!editar,correo:corre});
    }

    componentDidMount = async() => {
        let usuario = await AsyncStorage.getItem('username');
        let correo = await AsyncStorage.getItem('email');
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let id2 = await AsyncStorage.getItem('id2');
        let asociado;
        let tipoAsociado;
        if(tipoUsuario =="Cliente"){
            tipoAsociado = "Profesional a cargo";
            let resp = await fetch(`http://10.0.2.2:8080/clientes/${id2}`);
            let respJson = await resp.json();
            let id_pro = respJson[5];
            resp = await fetch(`http://10.0.2.2:8080/profesionales/${id_pro}`);
            respJson = await resp.json();
            asociado = respJson[2]+' '+respJson[3];
        }else{
            tipoAsociado = "Cliente ";
            let resp = await fetch(`http://10.0.2.2:8080/profesionales/${id2}`);
            let respJson = await resp.json();
            let id_cli = respJson[5];
            resp = await fetch(`http://10.0.2.2:8080/usuarios_clientes/${id_cli}`);
            respJson = await resp.json();
            asociado = respJson[3];
        }

        this.setState({correo:correo,nombre:usuario,loading:false,tipoUsuario,asociado,tipoAsociado})
    }

    render() {
        const { usuario,correo,nombre,editar,loading,asociado,tipoAsociado } = this.state;
        const { navigation } = this.props;
        
        return (
            <View style={{alignContent:'center', justifyContent:'center',flex:1}}>

            { loading? <ActivityIndicator animating={true} color="#095813" size="large"/>:
            <View style={styles.orderScreen}>
                <View><Text></Text></View>
                <View><Text></Text></View>
                    <View style={{ justifyContent:'center', alignSelf:'stretch', alignItems:'center'}}>
                        <Text style={styles.titulo}>{nombre}</Text>
                            <View><Text></Text></View>
                        <Button color={'#095813'}  title="Cerrar Sesion" onPress={async() => {
                            await AsyncStorage.removeItem('id');
                            await AsyncStorage.removeItem('email');
                            await AsyncStorage.removeItem('name');
                            await AsyncStorage.removeItem('tipoUsuario');
                            await AsyncStorage.removeItem('username');
                            await AsyncStorage.removeItem('id2');
                            this.props.navigation.reset({
                                index:0,
                                routes: [{
                                    name: 'Login'
                                }]
                            })
                            }}/>
                            <View><Text></Text></View>
                            <View><Text></Text></View>
                            <View><Text></Text></View>
                            <View><Text style={{fontSize:35}}>{tipoAsociado}</Text><Text></Text><Text style={styles.centerText}>{asociado}</Text></View>
                            <View style={styles.FieldSeparator}><Text></Text></View>
                            <View><Text></Text></View>
                            <View><Text></Text></View>
                            <View><Text></Text></View>
                        <Button color={'#095813'} title="Editar correo" onPress={() => this.toggleEditar(editar)}/>                                
                </View>
                <View><Text></Text></View>
                <EditarPerfilForm editar={editar} correo={correo} navigation={navigation} />
            </View>
            }
            </View>
        );
    }
}

export default Perfil;
