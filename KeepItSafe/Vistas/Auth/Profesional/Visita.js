//import liraries
import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator,FlatList,TouchableOpacity } from 'react-native';
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
        for(var i =0 ; i<respJson.length ; i++){
            nombres.push(respJson[i][0]);
            estados.push(respJson[i][1]);
        }
        this.setState({nombresChecks:nombres,estadoChecks:estados,loading:false,checks:respJson})
    }

    async _checkFailed(item)  {
        console.log(item);
        let jeison = {
            id:item[1]
        }
        let resp = await fetch(`http://10.0.2.2:8080/checkFail`,{
            method: "PATCH",
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({jeison})
        });
        let respJson = await resp.json();
        console.log(respJson);
        if(respJson == 1 ){
            console.log("Entó en el 1")
         for(var i =0;i<this.state.estadoChecks;i++){
            console.log("Entro en el for: ",this.state.estadoChecks[i])
            let subItem = this.state.estadoChecks[i][0];
            console.log(subItem);
         }   
        }
    }

    async _checkSuecceded(item) {
        console.log(item);
        let jeison = {
            id:item[1]
        }
        let resp = await fetch(`http://10.0.2.2:8080/checkSuccess`,{
            method: "PATCH",
            headers: {
                'Content-Type':'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({jeison})
        });
        let respJson = await resp.json();
        console.log(respJson);
        if(respJson == 1 ){
            console.log("Entó en el 1")
            for(var i =0;i<this.state.estadoChecks;i++){
                console.log("Entro en el for: ",this.state.estadoChecks[i])
                let subItem = this.state.estadoChecks[i][0];
                console.log(subItem);
             }  
        }
    }

    renderItem = (data) => {
        //console.log("DATA: ",data.item);
        var color = "black";
        let color1 = "black";
        let color2 = "black";

        let itemToUpdate = data.item;
        
        if(data.item[1] == 1){
            color1 = "red";
        }else if(data.item[1] == 0 ){
            color2 = "green";
        }
       return(<View  style={{justifyContent:'space-around',padding:30}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <Text style={{fontSize:25}}>{data.item[0]} </Text>
                            <TouchableOpacity onPress={()=> this._checkFailed(data.item)}>
                                <Ionicons name="md-close-circle" size={25} color={color1}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this._checkSuecceded(data.item)}>
                                <Ionicons name="md-checkmark-circle" size={25} color={ color2} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.FieldSeparator}></View>
                    </View>);
    }
    


    render() {
        const { checks,nombresChecks,estadoChecks,loading } = this.state;
        
        console.log(checks);
        return (
            <View style={{flex:1}}>
                <View style={styles.orderScreen}>
                    <View style={{justifyContent:'space-around'}}>
                        <View><Text></Text></View>
                        <View><Text></Text></View>
                        {
                            loading? <ActivityIndicator size="large" color="#095813"/>:
                            <FlatList data={checks} renderItem={this.renderItem} keyExtractor={item => item.index}/>
                        }
                        
                        <View>
                            <View>
                                <Button color="#095813" onPress={()=>{console.log(checks)}} title="capacitacion"/>
                                <View><Text></Text><Text></Text></View>
                                <Button color="#095813" onPress={(data)=>{this.forceUpdate();}} title="generar informe"/>
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
