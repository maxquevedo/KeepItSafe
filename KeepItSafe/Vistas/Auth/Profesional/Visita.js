//import liraries
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator,FlatList,TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitaCheckForm from '../Forms/VisitaCheckForm';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';
// create a component
class Visita extends Component {
    constructor(props){
        super(props);
        this.state = {
            n: 3,
            aprobado: false,
            loading: true,
            checks: [],
            nombresChecks: [],
            estadoChecks: [],
            failedChecks: []
        }
    }

    async componentDidMount(){
        let id = await AsyncStorage.getItem('id2');
        let id_cli = '';
        let resp = await fetch(`http://10.0.2.2:8080/profesionales/${id}`);
        let respJson = await resp.json();
        let nombres = [];
        let estados = [];
        id_cli = respJson[5];
        resp = await fetch(`http://10.0.2.2:8080/checks/${id}/${id_cli}`);
        respJson = await resp.json();
        //console.log(respJson[0])
        for(var i =0 ; i<respJson.length ; i++){
            nombres.push(respJson[i][1]);
            estados.push(respJson[i][4]);
        }
        this.setState({nombresChecks:nombres,estadoChecks:estados,loading:false,checks:respJson})
    }

    async _checkFailed(data)  {
        var item = data.item;
        var estadoChecks = this.state.estadoChecks;
        estadoChecks[data.index] = 1;
        let jeison = {
            id:item[0]
        }
        let resp = await fetch(`http://10.0.2.2:8080/checkFail`,{
            method: "PATCH",
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({jeison})
        });
        let respJson = await resp.json();
        this.setState({estadoChecks})
    }

    async _checkSuecceded(data) {
        var item = data.item;
        var estadoChecks = this.state.estadoChecks;
        estadoChecks[data.index] = 0;
        let jeison = {
            id:item[0]
        }
        let resp = await fetch(`http://10.0.2.2:8080/checkSuccess`,{
            method: "PATCH",
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({jeison})
        });
        this.setState({estadoChecks})
    }

    renderItem = (data) => {
        var estado = this.state.estadoChecks[data.index];
        var color1 = "black";
        var color2 = "black";
        var itemToUpdate = data.item;

        if(estado == "1" ){
            color1 = "red";
            color2 = "black";
        }else{
            color1 = "black";
            color2 = "green";
        }

       return(<View  style={{justifyContent:'space-around',padding:30}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{fontSize:25}}>{((data.index)+1)+" - " +data.item[1]} </Text>
                            <TouchableOpacity onPress={()=> this._checkFailed(data)}>
                                <Ionicons name="md-close-circle" size={25} color={color1}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this._checkSuecceded(data)}>
                                <Ionicons name="md-checkmark-circle" size={25} color={ color2} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                    </View>);
    }
    
    async _generarInforme(){
        const { estadoChecks,nombresChecks } = this.state;
        var template =`\n Visita finalizada.\n `;
        for(var i=0;i<estadoChecks.length;i++){
            if(estadoChecks[i] == 0){
                template += `\n ${nombresChecks[i]}: Aprobado `;    
            }else{
                template += `\n ${nombresChecks[i]}: Fallado `;
            }
        }
        Alert.alert("Informe",template,[{text:'Ok'}]);
    }


    render() {
        const { checks,nombresChecks,estadoChecks,loading } = this.state;

        return (
            <View style={{flex:1}}>
                <View style={styles.orderScreen}>
                    <View style={{justifyContent:'space-around'}}>
                        <View><Text></Text></View>
                        <View><Text></Text></View>
                        {
                            loading? <ActivityIndicator size="large" color="#095813"/>:
                            <FlatList data={checks} extraData={estadoChecks} renderItem={this.renderItem} keyExtractor={(item,index) => index.toString()}/>
                        }
                        
                        <View>
                            <View>
                                <View><Text></Text><Text></Text></View>
                                <Button color="#095813" onPress={ ()=> this._generarInforme() } title="generar informe"/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

//make this component available to the app
export default Visita;
