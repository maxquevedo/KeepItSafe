import React, { Component } from 'react';
import { View, Text, TextInput, Button, ScrollView} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import styles from '../styles';

const fieldCrearCuenta = (props) => {
    //console.log(props);
    return(
        <View style={styles.inputForm}>
            <Text style={styles.titleForm}>{props.nm}</Text>
            {
                props.editar?  <TextInput placeholder={props.ph}
                style={styles.input}
                onChangeText={props.input.onChange}
                value={props.input.value}
                autoCapitalize= 'none'
                keyboardType= 'email-address'
                onBlur = {props.input.onBlur}
                />:<Text style={styles.centerText}>{props.ph}</Text>
                
            }
          
            {props.meta.touched && props.meta.error && <Text style={styles.errorForm}>{props.meta.error}</Text> }
            <View style={styles.FieldSeparator}><Text></Text></View>
         </View>
    );
};

const validate = (values) =>{
    const errors = {};

    //usuario
    if(!values.usuario){
        errors.usuario = 'requerido';
    }else if(values.usuario.length < 5){
        errors.usuario = 'usuario debe tener al menos 5 caracteres';
    }else if(values.usuario.length > 20){
        errors.usuario= 'usuario debe tener menos de 20 caracteres';
    }

    //largo correo
    if(!values.correo){
        errors.correo = 'requerido';
    }else if(values.correo.length < 5){
        errors.correo = 'correo inválido'
    }

    return errors;
}


const SignUpForm = (props) => {
    //console.log(props);
    //<View style={{alignItems:'stretch',justifyContent:'flex-end'}}>
    return(
        <ScrollView>
            <ScrollView> 
                <Field name="usuario" component={fieldCrearCuenta} ph={props.usuario} nm="Usuario" editar={props.editar}/>
                <Field name="correo" component={fieldCrearCuenta} ph={props.correo} nm="Correo" editar={props.editar}/>
            </ScrollView>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View><Text></Text></View>
            <View style={{alignSelf:'stretch'}}>
                {
                    props.editar? <Button title="guardar" color="#095813" onPress={props.handleSubmit((values)=>{
                        console.log(values);
                    })} />:<Text></Text>
                }
            </View>
        </ScrollView>
    )
}


export default reduxForm({
    form: 'SignUpForm',
    validate,
})(SignUpForm);
