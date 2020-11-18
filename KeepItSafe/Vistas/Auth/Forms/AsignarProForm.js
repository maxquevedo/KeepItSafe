import React, { Component, useState } from 'react';
import {Picker} from '@react-native-community/picker';
import { View, Text, TextInput, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import styles from '../../styles';

const fieldCrearCuenta = (props) => {
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
            keyboardType= 'default'
            onBlur = {props.input.onBlur}
            />
            {props.meta.touched && props.meta.error && <Text>{props.meta.error}</Text> }
         </View>
    );
};

const validate = (values) =>{
    const errors = {};

    //usuario
    if(!values.usuario){
        errors.usuario = 'requerido';
    }else if(values.usuario.length < 4){
        errors.usuario = 'deben ser al menos 5 caracteres';
    }else if(values.usuario.length > 10){
        errors.usuario= 'debe ser menor de 10 caracteres';
    }

    /* //correo
    if(!values.correo){
        errors.correo = 'requerido';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.correo = 'email invalido';
    }
    */

    //password
    if(!values.contraseña){
        errors.contraseña = 'requerido';
    }else if(values.contraseña.length < 5){
        errors.contraseña = 'No puede ser menor a 5 caracteres';
    }else if(values.contraseña.length > 15){
        errors.contraseña = 'No puede ser mayor a 15 caracteres';
    }

    return errors;
}

const SignUpForm = (props) => {

    //console.log(props);
    return(
        <View style={styles.container}>
            <View style={styles.inputForm}> 
                <Field name="usuario" component={fieldCrearCuenta} ph="usuario" nm="Usuario"/>
            </View>
            <Button style={styles.button} title="Consultar" color="#095813" onPress={props.handleSubmit((values)=>{
                //console.log(values);
            })} />
                {/* <Picker
                    selectedValue={this.state.language}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}

        </View>
    )
}


export default reduxForm({
    form: 'SignUpForm',
    validate,
})(SignUpForm);
