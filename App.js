import React, {useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, TouchableHighlight, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [input, setInput] = useState('');
  const [nombreStorage, setNombreStorage] = useState('');

  useEffect( () => {
    obtenerDatosStorage();
  },[]);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', input);
      // es seguro que la linea que viene a continuación se llevara acabo
      setNombreStorage(input)
    } catch (error) {
      throw error;
    }
  };

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      setNombreStorage(nombre);
    } catch (error) {
      throw error;
    }
  };

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setNombreStorage('');
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.contenedor}>
      { nombreStorage? <Text> Hola: { nombreStorage} </Text>: null}
      <TextInput
        placeholder="Escribe tu nombre"
        style={styles.input}
        onChangeText={texto => setInput(texto)}
      />
      <Button 
        title="Guardar"
        color="#333"
        onPress={() => guardarDatos()}
      />
      <TouchableHighlight
        onPress= { () => eliminarDatos()}
        style={styles.btnEliminar}
      >
        <Text style={styles.textoEliminar}>Eliminar Nombre</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  btnEliminar: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
    borderRadius: 10
  },
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#777',
    borderBottomWidth: 2,
    width: 300,
    height: 40,
    marginBottom: 10
  },
  textoEliminar : {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default App;
