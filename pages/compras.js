import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { ModalTokens } from '../components/modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';


export default function Compras() {

  const navigation = useNavigation()

  const [telaModal, configTelaModal] = useState(false)


  function abrirModal() {
    configTelaModal(true);
  }

  function mudarPag() {
    navigation.navigate('index')
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FCE8B2']}
      style={styles.container}>
        
      <Modal visible={telaModal} animationType="fade" transparent={true}>
        <ModalTokens fechar={() => configTelaModal(false)} />
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={mudarPag}>
          <Icon name="caret-left" size={60} color="#404E4D" />
        </TouchableOpacity>
        <Image source={require('../assets/logoMarketHelp2.png')} style={styles.imageHeader} />
        <TouchableOpacity>
          <Icon name="search" size={35} color="#404E4D" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.BotaoAnterior} onPress={abrirModal}>
        <View style={styles.conteudoBotoes}>
          <Text style={styles.compraAnterior}>Clique e adicione o produto</Text>
          <Icon name="plus-square" size={30} color="#545454" />
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageHeader: {
    width: 50,
    height: 80,
  },
  BotaoAnterior: {
    marginTop: 10,
    width: 300,
    height: 71,
    backgroundColor: '#FFC030',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compraAnterior: {
    color: '#545454',
    fontSize: 15,
    marginRight: 20,
  },
  conteudoBotoes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
