//import liraries
import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator,TouchableOpacity,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            typ: '',
            mensajesCli:{},
            mensajesPro:{},
            mensajesTotales:{},
            loading: true
        }
    }

    async componentDidMount(){
        const {navigation} = this.props;
        let title = await AsyncStorage.getItem('Canal_cabecera');
        navigation.setOptions({ title });
        let idCli = await AsyncStorage.getItem('Canal_id_cliente');
        let idPro = await AsyncStorage.getItem('Canal_id_pro');
        let idAcc = await AsyncStorage.getItem('Canal_id_acc');
        let resp = await fetch(`http://10.0.2.2:8080/chat/${idCli}/${idPro}/${idAcc}/${title}`);
        let respJson = await resp.json();
        let cliente = [];
        let pro = [];
        for( var i =0;i<respJson.length ; i++){
            if(respJson[i][6] == 'cliente'){
                cliente.push(respJson[i]);
            }else{
                pro.push(respJson[i]);
            }
        }
        console.log("Pro dice: ",pro,"\nCli dice: ",cliente);
        this.setState({mensajesCli: cliente, mensajesPro: pro,mensajesTotales:respJson,loading:false})
    }

    renderItem = (data) => {
        let  color ="white";
        let hora = (new Date(data.item[5])).toLocaleTimeString();
        let fecha = (new Date(data.item[5])).toLocaleDateString();
        console.log("DATA: ",data)
        if(data.index%2==0){
            color="#A2AFA2"
        }
       // console.log(data);
        return(
            <View style={{ backgroundColor:color, flexDirection:'row',padding:5}}>
                <View>
                    <View>
                        <Text style={{fontSize:10}}>{fecha } - {  hora } </Text>
                    </View>
                    <Text style={{fontSize:25}}>{data.item[4]}</Text>
                </View>
            </View>
            
        );
    }

    render() {
        const { mensajesCli, mensajesPro, mensajesTotales, loading} = this.state;
        return (
            <View>
                 {
                    loading? <ActivityIndicator size="large" color="#095813"/>:<FlatList data={mensajesTotales} renderItem={this.renderItem} keyExtractor={(item,index)=> index.toString() }/>
                }
            </View>
        );
    }
}

//make this component available to the app
export default Chat;
