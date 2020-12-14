//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ActivityIndicator,FlatList,Alert } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
class PropuestasMejora extends Component {
    constructor(props){
        super(props);
        this.state = {
            propuestas:['Cambiar el extintor','Poner avisos en escaleras','Marcar zona segura'],
            listaProp: [],
            tipoUsuario:'',
            loading:true,
            estados:[],
            respuestas:[],
            refresh: false

        }
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        let id = await AsyncStorage.getItem("id2");
        let resp = await fetch(`http://10.0.2.2:8080/checks/${id}/${tipoUsuario}`);
        let respJson = await resp.json();
        var lista = [];

        for(var i=0;i<respJson.length;i++){
            if(respJson[i][4] == 1){
                lista.push(respJson[i][1]);
            }
        }

        resp = await fetch(`http://10.0.2.2:8080/propuestas/${id}/${tipoUsuario}`);
        respJson = await resp.json();
        let estados = [];
        let respuestas = [];
        for(var i=0;i<respJson.length;i++){
            for(var j=0;j<lista.length;j++){
                if(respJson[i][2] == lista[j]){
                    estados.push(respJson[i][1]);
                    console.log("Respuesta a agregar:",respJson[i][3]);
                    if(respJson[i][3] == null){
                        respuestas.push('');
                    }else{
                        
                        respuestas.push(respJson[i][3]);
                    }
                }
            }    
        }
        
        this.setState({listaProp: lista,estados:estados,respuestas:respuestas,loading:false,refresh:false})
    }

    async getData(){
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        let id = await AsyncStorage.getItem("id2");
        let resp = await fetch(`http://10.0.2.2:8080/checks/${id}/${tipoUsuario}`);
        let respJson = await resp.json();
        var lista = [];

        for(var i=0;i<respJson.length;i++){
            if(respJson[i][4] == 1){
                lista.push(respJson[i][1]);
            }
        }

        resp = await fetch(`http://10.0.2.2:8080/propuestas/${id}/${tipoUsuario}`);
        respJson = await resp.json();
        let estados = [];
        let respuestas = [];
        for(var i=0;i<respJson.length;i++){
            for(var j=0;j<lista.length;j++){
                if(respJson[i][2] == lista[j]){
                    estados.push(respJson[i][1]);

                    if(respJson[i][3] == null){
                        respuestas.push('');
                    }else{
                        respuestas.push(respJson[i][3]);
                    }
                }
            }    
        }
        this.setState({listaProp: lista,estados:estados,respuestas:respuestas,loading:false,refresh:false})
    }

    async aprobarProp(data){
        console.log(data);
    }

    async reprobarProp(data){
        console.log(data);
    }

    leerRespuesta(data){
        if(data == ""){
            Alert.alert("Respuesta","Aún no existe respuesta",[{text:'Ok'}]);
        }else{
            Alert.alert("Respuesta",data,[{text:'Ok'}]);
        }
    }

    renderItem(data){
        const { listaProp,estados,respuestas} = this.state;

        let color = "white";
        let colorOjo = "black";
        let colorApr = "black";
        let colorRepro = "black";
        let index = data.index;

        if(respuestas[index] != ""){
            colorOjo = "green";
        }
        //console.log(estados[index],listaProp[index] );
        if(estados[index] == "abierta"){
            
        }else if(estados[index] == "aprobada"){
            colorApr = "green";
            colorRepro = "black";
        }else {
            colorRepro = "red";
            colorApr = "black";
        }

        if(data.index %2 ==0){
            color= "#A2AFA2";
        }

        return(
        <View style={{backgroundColor:color,flexDirection:'row',paddingTop:75,paddingLeft:10}}>
            <TouchableOpacity  onPress={()=> {this.leerRespuesta(respuestas[index])}}>
                <Ionicons name="md-eye" size={25} color={colorOjo} />
            </TouchableOpacity>

            <Text>     </Text>

            <Text style={styles.text}>{ data.item }</Text>

            <Text>   </Text>

            <TouchableOpacity onPress={()=> {}}>
                <Ionicons name="md-checkmark-circle-outline" size={25} color={colorApr} />
            </TouchableOpacity>
            
            <Text>    </Text>

            <TouchableOpacity  onPress={()=> {}}>
                <Ionicons name="md-close-circle-outline" size={25} color={colorRepro} />
            </TouchableOpacity>
        </View>);
    }

    render() {
        const { listaProp,loading,refresh } = this.state;
        return (
            <View style={{flex:1,justifyContent:'space-around'}}>
                     {
                    loading? 
                    <ActivityIndicator size="large" color="#095813"/>:
                        <FlatList data={listaProp} renderItem={this.renderItem.bind(this)} refreshing={refresh} onRefresh={()=> this.getData()} keyExtractor={ (item,index) => index.toString() } />
                }
                
                <Text style={styles.text}><Ionicons name="md-checkmark-circle-outline" size={25} color="green" /> = Aprobada</Text>
                <Text style={styles.text}><Ionicons name="md-close-circle-outline" size={25} color="red" /> = Rechazada</Text>
                <Text style={styles.text}><Ionicons name="md-eye" size={25} color="green" /> = posee respuesta del cliente</Text>
                <Text style={styles.text}><Ionicons name="md-eye" size={25} color="black" /> = no posee respuesta del cliente</Text>
                <Text style={styles.text}>Tocar <Ionicons name="md-eye" size={25} color="green" /> para leer respuesta</Text>
            </View>
        );
    }
}

//make this component available to the app
export default PropuestasMejora;
