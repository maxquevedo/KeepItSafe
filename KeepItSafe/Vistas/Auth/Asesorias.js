//import liraries
import React, { Component } from 'react';
import { View, Text, Alert ,Button, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles'; 
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class Asesorias extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDatePicker: false,
            fecha: new Date(),
            tipoUsuario:'Profesional',
        }
    }

    async componentDidMount(){
        //this.getUsuarios();
        AsyncStorage.getItem("tipoUsuario").then(dato => this.setState({tipoUsuario:dato}));
        //console.log(this.state.tipoUsuario);
    }

    updateDate = (event,date) =>{
        console.log("DATE: "+date.toLocaleDateString());
        let año = ''+date.getFullYear();
        let formatedDate = date.getDate()+'/'+((date.getMonth())+1)+'/'+año.substr(0,2);
        //console.log(formatedDate);
        let showDatePicker = this.state.showDatePicker;
        this.setState({fecha:date,showDatePicker:!showDatePicker});
        //console.log("Cambiando fecha")
    }

    formAsesoria = () => {
        return

    }

    render() {
        const { fecha,showDatePicker,tipoUsuario } = this.state;
        const { navigation } = this.props;
        //console.log((usuarios[0]+"{''}"));
        return (
            <View style={{flex:1}}>
                <View style={{flex:0.2}}></View>
                <View style={{flex:0.5, justifyContent:'space-around'}}>
                    <Button color="#095813" title="canal de comunicacion" onPress={()=>{
                        navigation.navigate('Canal');
                    }}/>
                    <Button color="#095813" title="capacitacion" onPress={()=>{
                        navigation.navigate('Capacitacion');
                    }}/>
                    <Button color="#095813" title="propuestas de mejora" onPress={()=>{
                        navigation.navigate('Propuestas');
                    }}/>
                </View>
                <View style={{flex:0.2}}></View>
            </View>
        );
    }
}

// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
// });
//               <Text></Text>
//<Text></Text>
//<Text></Text>
//<Text></Text>

//make this component available to the app
export default Asesorias;
