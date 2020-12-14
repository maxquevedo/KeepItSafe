//import liraries
import React, { Component } from 'react';
import { View, Text,Button, Alert,TouchableOpacity,FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

// create a component
class VerReportes extends Component {
    constructor(props){
        super(props);
        this.state = {
            reportes: [],
            loading: true,
            tipoUsuario: '',
            fechaSelec: '',
        }
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        let id_usuario = await AsyncStorage.getItem('id2');
        //console.log(tipoUsuario);
        if(tipoUsuario == 'Admin'){
            let resp = await fetch(`http://10.0.2.2:8080/reportes`);
            var respJson = await resp.json();
            this.setState({reportes:respJson,loading:false,tipoUsuario:tipoUsuario});
        }else if(tipoUsuario == 'Cliente'){
            let resp = await fetch(`http://10.0.2.2:8080/reportesCli/${id_usuario}`);
            respJson = await resp.json();
            this.setState({reportes:respJson,loading:false,tipoUsuario:tipoUsuario});
        }else{
            let resp = await fetch(`http://10.0.2.2:8080/reportesPro/${id_usuario}`);
            respJson = await resp.json();
            this.setState({reportes:respJson,loading:false,tipoUsuario:tipoUsuario});
        }
    }

    async _getReportesGlobales(id,fecha) {
        let resp = await fetch(`http://10.0.2.2:8080/reportesG/${id}`);
        let respJson = await resp.json();
        ////console.log("RespJOTASON:",respJson[0]);
        let template = `
        \n  Visitas totales: ${respJson[0][2]}
        \n  Asesorias totales: ${respJson[0][3]}
        \n  Accidentes activos: ${respJson[0][4]}
        \n  Capacitaciones totales: ${respJson[0][5]}
        \n  Profesionales totales: ${respJson[0][6]}
        \n  Clientes totales: ${respJson[0][7]}
        `;
        Alert.alert("Informe "+fecha,template,[{text:'Ok'}]);

    }
    async _getReportesPro(fecha,data){
        var respJson = data;
        var fechaForm = new Date(respJson[6]);
        fechaForm = fechaForm.toLocaleDateString();
        var fechaFormat = ""+fechaForm[3]+fechaForm[4]+"/"+fechaForm[0]+fechaForm[1]+"/"+fechaForm[6]+fechaForm[7];
        let template = `
        \n  Visitas de este mes: ${respJson[3]}
        \n  Asesorias de este mes: ${respJson[4]}
        \n  Cliente a cargo: ${respJson[5]}
        \n  Fecha de ingres: ${fechaFormat}
        \n  Capacitaciones del mes: ${respJson[7]}
        `;
        Alert.alert("Informe "+fecha,template,[{text:'Ok'}]);

    }

    async _getReportesCli(fecha,data){
        var respJson = data;
        let template = `
        \n  Visitas de este mes: ${respJson[3]}
        \n  Asesorias de este mes: ${respJson[4]}
        \n  Accidentes activos: ${respJson[5]}
        \n  Profesional a cargo: ${respJson[6]}
        \n  Capacitaciones del mes: ${respJson[7]}
        `;
        Alert.alert("Informe "+fecha,template,[{text:'Ok'}]);
    }

    async _crearReporteGlobal(){
        let resp = await fetch(`http://10.0.2.2:8080/generateGlobalReport`);
        let respJson = await resp.json();
        Alert.alert("Exito","Se ha creado un reporte con exito",[{text:"Ok"}]);
        resp = await fetch(`http://10.0.2.2:8080/reportes`);
        respJson = await resp.json();
        this.setState({reportes:respJson});
 
    }

    renderItem(data){
        var color = "white";
        var displayedData;
        if(data.index%2==0){
            color= "#A2AFA2"
        }
        var aitem = data.item;
        var tipoUsu = this.state.tipoUsuario;
         if( tipoUsu === "Admin"){
            displayedData = data.item;
            displayedData = data.item[1];
            displayedData = new Date(data.item[1]);
            displayedData = displayedData.toLocaleDateString();
            displayedData = displayedData[3]+displayedData[4]+"/"+displayedData[0]+displayedData[1]+"/"+displayedData[6]+displayedData[7]
            
         }else{
            //console.log("render items: ",data);
            displayedData = data.item;
            displayedData = data.item[2];
            //console.log("render items: ",displayedData);
            displayedData = new Date(displayedData);
            displayedData = displayedData.toLocaleDateString();
            displayedData = displayedData[3]+displayedData[4]+"/"+displayedData[0]+displayedData[1]+"/"+displayedData[6]+displayedData[7]

        }
        var aidi = data.item[0]
        //alert(JSON.stringify(data));
        ////console.log(data.item);
        return <TouchableOpacity style={{flex:1,}} onPress={ () => { 
            if(this.state.tipoUsuario  == "Admin"){
                this._getReportesGlobales(aidi,displayedData)
            }else if(this.state.tipoUsuario == "Cliente"){
                this._getReportesCli(displayedData,aitem);
            }else{
                this._getReportesPro(displayedData,aitem);
            }
        }}>
            
            <View style={{flexDirection:'row', width:"100%", padding:35, backgroundColor:color,}}>
                <Text style={{fontSize:25}}>               {displayedData}              </Text>        
                <View style={{}}>
                    <Ionicons name="md-eye" size={35} color={'#000'} />
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
                    tipoUsuario === "Admin"?  <Button title="Generar reporte global" color="#095813" onPress={ ()=> this._crearReporteGlobal()} />:
                     <Button title="Solicitar reporte" color="#095813" onPress={()=>{
                         Alert.alert("","Solicitud de reporte enviada",[{text:"Ok"}]);
                     }} />
                }
               
                <View><Text></Text></View>
                <View><Text></Text></View>
                {
                    loading? 
                    <ActivityIndicator size="large" color="#095813"/>:
                        <FlatList data={this.state.reportes} extraData={this.state.reportes} renderItem={this.renderItem.bind(this)} keyExtractor={ (item,index) => index.toString() } />
                }
            </View>
        );
    }
}

//make this component available to the app
export default VerReportes;
