//import liraries
import React, { Component } from 'react';
import { View, Text,Button, StyleSheet,TouchableOpacity,FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

// create a component
class VerReportes extends Component {
    constructor(props){
        super(props);
        this.state = {
            reportes: [],
            loading: false,
            tipoUsuario: ''
        }
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let id_usuario = await AsyncStorage.getItem('id');
        let resp = await fetch(`http://10.0.2.2:8080/reportes/${id_usuario}`);
        let respJson = await resp.json();
        this.setState({tipoUsuario,reportes: respJson});        
    }
    

    getDateReport = async () => {
        let id_usuario = await AsyncStorage.getItem('id');

        console.log(respJson);

    }

    renderItem(data){
        var color = "white";
        if(data.index%2==0){
            color= "#A2AFA2"
        }
        //alert(JSON.stringify(data));

        return <TouchableOpacity style={{flex:1,}}>
            <View style={{flexDirection:'row', width:"100%", padding:35, backgroundColor:color,}}>
                <Text style={{fontSize:25}}>               {data.item}              </Text>        
                <View style={{}}>
                    <Ionicons name="md-download" size={35} color={'#000'} />
                </View>
            <View>
            </View>
            </View>
        </TouchableOpacity>
    }

    render() {
        const { loading,tipoUsuario } = this.state;
        return (
            <View style={{flex:1, justifyContent:'space-around'}}>
                <View><Text></Text></View>
                <View><Text></Text></View>
                <View><Text></Text></View>
                <View><Text style={{fontSize:45,alignSelf:'center'}}>Reportes</Text></View>
                <View><Text></Text></View>
                <View><Text></Text></View>
                {
                    tipoUsuario === "Admin"?  <Button title="Generar reporte" color="#095813" onPress={()=>{}} />:
                     <Button title="Solicitar reporte" color="#095813" onPress={()=>{}} />
                }
               
                <View><Text></Text></View>
                <View><Text></Text></View>
                {
                    loading? 
                    <ActivityIndicator size="large" color="#095813"/>:
                        <FlatList data={this.state.reportes} renderItem={this.renderItem.bind(this)} keyExtractor={ item => item.id } />
                }
            </View>
        );
    }
}

//make this component available to the app
export default VerReportes;
