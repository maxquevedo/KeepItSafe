//import liraries
import styles from '../styles';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ActivityIndicator,Button,FlatList, TouchableOpacity } from 'react-native';

// create a component
class CanalComu extends Component {
    constructor(props){
        super(props);
        this.state = {
            canales: [],
            mensajes: [],
            loading: true
        }
    }

    async componentDidMount(){
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario');
        let id = await AsyncStorage.getItem('id2');
        let resp = await fetch(`http://10.0.2.2:8080/chats/${id}/${tipoUsu}`);
        let respJson = await resp.json();
        this.setState({canales:respJson,loading:false})
        let whipeCanals = ['Canal_id','Canal_id_cliente','Canal_id_pro','Canal_id_pro','Canal_id_acc','Canal_cabecera'];
        await AsyncStorage.multiRemove(whipeCanals);
    }

    async watchChat(canal){
        const { navigation } = this.props;
        await AsyncStorage.setItem('Canal_id',(canal.item[0]).toString());
        await AsyncStorage.setItem('Canal_id_cliente',(canal.item[1]).toString());
        await AsyncStorage.setItem('Canal_id_pro',(canal.item[2]).toString());
        await AsyncStorage.setItem('Canal_id_acc',(canal.item[3]).toString());
        await AsyncStorage.setItem('Canal_cabecera',(canal.item[7]).toString());
        navigation.navigate('Chat');
    }

    renderItem = (data) => {
        let  color ="white";
        let hora = (new Date(data.item[5])).toLocaleTimeString();
        let fecha = (new Date(data.item[5])).toLocaleDateString();
        if(data.index%2==0){
            color="#A2AFA2"
        }
       // console.log(data);
        return(
            <TouchableOpacity style={{ backgroundColor:color, flexDirection:'row',padding:5}} onPress={()=>this.watchChat(data)}>
                    <View style={{marginLeft:'2%'}}>
                        <Text style={styles.titleForm}>{data.item[7]}</Text>
                    </View>
                    <View style={{marginLeft:'20%'}}>
                        <View>
                            <Text style={styles.text}>{ fecha }</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>{ hora }</Text>
                        </View>
                    </View>
            </TouchableOpacity>
            
        );
    }

    render() {
        const { mensajes,canales,loading } = this.state;
        return (
            <View>
                {
                    loading? <ActivityIndicator size="large" color="#095813"/>:<FlatList data={canales} renderItem={this.renderItem} keyExtractor={(item,index)=> index.toString() }/>
                }
                
            </View>
        );
    }
}

//make this component available to the app
export default CanalComu;
