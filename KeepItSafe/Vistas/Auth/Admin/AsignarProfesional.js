//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,Button, Animated,SafeAreaView,ActivityIndicator } from 'react-native';
import AsignarProForm from '../Forms/AsignarProForm';
import {Picker} from '@react-native-community/picker';
import styles from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

// create a component
class AsignarProfesional extends Component {
    constructor(props){
      super(props)
        this.state = {
            date:new Date(),
            cliente:[],
            fecha:'',
            evento:'asesoria',
            profesional:'',
            loading: true,
        }
  }
  /*
    <DateTimePicker 
        value={ date }
        mode='default'
        display='calendar'
        minimumDate={new Date()}
    onChange={ date => this.setState({ date }) } />


    
*/  /*
    componentDidMount = async()=> {
        let resp = await fetch('http://10.0.2.2:8080/clientes');
        let respJson = await resp.json();
        let clientos = [];
        //console.log(respJson);
        respJson.map((data)=>{
            clientos.push(data[3]);
            this.setState({clientes: clientos});
        });
        this.setState({loading:!this.state.loading})

    }
    */

    renderClientes = () => {
        const { cliente } = this.state;
        console.log('Mapeado :',cliente);
        cliente.map((data)=>{
            console.log('Mapeado :',data);
            return (
                <Picker.Item label={data} value={"data"}/>
            )
        })
    }

    render() {
        const { cliente, date, evento, profesional,loading } = this.state;
        console.log(this.state);
        return (
        <SafeAreaView  style={styles.container}>
            {
                loading? <ActivityIndicator animating={true} size="large" color="#095813"/>:
                (<View>
                    <Picker
                        selectedValue={this.state.cliente}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({cliente: itemValue})
                        }>
                      
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    {
                        /*
                            cliente.map((item,key)=>{
                                console.log("item: ",item);
                               return(<Text>{item}</Text>);
                                //<Picker.Item label={item} value={item} key={key} />
                            */
                        }
                </View>)
                }
            </SafeAreaView>
         
        );
    }
}
/*
 <Text style={styles.text}>Cliente</Text>
                    <Picker
                        selectedValue={this.state.cliente}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({cliente: itemValue})
                        }>

                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Text style={styles.text}>Fecha</Text>
            
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        locale={"es"}
                        minDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            //display: 'none',
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                            dateInput: {
                            marginLeft: 36,
                            },
                        }}
                        onDateChange={(date) => {
                            this.setState({date});
                        }}
                    />

                    <Text style={styles.text}>Evento</Text>
                    <Picker
                        selectedValue={this.state.evento}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({evento: itemValue})
                        }>
                        <Picker.Item label="Visita" value="visita" />
                        <Picker.Item label="Asesoria" value="asesoria" />
                    </Picker>

                    <Button color="#095813" title="Consultar" onPressonPress={()=>{
                        console.log(this.state);
                        alert("HERMANO QUE WEAAAAAAAAA")
                    }}
                    />

                    <Text style={styles.text}>Profesional</Text>
                    <Picker
                        selectedValue={this.state.profesional}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({profesional: itemValue})
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Button color="#095813" title="Asignar" onPress={()=>{}}/>)


*/
// define your styles
const stylo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default AsignarProfesional;
