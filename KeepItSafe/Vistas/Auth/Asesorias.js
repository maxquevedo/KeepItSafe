//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Button, TextInput, TouchableOpacity } from 'react-native';
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
            <View style={{flex:1,justifyContent:'space-evenly'}}>
                <View>
                    { tipoUsuario==="Profesional"? <View></View>:(
                        <View>
                            <View style={{flexDirection:'row', paddingHorizontal:145 }}>
                                <Text>{fecha.getDate()}/{fecha.getMonth()+1}/{fecha.getFullYear()}</Text>
                                <Text>                  </Text>
                                <TouchableOpacity onPress={()=>{
                                    let showDatePickerCurrent = this.state.showDatePicker;
                                    this.setState({showDatePicker:!showDatePickerCurrent})
                                    //this.forceUpdate()
                                }}>
                                    <Ionicons name="md-calendar" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            
                            { showDatePicker?
                                <DateTimePicker mode="date"
                                    onConfirm={()=>{console.log("confirma3")}}  onChange={(event,date)=> this.updateDate(event,date)} onCancel={()=>{}} value={fecha}/>:
                                    <View></View>
                            }
            
                            <View style={styles.FieldSeparator}></View>
                            <Text></Text>
                            <Button color="#095813" title="Solicitar fiscalizacion" onPress={()=>{
                                console.log("Fecha: ",fecha);
                                console.log("showDatePicker: ",showDatePicker)
                            }}/>
                        </View>)}
                </View>

                <View style={{justifyContent:'space-around'}}>
                    <Button color="#095813" title="canal de comunicacion" onPress={()=>{
                        navigation.navigate('Canal');
                    }}/>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Button color="#095813" title="propuestas de mejora" onPress={()=>{
                        navigation.navigate('Propuestas');
                    }}/>
                </View>
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

//make this component available to the app
export default Asesorias;
