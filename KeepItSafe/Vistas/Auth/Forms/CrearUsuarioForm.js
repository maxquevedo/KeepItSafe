import React, { Component, useState } from 'react';
import {Picker} from '@react-native-community/picker';
import { View, Text, TextInput, Button,KeyboardAvoidingView,ScrollView, Alert } from 'react-native';
import { Field, reduxForm,reset } from 'redux-form';
import styles from '../../styles';

const fieldCrearUsuario = (props) => {
    //console.log(props);
    return(
        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center'}}>
            <Text style={styles.text}>{props.nm}</Text>
            <TextInput placeholder={props.ph}
            style={styles.input}
            onChangeText={props.input.onChange}
            value={props.input.value}
            autoCapitalize= 'none'
            secureTextEntry={!!(props.input.name === 'contraseña')}
            keyboardType= { props.input.name==='correo'? 'email-address':(props.input.name==='rut'? 'numeric':'default')}
            onBlur = {props.input.onBlur}
            />
            {props.meta.touched && props.meta.error && <Text style={{color:'red'}}>{props.meta.error}</Text> }
         </View>
    );
};

const validate = (values) =>{
    
    const errors = {};
    //console.log("validate:",values)
    //usuario
    if(!values.usuario){
        errors.usuario = 'requerido';
    }else if(values.usuario.length < 4){
        errors.usuario = 'deben ser al menos 4 caracteres';
    }else if(values.usuario.length > 10){
        errors.usuario= 'debe ser menor de 10 caracteres';
    }

    //correo
    if(!values.correo){
        errors.correo = 'requerido';
    }

    //nombre completo
    if(!values.nombre){
        errors.nombre = 'requerido';
    }else if(values.nombre.split(' ') < 1){
        errors.nombre = "Nombre y apellido por favor";
    }

    //contraseña
    if(!values.contraseña){
        errors.contraseña = 'requerido';
    } else if(values.contraseña.length < 4 ){
        errors.contraseña = 'debe ser mayor a 4 caracteres';
    }
    
    //rut
    if(!values.rut){
        errors.rut = 'requerido';
    }else if(values.rut){

    }


    return errors;
}

const postUsuario = async(values,props) =>{
    let url = 'http://10.0.2.2:8080/create';

    if(values.razonSocial == null){
        console.log("tipo profesional");
        let json = {
            username: values.usuario,
            password: values.contraseña,
            email: values.correo,
            rut: values.rut,
            name: values.nombre,
        };

        let resp = await fetch(`${url}/profesional`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({json})
        });

        let respJson = await resp.json()

        console.log("RespJson: ",respJson); 
        console.log(resp.status)
        if(respJson.errorNum===1) {
           Alert.alert("Ups","Profesional duplicado",[
               {text: 'Ok',onPress: ()=> {console.log("Apretó ok")} }
           ],{
               cancelable: false
           });
        } else {
            Alert.alert("Exito","Profesional agregado",[
                {text: 'Ok',onPress: ()=> {
                    props.reset();
                    props.navigation.popToTop();
                } }
            ],{
                cancelable: false
            });
        }

    }else{
        console.log("tipo cliente");
        let json = {
            username: values.usuario,
            password: values.contraseña,
            email: values.correo,
            rut: values.rut,
            name: values.nombre,
            razonSocial: values.razonSocial
        };

        let resp = await fetch(`${url}/cliente`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json; charset="UTF-8"'
            },
            body: JSON.stringify({json})
        });

        let respJson = await resp.json()

        console.log("RespJson: ",respJson);       
       
        if(respJson.errorNum===1) {
            Alert.alert("Ups","Cliente duplicado",[
                {text: 'Ok',onPress: ()=> {console.log("Apretó ok")} }
            ],{
                cancelable: false
            });
         }else {
            Alert.alert("Exito","Cliente agregado",[
                {text: 'Ok',onPress: ()=> {
                    props.reset();
                    props.navigation.popToTop();
                } }
            ],{
                cancelable: false
            });
        }

    }
    

}

const CrearUsuario = (props) => {
    const [selectedValue, setSelectedValue] = useState("Profesional");

    //console.log("props desde el form: ",props);
    return(
        <ScrollView style={{flex:1,width:'100%'}}>
            <KeyboardAvoidingView > 
                <Field name="usuario" component={fieldCrearUsuario} ph="usuario" nm="Usuario"/>
                <Text></Text>
                <Field name="correo" component={fieldCrearUsuario} ph="correo" nm="Correo"/>
                <Text></Text>
                <Field name="nombre" component={fieldCrearUsuario} ph="nombre completo" nm="Nombre completo"/>
                <Text></Text>
                <Field name="contraseña" component={fieldCrearUsuario} ph="contraseña" nm="Contraseña"/>
                <Text></Text>
                <Field name="rut" component={fieldCrearUsuario} ph="12345678-9" nm="Rut"/>
                <Text></Text>
                <Text style={styles.centerText}>Tipo de cuenta</Text>
                <Picker  selectedValue={selectedValue}
                    style={{ height: 50, width: 150,alignSelf:'center',fontSize:25 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>

                    <Picker.Item label="Profesional" value="Profesional" style={{fontSize:25}} />
                    <Picker.Item label="Cliente" value="Cliente" />
                </Picker>   
                {
                 selectedValue==="Profesional"?
                    <View>
                    </View>:
                    <View>
                        <Field name="razonSocial" component={fieldCrearUsuario} ph="razon social" nm="Razon social"/>
                    </View>
                }
            </KeyboardAvoidingView>
            <Button style={styles.button} title="Consultar" color="#095813" onPress={props.handleSubmit((values)=>{
                //console.log(values);
                if(selectedValue === 'Profesional'){
                    values.razonSocial = null;
                }
                postUsuario(values,props);
            })} />
        </ScrollView>
    )
}


export default reduxForm({
    form: 'CrearUsuario',
    validate,
})(CrearUsuario);
