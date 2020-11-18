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
            reportes: ['11/10/20','12/10/20','13/10/20','14/10/20','14/10/20','14/10/20','14/10/20','14/10/20','14/10/20'],
            loading: false,
            tipoUsuario: ''
        }
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        this.setState({tipoUsuario})
    }
    

    downloadReport = async (fecha,idUsuario) => {
        //fetch();
        //try{
            //alert("Holi");
            //const resp = await fetch('http://10.0.2.2:80/api/public/api/habitacion/');
            //const habitacion = await resp.json();
            //this.setState({habitaciones: habitacion.habitaciones , loading:false, refreshing:false});
        //}catch(e){
          //  console.log('Error: '+e);
        //}
    }
    renderItem(data){
        var color = "white";
        if(data.index%2==0){
            color= "#A2AFA2"
        }
        //alert(JSON.stringify(data));

        return <TouchableOpacity style={{flex:1,}}>
            <View style={{flexDirection:'row', width:"100%", padding:35, backgroundColor:color,}}>
                {
                    ((data.index+1)%2==0?
                    <Text></Text>
                    :<Text></Text>
                        )
                }
                <Text style={{}}>{data.item}</Text>        
                <View style={{}}>
                    <Ionicons name="md-download" size={25} color={'#000'} />
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
                    tipoUsuario === "Admin"?  <Button title="Generar reporte" color="#095813" onPress={()=> { console.log("generar reporte")}} />:
                     <Button title="Solicitar reporte" color="#095813" onPress={()=> { console.log(this.state.tipoUsuario)}} />
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
