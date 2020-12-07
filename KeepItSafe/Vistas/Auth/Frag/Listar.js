//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import styles from '../../styles';

// create a component
const renderItem = (data) => {
    //console.log(data);
    let color = "";
    if (data.index %2 == 0){
        color = "#A2AFA2";
    }else{
        color = "white";
    }
    return(
    <TouchableOpacity style={{ backgroundColor:color}}>
        <Text></Text>
        <View style={{alignContent:'space-between'}}>
            <Text style={styles.text}>Usuario: {data.item[1]}</Text>
            <Text style={styles.text}>Correo: {data.item[2]}</Text>
            <Text style={styles.text}>Nombre: {data.item[3]}</Text>
        </View>    
        <View>
            <Text></Text>
            <Text></Text>
        </View>
    </TouchableOpacity>);
}

const Listar = (props) => {
   // console.log(props);
    return (
        <View style={{flex:1}}>
            <FlatList data={props.datos} renderItem={renderItem} keyExtractor={item => item.index }/>
        </View>
    );
};

//make this component available to the app
export default Listar;
