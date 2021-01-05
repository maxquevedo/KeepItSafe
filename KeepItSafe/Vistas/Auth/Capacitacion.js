//import liraries
import React, { Component } from 'react';
import { View, FlatList, Button,ActivityIndicator,Text, TextInput,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

// create a component
class Capacitacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            solicitudes:['Wena'],
            fechaSeleccionada: new Date().toLocaleDateString(),
            tipoUsu:'',
            refreshList: false,
            showDatePicker: false,
        }
    }

    async componentDidMount(){
        const {navigation} = this.props;
        let tipoUsu = await AsyncStorage.getItem('tipoUsuario');
        if(tipoUsu == 'Cliente'){
            navigation.setOptions({ title:'Solicitar capacitación' });
        }else{
            navigation.setOptions({ title:'Crear capacitación' });
        }
        
        let idCli = await AsyncStorage.getItem('id2');
        let resp = await fetch(`http://10.0.2.2:8080/solicitudes/capacitacion/${idCli}`);
        let respJson = await resp.json();
        this.setState({solicitudes: respJson,loading:false,tipoUsu});
    }

    async refreshSolicitudes(){
        let idCli = await AsyncStorage.getItem('id2');
        let resp = await fetch(`http://10.0.2.2:8080/solicitudes/capacitacion/${idCli}`);
        let respJson = await resp.json();
        this.setState({solicitudes: respJson,loading:false});
    }

    renderItem(data){
        console.log("Hnito que wea: ",data);
        let fecha =new Date(data.item[6]).toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        let backColor = "fff";
        if(data.index%2 == 0){
            backColor= "#A2AFA2"
        }
        return(
            <View style= {{ backgroundColor:backColor, flexDirection:'row' }}>
                <Text style={{fontSize: 25, paddingLeft: '5%', paddingRight:'5%'}}>{ fechaFormat }</Text>
                <Text style={{fontSize: 25, paddingLeft:'30%'}}>{ data.item[4] }</Text>
            </View>
        );
    }

    clienteView(){
        const { solicitudes,refreshList,fechaSeleccionada,showDatePicker } = this.state;
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 15);
        let fecha =new Date(fechaSeleccionada).toLocaleDateString();
        let fechaFormat = fecha[3]+fecha[4]+'/'+fecha[0]+fecha[1]+'/'+fecha[6]+fecha[7];
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.2,marginTop:'15%'}}>
                    <View style={{"flexDirection":"row","justifyContent":"center","direction":"inherit","flexWrap":"nowrap"}}> 
                        <Text style={{fontSize:25}}>{ fechaFormat } </Text>
                        {
                            showDatePicker? <DateTimePicker
                                                testID="dateTimePicker"
                                                value={new Date(fechaSeleccionada)}
                                                mode={"calendar"}
                                                is24Hour={true}
                                                display="default"
                                                minimumDate = { minDate }
                                                onChange={(event,selectedDate)=>{this.setState({fechaSeleccionada:selectedDate})}}
                                            />:
                                            <Text></Text>
                        }
                        <TouchableOpacity onPress={()=> {this.setState({showDatePicker:true})}}>
                            <Ionicons name="md-calendar" size={32} color={ "black"} />
                        </TouchableOpacity>
                        
                    </View>
                </View>

                <View style={{flex:0.1}}>
                   <Button title="Solicitar capacitacion" color="#095813" onPress={()=>{}}/>
                </View>

                <View style={{flex:0.7, marginTop:'10%'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 25 }}>Fecha capacitación</Text>
                        <Text style={{fontSize: 25, paddingLeft:'15%'}}>Estado</Text>
                    </View>
                    <FlatList data={solicitudes} refreshing={refreshList} onRefresh={this.refreshSolicitudes.bind(this)} renderItem={this.renderItem} keyExtractor={(item,index)=> index.toString() }/>
                </View>
            </View>
        );
    }

    proView(){
        return(
            <View><Text>Pro</Text></View>
        )
    }

    render() {
        const { loading, tipoUsu } = this.state;
        return (
            <View style={{flex:2}}>
                {
                    loading? <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}><ActivityIndicator size="large" color="#095813"/></View>:
                    ( tipoUsu == "Cliente"? this.clienteView():this.proView() )
                }
            </View>
        );
    }
}


//make this component available to the app
export default Capacitacion;
