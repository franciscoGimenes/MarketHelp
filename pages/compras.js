import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


export default function Compras() {

  const navigation=useNavigation()

  function mudarPag(){
    navigation.navigate('index')
  } 

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FCE8B2']}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={mudarPag}>
          <Icon name="caret-left" size={60} color="#404E4D" />
        </TouchableOpacity>
        <Image source={require('../assets/logoMarketHelp2.png')} style={styles.imageHeader} />
        <TouchableOpacity>
          <Icon name="search" size={35} color="#404E4D" />
        </TouchableOpacity>
      </View>
      <Text>compras</Text>
      <StatusBar style="auto" />
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageHeader:{
    width: 50,
    height: 80,
  },
});
