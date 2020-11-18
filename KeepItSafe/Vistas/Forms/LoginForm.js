import React, { Component } from 'react';
import { View, Text, TextInput, Button,KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import { NavigationActions } from 'react-navigation';

const loggin = async (values) => {

    let url = `http://10.0.2.2:8080/login/${values.username}/${values.password}` ;
    const resp = await fetch(url);
    const respJson = await resp.json();
    const status = parseInt(respJson.code);
    //console.log(respJson[0][5]);
    await AsyncStorage.setItem('id',(respJson[0][0]).toString());
    await AsyncStorage.setItem('username',respJson[0][1]);
    await AsyncStorage.setItem('email',respJson[0][2]);
    await AsyncStorage.setItem('name',respJson[0][3]);
    //await AsyncStorage.setItem('password',respJson[0][5]);
    await AsyncStorage.setItem('tipoUsuario',respJson[0][5]);
    await AsyncStorage.setItem('id2',(respJson[0][6]).toString());
    return true;
    if(status === 200){

        //switch(respJson[5]){}
    }
}

const fieldLogin = (props) => {
    //console.log(props);
    return(
        <View style={{alignContent:'center',alignItems:'center',alignSelf:'center'}}>
            <Text style={styles.text}>{props.nm}</Text>
            <TextInput placeholder={props.ph}
            style={styles.input}
            onChangeText={props.input.onChange}
            value={props.input.value}
            autoCapitalize= 'none'
            secureTextEntry={!!(props.input.name === 'password')}
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

    //password
    if(!values.contraseña){
        errors.contraseña = 'requerido';
    }else if(values.contraseña.length < 2){
        errors.contraseña = 'No puede ser menor a 5 caracteres';
    }else if(values.contraseña.length > 15){
        errors.contraseña = 'No puede ser mayor a 15 caracteres';
    }

    return errors;
}

// const resetAction = NavigationActions.reset({
//     index: 1,
//     actions: [NavigationActions.navigate({ routeName: 'Profile' })],
//     key: null,
//   });

const LoginForm = (props) => {
    const { navigation } = props;
    //AsyncStorage.getAllKeys().then(data=> console.log(data))
    AsyncStorage.getItem('tipoUsuario').then((value) => {
        if(value == null){
            //console.log('Sesion no iniciada')
        }else{
            switch(value){
                case 'Cliente':
                    //console.log('Nav to client');
                    navigation.reset({
                        index:0,
                        routes: [{
                            name: 'Cliente'
                        }]
                    })
                    break;
                case 'Profesional':
                    //console.log('Nav to profesional');
                    navigation.reset({
                        index:0,
                        routes: [{
                            name: 'Profesional'
                        }]
                    })
                    break;
                case 'Admin':
                    //console.log('Nav to admin');
                    navigation.reset({
                        index:0,
                        routes: [{
                            name: 'Admin'
                        }]
                    })
                    break;
                default: 
                    break;
            }
        }
    })
    return(
        <View style={{justifyContent:'center',alignSelf:'center'}}>
            <KeyboardAvoidingView> 
                <Field name="username" component={fieldLogin} ph="usuario" nm="Usuario"/>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Field name="password" component={fieldLogin} ph="*******" nm="Contraseña"/>
            </KeyboardAvoidingView>

            <Button style={styles.button} title="Iniciar sesion" color="#095813" onPress={props.handleSubmit(async (values)=>{
               //-> funciona iwal props.login(values);
               let reddir = await loggin(values)
                //console.log(values);
            })} />
        </View>
    )
}

export default reduxForm({
    form: 'LoginForm',
    validate,
})(LoginForm);
