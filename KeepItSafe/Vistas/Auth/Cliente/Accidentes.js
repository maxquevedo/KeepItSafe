//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button, ActivityIndicator,FlatList,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
class Accidentes extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            accidentes: [],
            isDialogVisible: false,
            detalleAccidente: '',
            idAccidenteSelec: ''
        }
    }

    async componentDidMount(){
        let cli_id = await AsyncStorage.getItem("id2")
        console.log(cli_id);
        let resp = await fetch(`http://10.0.2.2:8080/accidentes/${cli_id}`);
        let respJson = await resp.json();
        this.setState({accidentes: respJson, loading:false});
    }

    
    async sendInput(inputText){
        let idCli = await AsyncStorage.getItem("id2");
        let jeison = {
            id: this.state.idAccidenteSelec,
            nombreAccidente: this.state.detalleAccidente,
            descripcion: inputText,
            idCli: idCli
        }
        console.log("json: ",jeison);
        let json = JSON.stringify({jeison:jeison});
        let resp = await fetch('http://10.0.2.2:8080/reportarAccidente',{
            method:'POST',
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body:json
        });
        let respJson = await resp.json();
        console.log(respJson);
        this.setState({isDialogVisible:false});
    }

    prueba = async () => {
        
    }

    renderItem(data){
        var color = "white";
        var accidente_id = data.item[0];
        var nombre = data.item[1].charAt(0).toUpperCase() +  data.item[1].slice(1);
        if(data.index%2==0){
            color= "#A2AFA2"
        }
        return <View style={{flexDirection:'row'}} key={data.key}>
            <View style={{flexDirection:'column', width:"100%", padding:35, backgroundColor:color,}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=> this.setState({idAccidenteSelec:accidente_id,detalleAccidente:nombre ,isDialogVisible:true})}>
                        <Ionicons name="md-notifications-outline" size={25} color={'#000'} />
                    </TouchableOpacity>
                    <Text>     </Text>
                    <Text style={{fontSize:25}}>{ nombre }</Text>  
                </View>
            </View>
        </View>
    }


    render() {
        const { loading, accidentes,detalleAccidente } = this.state;

        return (
            <View style={{marginTop:35}}>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Descripción del accidente - "+detalleAccidente}
                    message={''}
                    hintInput ={"Escribe aquí..."}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.setState({isDialogVisible:false})}}>
                </DialogInput>
                {
                    loading? <View style={{justifyContent:'center',alignContent:'center'}}><ActivityIndicator size="large" color="#095813"/></View>: <FlatList data={accidentes} renderItem={this.renderItem.bind(this)} keyExtractor={ (index,item) => index.toString() } />
                }

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default Accidentes;
