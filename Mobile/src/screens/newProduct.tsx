import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import api from '../api';
import { ProductCreateRequestDTO } from "../api/dto";
import { useLoading } from '../context/loadingContext';

const NewProductScreen = () => {
  const navigation = useNavigation();
  const {withLoading, isLoading} = useLoading();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [produtoAtivo, setProdutoAtivo] = useState(true);

  const handleSalvar = () => {
    // Lógica para salvar o produto
    withLoading(async () => {
      try {
        const product: ProductCreateRequestDTO = {
            nome,
            preco: parseFloat(preco.replace(',', '.')),
            estoque: 0 // or any default value
        };

        await api.products.createProdut(product);
        Toast.show({
          type: 'success',
          text1: 'Produto salvo com sucesso!'
        });

        navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar produto:', error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        
        {/* Título */}
        <Text style={styles.titulo}>Novo Produto</Text>

        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>
        </View>

        {/* Seção Nome */}
        <View style={styles.secao}>
          <Text style={styles.label}>
            <Text style={styles.asterisco}>* </Text>
            Nome
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Suco de Laranja 300ml"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#999"
          />
        </View>

        {/* Seção Categoria */}
        <View style={styles.secao}>
          <Text style={styles.label}>
            <Text style={styles.asterisco}>* </Text>
            Categoria
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Bebidas"
            value={categoria}
            onChangeText={setCategoria}
            placeholderTextColor="#999"
          />
        </View>

        {/* Seção Preço */}
        <View style={styles.secao}>
          <Text style={styles.label}>
            <Text style={styles.asterisco}>* </Text>
            Preço (R$)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 12,90"
            value={preco}
            onChangeText={setPreco}
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Seção Descrição */}
        <View style={styles.secao}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Observações, alérgenos, etc."
            value={descricao}
            onChangeText={setDescricao}
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Linha divisória */}
        <View style={styles.divisor} />

        {/* Seção Produto Ativo */}
        <View style={styles.secao}>
          <View style={styles.switchContainer}>
            <Text style={styles.subtitulo}>Produto ativo</Text>
            <Switch
              value={produtoAtivo}
              onValueChange={setProdutoAtivo}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={produtoAtivo ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.botaoSalvarTexto}>Salvar produto</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  backText: {
    color: "#2B6CB0",
    fontSize: 16,
  },
  secao: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  asterisco: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  divisor: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  botaoSalvar: {
    backgroundColor: '#5B7E5F',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoSalvarTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default NewProductScreen;