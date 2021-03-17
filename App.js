import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);
  function generatePass(){
    let pass = '';
    for(let i =0, n = charset.length;i<size;i++){
      pass+=charset.charAt(Math.floor(Math.random()*n));
    }
    setPassword(pass);
  }
  function copyPass(){
    Clipboard.setString(password);
    alert(password+ ' Copiada');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/logo.png')} style={styles.logo} />
      <Text  style={styles.titulo}>{size} Caracteres</Text>
      <View style={styles.area}>
        <Slider
         style={{height:50}}
         minimumValue={5}
         maximumValue={16}
         minimumTrackTintColor="#f8b195"
         maximumTrackTintColor="#99b89b"
         value={size}
         onValueChange={(valor)=>{setSize(valor.toFixed(0))}}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>
          Gerar Senha
        </Text>
      </TouchableOpacity>
      {password!=='' && (
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPass}>
            {password}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#99b89b'
  },
  logo:{
    marginBottom:60
  },
  titulo:{
    fontSize: 30,
    fontWeight:'bold'
  },
  area:{
    marginTop:15,
    marginBottom:15,
    backgroundColor:'#2a363b',
    width:'80%',
    borderRadius:7
  },
  button:{
    backgroundColor:'#f8b195',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25
  },
  buttonText:{
    fontSize: 20,
    color:'#fff',
    fontWeight:'bold'
  },
  password:{
    padding:10,
    color:'#fff',
    fontSize: 20,
    textAlign:'center'
  }
});