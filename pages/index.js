import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Bem_Vindo() {

  const [escolha, setEscolha] = useState("")

  const navigation=useNavigation()

  function mudarPag(){
    navigation.navigate('compras')
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FEF4DB']}
      style={styles.container}>
      <View style={styles.imageDiv}>
        <Image source={require('../assets/elipseAmarela.png')} style={styles.image} />
        <Image source={require('../assets/elipseMaior.png')} style={styles.elipse} />
        <View style={styles.ImagemContainer}>
          <Image source={require('../assets/logoPreta.png')} />
          <Image source={require('../assets/barbudao.png')} style={styles.barbudo} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.BotaoComprar} onPress={setEscolha("novaCompra")}>
          <View style={styles.conteudoBotoes}>
            <Text style={styles.comecarCompra}>Começar compra</Text>
            <Icon name="shopping-cart" size={30} color="#545454" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BotaoAnterior} onPress={setEscolha("verCompra")}>
          <View style={styles.conteudoBotoes}>
            <Text style={styles.compraAnterior}>Ver compra anterior</Text>
            <Icon name="arrow-left" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elipse: {
    height: '100%',
    width: '100%',
    zIndex: 1,

  },
  barbudo: {
    height: 295,
    width: '90%',
    zIndex: -1,
    position: 'absolute',
    top: 60,
  },
  ImagemContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 35,
    width: '100%',
  },
  icon: {
    padding: 10,
  },
  image: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  imageDiv: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '62%',
    resizeMode: 'cover',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  BotaoComprar: {
    marginTop: 10,
    width: 300,
    height: 65,
    backgroundColor: '#FFC030',
    borderRadius: 15, 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BotaoAnterior: {
    marginTop: 10,
    width: 300,
    height: 65,
    backgroundColor: '#545454', 
    borderRadius: 15,
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  compraAnterior: {
    color: '#fff', 
    fontSize: 18,
    marginRight: 20,
  },
  comecarCompra: {
    color: '#545454',
    fontSize: 18,
    marginRight: 40, 
  },
  conteudoBotoes: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
});


