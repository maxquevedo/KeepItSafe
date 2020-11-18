//import liraries
import React, { Component } from 'react';
import { View, Text, Button, TextInput,ScrollView } from 'react-native';
import VisitaCheckForm from '../Forms/VisitaCheckForm';
import styles from '../../styles';
// create a component
class Visita extends Component {
    constructor(props){
        super(props);
        this.state = {
            n: 3,
            aprobado: false,
            checks: [{'item':'Ventana limpia','color':'green'}, {'item': 'Piso limpio','color':'red'},{'item':'Salida despejada','color':'black'}],
            text:'',
        }
    }
    //Esta pantalla funciona trayendo al formulario los datos de checks en bd 
    // asociados al día, consultando los checks de visita del día.

    //TODO
    //  Encontrar una manera de actualizar la pantalla (el componente funcional, si no, hacer el boton 
    //  dentro del funcional para usar hooks)
    addToScreen = () => {  
        let texto = this.state.text; 
        let steit = this.state.checks;
        let item = {
            item: texto,
            color: "black"
        };
        console.log(item)
        steit.push(item);
        this.setState({checks:steit})
    }


    render() {
        const { checks } = this.state;

        return (
            <View style={{flex:1}}>
                <View style={styles.orderScreen}>
                    <View style={{justifyContent:'space-around'}}>
                        <View><Text></Text></View>
                        <View><Text></Text></View>
                        <VisitaCheckForm checks={checks} />
                        <View>
                            <View style={{justifyContent:'space-evenly'}}>
                                <Button color="#095813" onPress={()=>{console.log(checks)}} title="capacitacion"/>
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
