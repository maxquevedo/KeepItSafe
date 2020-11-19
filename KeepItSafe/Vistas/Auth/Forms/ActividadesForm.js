//import liraries
import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import styles from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const ActividadesForm = (props) => {
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [capacitaciones,setCapacitaciones]  = useState('');
    const [visitas,setVisitas] = useState('');
    const [asesorias,setAsesorias ] = useState('');
    // const [capacitaciones,setCapacitaciones]  = useState(['01/11/20','11/11/20','18/11/20','30/11/20','03/12/20']);
    // const [visitas,setVisitas] = useState(['03/11/20','13/11/20','22/11/20','25/11/20','10/12/20']);
    // const [asesorias,setAsesorias ] = useState(['08/11/20','10/11/20','19/11/20','03/11/20','22/12/20']);
    const [id,setId] = useState(null);
    const [tipoUsuario,setTipoUsuario] = useState(null);
    const [id2,setId2] = useState(null);

    // useEffect( () => {
    //   getVariables().then(getAsesorias());
      
    //   return async function cleanup(){
    //     setVisitas(null);
    //     setAsesorias(null);
    //     setCapacitaciones(null);
    //     setId(null);
    //     setTipoUsuario(null);
    //     setId2(null);
    //   }

    // },[]);

    const getVariables = async()=>{
      let aidi = await AsyncStorage.getItem("id");
      let usuario = await AsyncStorage.getItem("tipoUsuario")
      let aidi2 = await AsyncStorage.getItem("id2");
      setId(aidi);
      setTipoUsuario(usuario);
      setId2(aidi2);
    }

    const getAsesorias = async () => {
      let param1 = id;
      let param2 = tipoUsuario;
      let param3 = id2;
      let param4 = "asesoria";
      let resp = await fetch(`http://10.0.2.2:8080/actividades/${param1}/${param2}/${param3}/${param4}`);
      let respJson = await resp.json();
      let aux = await respJson[0];
      console.log('Aux: '+aux);
      setAsesorias(aux);
      aux = await respJson[1];
      console.log('Aux: '+aux);
      setCapacitaciones(aux);
      aux = await respJson[2];
      setVisitas(aux);
    };

    const customDatesStylesCallback = date => {
      getVariables().then((date )=>{
        console.log("Visitas xD: "+visitas,'Capacitaciones xd: '+capacitaciones,'Visitas Xd: '+visitas);
        let deit = new Date(date);
        deit.setHours(12,0,0,0);
        let day = deit.getDate();
        let month = deit.getMonth();
        let year = deit.getFullYear();
        let decada = ''+year.toString()[2];
        let año = ''+year.toString()[3];
  
        year = decada+año;
        if(day.toString().length < 2){
          day = '0'+day;
        }
        
  
        let dateCompairable = day+'/'+(month+1)+'/'+year;
        if (asesorias=='' && capacitaciones=='' && visitas=='' )
          return
  
        for( dias in asesorias){
          if(dateCompairable == asesorias[dias]){
            return {
              style:{
                backgroundColor: '#988C0C',
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
              }
            };
          }
        }
  
        for(dias in capacitaciones){
          if(dateCompairable == capacitaciones[dias]){
            return {
              style:{
                backgroundColor: '#17176B',
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
              }
            };
          }
        }
  
        for(dias in visitas){
          if(dateCompairable == visitas[dias]){
            return {
              style:{
                backgroundColor: '#157D0A',
              },
              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
              }
            };
          }
        }
      })
  
    }
  
    const onDateChange = (date, type) => {
      //function to handle the date change
      if (type === 'END_DATE') {
        setSelectedEndDate(date);
      } else {
        setSelectedEndDate(null);
        setSelectedStartDate(date);
      }
    };

    
    const eventoEnFechaElegida = () => {
      let deit = (new Date(selectedStartDate));
      let hour = deit.getHours();
      let minutes = deit.getMinutes();
      let strMinutes = minutes.toString().length

      if(strMinutes < 2){
        minutes = "0"+minutes;
      }

      let hora = hour+':'+minutes;

      return (<Text>
        Hora: { hora }
      </Text>)
    }

    const fechaElegida = () =>{
      let deit = (new Date(selectedStartDate)).toLocaleDateString();
      let mes = deit[0]+deit[1];
      let dia = deit[3]+deit[4];
      let año = deit[6]+deit[7];
      let fecha = dia+'/'+mes+'/'+año;
      return (
        <Text>Fecha: { fecha }</Text>
      )
    }

    const evento = () => {
      let deit = (new Date(selectedStartDate)).toLocaleDateString();
      let mes = deit[0]+deit[1];
      let dia = deit[3]+deit[4];
      let año = deit[6]+deit[7];
      let fecha = dia+'/'+mes+'/'+año;
      let evento = "";

      for( dias in asesorias){
        if(fecha == asesorias[dias]){
          evento = "Asesoría"
          break;
        }
      }

      for(dias in capacitaciones){
        if(fecha == capacitaciones[dias]){
          evento = "Capacitación"
          break;
        }
      }

      for(dias in visitas){
        if(fecha == visitas[dias]){
          evento = "Visita"
          break;
        }
      }

      return (
        <Text>Evento: { evento }</Text>
      )
    }

    const cnahgeMonth = (date ) => {
      setSelectedStartDate(null);
    }
  
  
    return (
      <SafeAreaView style={{}}>
        <View style={{}}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={false}
            minDate={new Date(2018, 1, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={
              [
                'Lun', 
                'Mar', 
                'Mie', 
                'Jue', 
                'Vie', 
                'Sab', 
                'Dom'
              ]}
            months={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#66ff33"
            selectedDayTextColor="#000000"
            selectedDayStyle={{}}
            previousComponent={ <Ionicons name="md-arrow-dropleft" size={24} color="black" />}
            nextComponent = {  <Ionicons name="md-arrow-dropright" size={24} color="black" />}
            scaleFactor={375}
            onMonthChange = {(date )=> cnahgeMonth(date)}
            textStyle={{
              color: '#000000',
            }}
            onDateChange={onDateChange}
            customDatesStyles={customDatesStylesCallback}
          />
        </View>
        <Text></Text>
        <View style={{flexDirection:'row'}}>
            <View style={{backgroundColor:'#17176B',width:20,borderRadius:9}}></View>
            <Text> Capacitacion      </Text>

          <View style={{backgroundColor:'#988C0C',width:20,borderRadius:9}}></View>
            <Text> Asesoría      </Text>
 
   
          <View style={{backgroundColor:'#157D0A',width:20,borderRadius:9}}></View>
            <Text> Visita</Text>
 
        </View>
        <Text></Text>
        <Text></Text>
        <Button title="Actualizar" onPress={getAsesorias}/>
        <View style={{}}>
          {
            selectedStartDate != null? 
            <View style={{alignItems:'baseline'}}>
              <Text style={styles.text}>{ selectedStartDate ? fechaElegida() : ''}</Text>
              <Text style={styles.text}>{ selectedStartDate ? eventoEnFechaElegida() : ''}</Text>
              <Text style={styles.text}>{ selectedStartDate ? evento() : ''}</Text>
            </View>  
              :<Text></Text>
          }
        </View>
      </SafeAreaView>
    );
  };

export default ActividadesForm;
