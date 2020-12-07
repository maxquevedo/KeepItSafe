//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// create a component
class DiasCalendario extends Component {
    state = {
        dias: this.props.dias
    }

    renderItem = (data)  => {
        return(
            <View>
               <Text>Existo :'C </Text>
            </View>
          );
    }

    renderActivity = () =>{
        alert("hola");
        return(<View><Text>"Cuadro"</Text></View>)
    }

    Cuadro = (dias) => {
        return (
            <View>
                <TouchableOpacity onPress={this.renderActivity}>
                    <Text>{dias} </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { dias } = this.state;
        return (
            <View style={styles.container}>
                {this.Cuadro(this.props.dias)}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default DiasCalendario;
