import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import api from '../api';
import {
    OrderCreateRequestDTO,
    ProductResponseDTO,
    ReservationResponseDTO
} from "../api/dto";
import { useLoading } from '../context/loadingContext';

// Interface para gerenciar o estado local dos itens do pedido
interface OrderItemState {
    id: number;
    produtoId: string;
    quantidade: string;
    nomeProduto: string;
}
interface DropdownItem {
    label: string;
    value: string;
}


const NewOrderScreen = () => {
    const navigation = useNavigation();
    const { withLoading } = useLoading();
    
    // ESTADOS
    const [activeReservations, setActiveReservations] = useState<ReservationResponseDTO[]>([]);
    const [reservationDropdownItems, setReservationDropdownItems] = useState<DropdownItem[]>([]);

    const [availableProducts, setAvailableProducts] = useState<ProductResponseDTO[]>([]);
    const [productDropdownItems, setProductDropdownItems] = useState<DropdownItem[]>([]);
    
    const [reservationId, setReservationId] = useState('');
    const [customerName, setCustomerName] = useState(''); 
    const [orderItems, setOrderItems] = useState<OrderItemState[]>([{ id: Date.now(), produtoId: '', quantidade: '1', nomeProduto: '' }]);
    
    
    // 🎯 NOVO CÁLCULO: Função para calcular o total do pedido
    const calculateOrderTotal = (): number => {
        let total = 0;
        
        orderItems.forEach(item => {
            const productId = parseInt(item.produtoId);
            const quantity = parseInt(item.quantidade) || 0; 

            // Procura o preço do produto na lista completa
            const product = availableProducts.find(p => p.id === productId);
            
            if (product && quantity > 0) {
                total += product.preco * quantity;
            }
        });
        
        return total;
    };
    
    // Chama a função de cálculo
    const totalValue = calculateOrderTotal();

    
    // Mapeamento de Dropdown (mantido)
    const mapProductsToDropdownItems = (products: ProductResponseDTO[]): DropdownItem[] => {
        return products.map(p => ({
            label: `${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')}) | Estoque: ${p.estoque}`,
            value: String(p.id),
        }));
    };
    
    const mapReservationsToDropdownItems = (reservations: ReservationResponseDTO[]): DropdownItem[] => {
        const active = reservations.filter(r => r.status === 'Ativa' || r.status === 'Ocupado');
        
        return active.map(r => ({
            label: `ID ${r.id}: ${r.hospedeNome} (${r.quarto})`,
            value: String(r.id),
        }));
    };


    // EFEITO: Carrega PRODUTOS E RESERVAS ao montar a tela (mantido)
    useEffect(() => {
        withLoading(async () => {
            try {
                const products = await api.products.getAllProducts(); 
                setAvailableProducts(products);
                setProductDropdownItems(mapProductsToDropdownItems(products));
                
                const reservations = await api.reservations.getAllReservations(); 
                
                setActiveReservations(reservations);
                setReservationDropdownItems(mapReservationsToDropdownItems(reservations));
                
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                Toast.show({ 
                    type: 'error', 
                    text1: 'Erro de Carregamento', 
                    text2: 'Não foi possível buscar produtos ou reservas ativas.' 
                });
            }
        });
    }, []);


    // Atualiza o estado da reserva e o nome do hóspede (mantido)
    const handleReservationSelect = (value: string) => {
        setReservationId(value);
        
        const id = parseInt(value);
        const selectedReservation = activeReservations.find(r => r.id === id);
        
        if (selectedReservation) {
            setCustomerName(selectedReservation.hospedeNome);
        } else {
            setCustomerName('');
        }
    };


    // Funções de gerenciamento de itens (mantidas)
    const handleAddItem = () => {
        setOrderItems([...orderItems, { id: Date.now(), produtoId: '', quantidade: '1', nomeProduto: '' }]);
    };

    const handleRemoveItem = (id: number) => {
        if (orderItems.length > 1) {
            setOrderItems(orderItems.filter(item => item.id !== id));
        }
    };

    // Atualiza item (com validação para garantir que o nome do produto e o total sejam atualizados)
    const handleItemChange = (id: number, field: 'produtoId' | 'quantidade', value: string) => {
        setOrderItems(orderItems.map(item => {
            if (item.id === id) {
                let updatedItem = { ...item, [field]: value };
                
                if (field === 'produtoId') {
                    const productIdNumber = parseInt(value);
                    const product = availableProducts.find(p => p.id === productIdNumber);
                    updatedItem.nomeProduto = product ? `${product.nome} (R$ ${product.preco.toFixed(2).replace('.', ',')})` : '';
                }
                return updatedItem;
            }
            return item;
        }));
    };


    const handleCreateOrder = () => {
        // ... (Lógica de criação do pedido mantida)
        withLoading(async () => {
            
            const invalidItems = orderItems.some(i => !i.produtoId || parseInt(i.quantidade) <= 0);
            
            if (!reservationId || orderItems.length === 0 || invalidItems) {
                Toast.show({ type: 'error', text1: 'Erro', text2: 'Selecione uma Reserva e adicione ao menos um item válido.' });
                return;
            }

            const payload: OrderCreateRequestDTO = {
                reservationId: parseInt(reservationId),
                customerName: customerName,
                items: orderItems.map(item => ({
                    produtoId: parseInt(item.produtoId),
                    quantidade: parseInt(item.quantidade),
                })).filter(item => !isNaN(item.produtoId) && item.quantidade > 0), 
            };

            console.log("PAYLOAD ENVIADO:", payload);
            try {
                await api.orders.createOrder(payload);
                
                Toast.show({ type: 'success', text1: 'Pedido salvo com sucesso!' });
                navigation.goBack();
            } catch (error) {
                console.error('Erro ao criar pedido:', error);
                Toast.show({ type: 'error', text1: 'Erro ao criar pedido', text2: 'Verifique os dados enviados (HTTP 400).' });
            }
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.scrollView}>
                
                {/* ... (Título e botões de navegação mantidos) */}
                <Text style={styles.titulo}>➕ Novo Pedido</Text>

                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backText}>← Voltar</Text>
                    </TouchableOpacity>
                </View>

                {/* Detalhes do Pedido (Reserva e Cliente) */}
                <Text style={styles.subtitulo}>Detalhes do Pedido</Text>
                
                <View style={styles.secao}>
                    <Text style={styles.label}><Text style={styles.asterisco}>* </Text>Reserva Ativa</Text>
                    <View style={styles.inputContainer}>
                        <RNPickerSelect
                            placeholder={{ 
                                label: 'Selecione uma reserva ativa...', 
                                value: null, 
                                color: '#999' 
                            }}
                            items={reservationDropdownItems}
                            onValueChange={handleReservationSelect}
                            value={reservationId || null}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                </View>

                <View style={styles.secao}>
                    <Text style={styles.label}>Nome do Cliente (Automático)</Text>
                    <TextInput
                        style={[styles.input, styles.readOnlyInput]}
                        value={customerName}
                        editable={false}
                    />
                </View>
                
                {/* Itens do Pedido */}
                <Text style={[styles.subtitulo, { marginTop: 15 }]}>Itens de Consumo ({productDropdownItems.length} produtos)</Text>

                {/* LOOP DINÂMICO DE ITENS (mantido) */}
                {orderItems.map((item, index) => (
                    <View key={item.id} style={styles.itemContainer}>
                        
                        <Text style={styles.itemLabel}>
                            Item {index + 1}: {item.nomeProduto || 'Selecione o Produto'}
                        </Text>
                        
                        <View style={styles.itemRow}>
                            
                            <View style={[styles.inputContainer, { flex: 3, marginRight: 8 }]}>
                                <RNPickerSelect
                                    placeholder={{ 
                                        label: 'Selecione o produto...', 
                                        value: null, 
                                        color: '#999' 
                                    }}
                                    items={productDropdownItems}
                                    onValueChange={(value) => handleItemChange(item.id, 'produtoId', value)}
                                    value={item.produtoId || null}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>

                            <TextInput
                                placeholder="Qtde"
                                value={item.quantidade}
                                onChangeText={(text) => handleItemChange(item.id, 'quantidade', text)}
                                style={[styles.input, styles.itemInput, { flex: 1, marginRight: 8 }]}
                                keyboardType="numeric"
                                placeholderTextColor="#999"
                            />
                            
                            <TouchableOpacity 
                                onPress={() => handleRemoveItem(item.id)} 
                                style={[styles.removeBtn, orderItems.length === 1 && styles.disabledBtn]}
                                disabled={orderItems.length === 1}
                            >
                                <Text style={styles.removeText}>-</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                ))}
                
                <TouchableOpacity onPress={handleAddItem} style={styles.addItemBtn}>
                    <Text style={styles.addItemText}>+ Adicionar Item</Text>
                </TouchableOpacity>

                {/* 🎯 NOVO BLOCO: Exibição do Valor Total */}
                <View style={styles.totalBox}>
                    <Text style={styles.totalLabel}>Valor Total do Pedido (Prévia):</Text>
                    <Text style={styles.totalValue}>
                        R$ {totalValue.toFixed(2).replace('.', ',')}
                    </Text>
                </View>


            </ScrollView>

            <TouchableOpacity 
                style={[styles.botaoSalvar, (!reservationId || orderItems.some(i => !i.produtoId)) && styles.disabledSaveBtn]} 
                onPress={handleCreateOrder} 
                disabled={!reservationId || orderItems.some(i => !i.produtoId)}
            >
                <Text style={styles.botaoSalvarTexto}>Criar Pedido</Text>
            </TouchableOpacity>

        </View>
    );
};

// ... (Estilos RNPickerSelect mantidos)

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
    placeholder: {
        color: '#999',
    },
    viewContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    }
});


// ... (Estilos do Componente)

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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    backText: {
        color: "#2B6CB0",
        fontSize: 16,
    },
    secao: {
        marginBottom: 15,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
        color: '#555',
    },
    asterisco: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    readOnlyInput: {
        backgroundColor: '#eee',
        color: '#555',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        backgroundColor: '#fff',
        paddingHorizontal: Platform.OS === 'ios' ? 0 : 0,
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    itemLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000'
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemInput: {
        padding: 10,
        marginRight: 8,
        marginBottom: 0,
        height: 45
    },
    removeBtn: {
        backgroundColor: '#dc3545',
        width: 40,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 20,
    },
    disabledBtn: {
        backgroundColor: '#ccc',
    },
    addItemBtn: {
        backgroundColor: '#e6f0ff',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#007AFF'
    },
    addItemText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    // 🎯 NOVOS ESTILOS PARA O TOTAL
    totalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#28a745',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745', // Cor verde para valor
    },
    // FIM NOVOS ESTILOS
    botaoSalvar: {
        backgroundColor: '#5F7F5F',
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    disabledSaveBtn: {
        backgroundColor: '#a5d6a7',
    },
    botaoSalvarTexto: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
});

export default NewOrderScreen;