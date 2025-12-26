import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const NewReservationScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  const [documento, setDocumento] = useState('');
  const [hospedes, setHospedes] = useState('2');
  const [telefone, setTelefone] = useState('');

  const handleSalvar = () => {
    console.log('Reserva salva');
  };

  const handleCancelar = () => {
    console.log('Reserva cancelada');
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        
        <Text style={styles.titulo}>Nova reserva</Text>

        <TouchableOpacity style={styles.botaoVoltar} onPress={handleVoltar}>
          <Text style={styles.botaoVoltarTexto}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.secao}>
          <Text style={styles.label}>
            <Text style={styles.asterisco}>* </Text>
            Hóspede
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Documento</Text>
          <TextInput
            style={styles.input}
            placeholder="CPF/RG"
            value={documento}
            onChangeText={setDocumento}
            placeholderTextColor="#999"
          />
          
          <Text style={styles.label}>Hóspedes</Text>
          <TextInput
            style={styles.input}
            value={hospedes}
            onChangeText={setHospedes}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(xx) xxxxx-xxxx"
            value={telefone}
            onChangeText={setTelefone}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.divisor} />

        <View style={styles.secao}>
          <View style={styles.linha}>
            <View style={styles.coluna}>
              <Text style={styles.label}>
                <Text style={styles.asterisco}>* </Text>
                Entrada
              </Text>
              <TextInput
                style={styles.input}
                placeholder="dd/mm/aaaa"
                value={entrada}
                onChangeText={setEntrada}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.coluna}>
              <Text style={styles.label}>
                <Text style={styles.asterisco}>* </Text>
                Saída
              </Text>
              <TextInput
                style={styles.input}
                placeholder="dd/mm/aaaa"
                value={saida}
                onChangeText={setSaida}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>
            <Text style={styles.asterisco}>* </Text>
            Quartos disponíveis
          </Text>
          <Text style={styles.textoInfo}>
            Informe as datas para listar a disponibilidade.
          </Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.botoesAcao}>
          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.botaoSalvarTexto}>Salvar reserva</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  secao: {
    marginBottom: 24,
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
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  coluna: {
    flex: 1,
    marginRight: 8,
  },
  botaoSecundario: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  botaoSecundarioTexto: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  textoInfo: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  divisor: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  botaoVoltar: {
    padding: 16,
    marginBottom: 16,
  },
  botaoVoltarTexto: {
    fontSize: 16,
    color: '#5F7F5F',
    fontWeight: '600',
  },
  botoesAcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  botaoCancelar: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  botaoCancelarTexto: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  botaoSalvar: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#5F7F5F',
    borderRadius: 10,
    marginLeft: 8,
  },
  botaoSalvarTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
});

export default NewReservationScreen;