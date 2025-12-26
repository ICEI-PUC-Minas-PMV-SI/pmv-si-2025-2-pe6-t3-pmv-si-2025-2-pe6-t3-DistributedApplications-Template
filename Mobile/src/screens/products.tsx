import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../api';
import { ProductResponseDTO } from '../api/dto';
import { useLoading } from '../context/loadingContext';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const {withLoading, isLoading} = useLoading();
  const [search, setSearch] = React.useState("");
  const [productsData, setProductsData] = React.useState<ProductResponseDTO[]>([]);

  async function fetchProducts() {
    withLoading(async () => {
      await api.products.getAllProducts().then(data => {
        setProductsData(data);
      });
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
        <Text style={styles.title}>Produtos</Text>

          {/* Top bar */}
          <View style={styles.row}>
            <TextInput
              placeholder="Buscar por produto"
              value={search}
              onChangeText={setSearch}
              style={styles.search}
            />
    
            <TouchableOpacity style={styles.updateBtn} onPress={fetchProducts}>
              <Text style={styles.updateText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
    

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.newBtn} onPress={() => navigation.navigate("NewProduct" as never)}>
            <Text style={styles.newText}>+ Novo Produto</Text>
          </TouchableOpacity>
        </View>
    

      {/* Cabeçalho da tabela */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, styles.nameColumn]}>Nome</Text>
        <Text style={[styles.columnHeader, styles.priceColumn]}>Preço</Text>
      </View>

      {/* Lista de produtos */}
      <ScrollView style={styles.productsList}>
        {productsData.filter(product => product.nome.toLowerCase().includes(search.toLowerCase())).map((product) => (
          <View key={product.id} style={styles.productRow}>
            <Text style={[styles.productCell, styles.nameColumn]}>{product.nome}</Text>
            <Text style={[styles.productCell, styles.priceColumn]}>R$ {product.preco}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  buttonSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsList: {
    flex: 1,
  },
  productRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  productCell: {
    fontSize: 16,
  },
  nameColumn: {
    flex: 2,
  },
  priceColumn: {
    flex: 1,
    textAlign: 'center',
  },
  categoryColumn: {
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  search: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
  },
  updateBtn: {
    marginLeft: 10,
    backgroundColor: "#5B7E5F",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  updateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 4,
  },
  backText: {
    fontSize: 16,
    color: "#3478F6",
  },
  newBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#5B7E5F",
    borderRadius: 10,
  },
  newText: {
    color: "#ffffffff",
    fontWeight: "bold",
  },
});

export default ProductsScreen;