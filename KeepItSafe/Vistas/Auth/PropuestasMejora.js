//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ActivityIndicator,FlatList,Alert } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons'; 
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class PropuestasMejora extends Component {
    constructor(props){
        super(props);
        this.state = {
            listaProp: [],
            tipoUsuario:'',
            loading:true,
            estados:[],
            respuestas:[],
            refresh: false,
            isDialogVisible: false,
            propuestaMensaje: '',
            propuestaMensajeArr: []
        }
    }

    async componentDidMount(){
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        let id = await AsyncStorage.getItem("id2");
        let resp = await fetch(`http://10.0.2.2:8080/checks/${id}/${tipoUsuario}`);
        let respJson = await resp.json();
        var lista = [];

        for(var i=0;i<respJson.length;i++){
            lista.push(respJson[i]);
        }

        resp = await fetch(`http://10.0.2.2:8080/propuestas/${id}/${tipoUsuario}`);
        respJson = await resp.json();
        let respuestas = [];
        var mejoras = respJson;
        this.setState({tipoUsuario:tipoUsuario,listaProp: lista,estados:mejoras,respuestas:respuestas,loading:false,refresh:false})
    }

    async getData(){
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        let id = await AsyncStorage.getItem("id2");
        let resp = await fetch(`http://10.0.2.2:8080/checks/${id}/${tipoUsuario}`);
        let respJson = await resp.json();
        var lista = [];
        for(var i=0;i<respJson.length;i++){
            lista.push(respJson[i]);
        }
        resp = await fetch(`http://10.0.2.2:8080/propuestas/${id}/${tipoUsuario}`);
        respJson = await resp.json();
        let respuestas = [];
        var mejoras = respJson;
        this.setState({listaProp: lista,estados:mejoras,respuestas:respuestas,loading:false,refresh:false})
    }

    async aprobarProp(data){
        const { listaProp, estados, respuestas } = this.state;
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        //console.log("Data: ",data);
        if(tipoUsuario == "Cliente"){
            return;
        }else{
            let jeison = {
                id: data[0]
            }
            let json = JSON.stringify({jeison:jeison});
           //console.log("JEISON: ",json)
            let resp = await fetch('http://10.0.2.2:8080/aprobarMejoras',{
                method:'PATCH',
                headers: {
                    'Content-Type':'application/json; charset="UTF-8"'
                },
                body:json
            });
            this.getData();
            //let respJson = await resp.json();
            //console.log(respJson);
        }
    }

    async reprobarProp(data){
        const { listaProp, estados,respuestas } = this.state;
        let tipoUsuario = await AsyncStorage.getItem("tipoUsuario");
        //console.log(tipoUsuario);
        if(tipoUsuario == "Cliente"){
            return;
        }else{
            let jeison = {
                id: data[0]
            }
            let json = JSON.stringify({jeison:jeison});
            console.log("JEISON: ",json)
            let resp = await fetch('http://10.0.2.2:8080/rechazarMejora',{
                method:'PATCH',
                headers: {
                    'Content-Type':'application/json; charset="UTF-8"'
                },
                body:json
            });
            this.getData();
        }
    }
    
    enviarRespuesta(data){
        let propuestaMensajeArr = [];
        let isDialogVisible = true;
        let propuestaMensaje = '';
        propuestaMensajeArr.push(data[0])
        if(data[3] != null){
            propuestaMensaje = data[3];
        }
        this.setState({propuestaMensajeArr,isDialogVisible,propuestaMensaje})
    }

    leerRespuesta(datos){
        let data = datos[3];
        //console.log("Respuesta: ",datos,'\nData: ',data);
        if(data == null){
            Alert.alert("Respuesta","Aún no existe respuesta",[{text:'Ok'}]);
        }else{
            Alert.alert("Respuesta",data,[{text:'Ok'}]);
        }
    }

    async sendInput(inputText){
        const { propuestaMensaje,propuestaMensajeArr } = this.state;
        let jeison = {
            id: propuestaMensajeArr[0],
            propuestaMensaje: inputText
        }
        let json = JSON.stringify({jeison:jeison});
        let resp = await fetch('http://10.0.2.2:8080/enviarPropuesta',{
            method:'PATCH',
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body:json
        });
        this.setState({isDialogVisible:false});
        this.getData();
    }

    renderItem(data){
        const { listaProp,estados,respuestas,tipoUsuario} = this.state;
        
        let color = "white";
        let colorOjo = "black";
        let colorApr = "black";
        let colorRepro = "black";
        let sended = "black";
        let index = data.index;
        let state = data.item[1];
        if(state == "abierta"){
            colorApr = "black";
            colorRepro = "black";
        }else if(state == "aprobada"){
            colorApr = "green";
            colorRepro = "black";
        }else if(state == "rechazada"){
            colorApr = "black";
            colorRepro = "red";
        }
        else {
            colorRepro = "black";
            colorApr = "black";
        }
        if(estados[data.index][3] != null ){
            colorOjo = "green";
            sended = "green";
        }else{
            sended = "black";
        }

        if(data.index %2 ==0){
            color= "#A2AFA2";
        }
        return(
        <View style={{backgroundColor:color,flexDirection:'row',paddingTop:75,paddingLeft:10}}>
            <TouchableOpacity  onPress={()=> {this.leerRespuesta(estados[data.index])}}>
                <Ionicons name="md-eye" size={25} color={colorOjo} />
            </TouchableOpacity>

            <Text>     </Text>

            <Text style={styles.text}>{ data.item[2] }</Text>

            <Text>   </Text>

            <TouchableOpacity onPress={()=> this.aprobarProp(estados[data.index])}>
                <Ionicons name="md-checkmark-circle-outline" size={25} color={colorApr} />
            </TouchableOpacity>
            
            <Text>    </Text>

            <TouchableOpacity  onPress={() => this.reprobarProp(estados[data.index])}>
                <Ionicons name="md-close-circle-outline" size={25} color={colorRepro} />
            </TouchableOpacity>
            {
                tipoUsuario == 'Cliente'? <Text>    </Text>:<Text></Text>
            }
            {
                tipoUsuario =='Cliente'? <TouchableOpacity  onPress={() => this.enviarRespuesta(estados[data.index])}>
                <Ionicons name="md-text" size={25} color={sended} />
            </TouchableOpacity>:<Text></Text>
            }
        </View>);
    }

    render() {
        const { listaProp,loading,refresh,propuestaMensaje,tipoUsuario,estados } = this.state;
        let titulo = 'Enviar propuesta de mejora\n\n\n\t\t\t\t\tPropuesta anterior';

        if(propuestaMensaje == ""){
            titulo = "Enviar propuesta de mejora"
        }
        
        return (
            <View style={{flex:1,justifyContent:'space-around'}}>
                     {
                    loading? 
                    <ActivityIndicator size="large" color="#095813"/>:
                        <FlatList data={estados} renderItem={this.renderItem.bind(this)} refreshing={refresh} onRefresh={()=> this.getData()} keyExtractor={ (item,index) => index.toString() } />
                }

                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={titulo}
                    message={propuestaMensaje}
                    hintInput ={"Escribe aquí..."}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.setState({isDialogVisible:false})}}>
                </DialogInput>

                <Text style={styles.text}><Ionicons name="md-checkmark-circle-outline" size={25} color="green" /> = Aprobada</Text>
                <Text style={styles.text}><Ionicons name="md-close-circle-outline" size={25} color="red" /> = Rechazada</Text>
                <Text style={styles.text}><Ionicons name="md-eye" size={25} color="green" /> = posee respuesta del cliente</Text>
                <Text style={styles.text}><Ionicons name="md-eye" size={25} color="black" /> = no posee respuesta del cliente</Text>
                <Text style={styles.text}>Tocar <Ionicons name="md-eye" size={25} color="green" /> para leer respuesta</Text>
                {
                    tipoUsuario == "Cliente" ? <Text style={styles.text}>Tocar <Ionicons name="md-text" size={25} color="black"/> para enviar respuesta</Text>:<Text></Text>
                }
                
            </View>
        );
    }
}

//make this component available to the app
export default PropuestasMejora;
