import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../api';
// 1. DTO ATUALIZADO: Agora usa OrderResponseDTO
import { OrderResponseDTO } from '../api/dto';
import { useLoading } from '../context/loadingContext';

  const OrdersScreen = () => { 
  const navigation = useNavigation();   
  const { withLoading, isLoading } = useLoading();
  const [search, setSearch] = React.useState("");
  // 2. ESTADO ATUALIZADO: Armazena pedidos
  const [ordersData, setOrdersData] = React.useState<OrderResponseDTO[]>([]); 

  // 3. FUNÇÃO DE BUSCA ATUALIZADA: Chama a API de Pedidos
  async function fetchOrders() {
    withLoading(async () => {
      // Chama o método getAllOrders da classe Orders (api.orders)
      const data = await api.orders.getAllOrders(); 
      setOrdersData(data);
    });
  }

  useEffect(() => {
    // Chama a nova função de busca
    fetchOrders(); 
  }, []);

  // Tratamento de Carregamento (mantido)
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#5B7E5F" />
        <Text style={{ marginTop: 10, color: '#666' }}>Carregando pedidos...</Text>
      </View>
    );
  }

  // 3. FILTRAGEM ATUALIZADA: Busca por customerName
  const filteredOrders = ordersData.filter(order => 
    order.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🛒 Pedidos</Text>

      {/* Top bar */}
      <View style={styles.row}>
        <TextInput
          placeholder="Buscar por nome do cliente" // Placeholder atualizado
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <TouchableOpacity style={styles.updateBtn} onPress={fetchOrders}>
          <Text style={styles.updateText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        {/* Mudei para NewOrder - assume-se que essa rota existe */}
        <TouchableOpacity style={styles.newBtn} onPress={() => navigation.navigate("NewOrders" as never)}> 
          <Text style={styles.newText}>+ Novo Pedido</Text>
        </TouchableOpacity>
      </View>

      {/* Cabeçalho da tabela - Colunas atualizadas para Pedidos */}
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, styles.nameColumn]}>Cliente</Text>
        <Text style={[styles.columnHeader, styles.statusColumn]}>Status</Text>
        <Text style={[styles.columnHeader, styles.totalColumn]}>Total</Text>
      </View>

      {/* Lista de Pedidos */}
      <ScrollView style={styles.productsList}>
        {filteredOrders.map((order) => (
          <View 
            key={order.id} 
            style={styles.productRow}
            // Adiciona a navegação para os detalhes do pedido ao clicar
            onPress={() => navigation.navigate("OrderDetails" as never, { orderId: order.id })}
          > 
            {/* 4. RENDERIZAÇÃO ATUALIZADA: Campos do DTO de Pedido */}
            <Text style={[styles.productCell, styles.nameColumn]}>{order.customerName}</Text>
            <Text style={[styles.productCell, styles.statusColumn]}>{order.status}</Text>
            <Text style={[styles.productCell, styles.totalColumn]}>
              R$ {order.total?.toFixed(2).replace('.', ',') || '0,00'}
            </Text>
          </View>
        ))}
        
        {/* 3. Tratamento de Lista Vazia */}
        {filteredOrders.length === 0 && !isLoading && (
          <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
        )}

      </ScrollView>
    </View>
  );
};

// ... (Resto do Stylesheet, mas com ajustes para as novas colunas)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    backgroundColor: "#5F7F5F",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  updateText: {
    color: "#fff",
    fontWeight: "bold"
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
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2, 
    borderBottomColor: '#333',
    paddingBottom: 8,
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 5
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333'
  },
  productsList: {
    flex: 1,
  },
  productRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 5
  },
  productCell: {
    fontSize: 14,
  },
  // NOVOS ESTILOS PARA COLUNAS DE PEDIDOS
  nameColumn: { // Cliente
    flex: 2,
  },
  statusColumn: { // Status
    flex: 1,
    textAlign: 'center',
  },
  totalColumn: { // Total
    flex: 1,
    textAlign: 'right', // Alinha o valor monetário à direita
  },
  emptyText: {
    textAlign: 'center', 
    marginTop: 30, 
    color: '#888', 
    fontSize: 16 
  }
});

export default OrdersScreen;