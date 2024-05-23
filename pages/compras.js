import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { ModalProdutos } from '../components/ModalProdutos'; 
import { ModalBan } from '../components/modalBan';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Armazenamento from '../hooks/bancoCompras';
import { CaixaToken } from '../components/produtoView';



export default function Compras() {
  const navigation = useNavigation();
  const [telaModal, configTelaModal] = useState(false);
  const [telaModalBan, configTelaModalBan] = useState(false);
  const [img, configImg] = useState(true);
  const telaAtiva = useIsFocused();
  const [listaProdutos, defListaProdutos] = useState([]);
  const [listaValores, defListaValores] = useState([]);
  const [listaQuantidade, defListaQuantidade] = useState([]);
  const { obterItem, removerItem } = Armazenamento();
  const [somaValores, setSomaValores] = useState(0);

  async function deletarToken(item) {
    const index = listaProdutos.indexOf(item);
    if (index !== -1) {
      // Remove o item da lista de produtos
      const novosProdutos = [...listaProdutos];
      novosProdutos.splice(index, 1);

      // Remove o valor correspondente da lista de valores
      const novosValores = [...listaValores];
      novosValores.splice(index, 1);

      // Remove a quantidade correspondente da lista de quantidades
      const novosQtde = [...listaQuantidade];
      novosQtde.splice(index, 1);

      // Atualiza os estados
      defListaProdutos(novosProdutos);
      defListaValores(novosValores);
      defListaQuantidade(novosQtde);

      // Atualiza o armazenamento removendo o produto e o valor
      await removerItem("@nome", item);
      await removerItem("@valor", listaValores[index]);
      await removerItem("@qtde", listaQuantidade[index]);

      // Verifica e atualiza a visibilidade da imagem
      verificarIMG(novosProdutos);
      calcularSomaValores(novosValores);
    }
  }

  async function carregarProdutos() {
    const valores = await obterItem("@valor");
    const produtos = await obterItem("@nome");
    const qtde = await obterItem("@qtde");

    defListaProdutos(produtos);
    defListaValores(valores);
    defListaQuantidade(qtde);

    // Verificar e atualizar a visibilidade da imagem
    verificarIMG(produtos);
    calcularSomaValores(valores);
  }

  useEffect(() => {
    if (telaAtiva) {
      carregarProdutos();
    }
  }, [telaAtiva]);

  function abrirModal() {
    configTelaModal(true);

  }

  function abrirModalBan(){
    configTelaModalBan(true)
  }

  function verificarIMG(produtos) {
    if (produtos.length === 0) {
      configImg(true);
    } else {
      configImg(false);
    }
  }

  function fecharModal() {
    configTelaModal(false);
    configTelaModalBan(false);
    carregarProdutos(); // Recarrega a lista de produtos e valores após fechar o modal
  }

  function calcularSomaValores(valores) {
    const soma = valores.reduce((acc, val) => acc + parseFloat(val), 0).toFixed(2);
    setSomaValores(soma);
  }

  return (
    <LinearGradient colors={['#FFFFFF', '#FCE8B2']} style={styles.container}>
      <ModalProdutos fechar={fecharModal} visivel={telaModal} />
      <ModalBan fechar={fecharModal} visivel={telaModalBan} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <Icon name="caret-left" size={60} color="#404E4D" />
        </TouchableOpacity>
        <View style={styles.total}>
          <Text style={styles.valorTXT}>Total:</Text>
          <Text style={styles.valorTXT}>R$ {somaValores}</Text>
        </View>
        <TouchableOpacity onPress={abrirModalBan}> 
          <Icon name="ban" size={35} color="#404E4D" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.BotaoAnterior} onPress={abrirModal}>
        <View style={styles.conteudoBotoes}>
          <Text style={styles.compraAnterior}>Clique e adicione o produto</Text>
          <Icon name="plus-square" size={30} color="#545454" />
        </View>
      </TouchableOpacity>

      {img && (
        <Image style={styles.imagemCompra} source={require('../assets/compra.png')} />
      )}

      <FlatList
        style={styles.FlatList}
        data={listaProdutos}
        keyExtractor={(item, index) => String(index)}
        extraData={[listaValores, listaQuantidade]}
        scrollEnabled={true}
        renderItem={({ item, index }) => (
          <CaixaToken
            token={item}
            valor={listaValores[index]}
            qtde={listaQuantidade[index]}
            removerToken={() => deletarToken(item)}
          />
        )}
      />

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
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
    marginTop: 40,
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
  FlatList: {
    flex: 1,
  },
  imagemCompra: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  valorTXT: {
    fontSize: 23,
  },
  total:{
    flexDirection: 'column',
    alignItems: 'center',
  },
});
