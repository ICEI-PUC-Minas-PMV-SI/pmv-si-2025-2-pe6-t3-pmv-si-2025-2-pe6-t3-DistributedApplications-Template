import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import api from "../api";
import { useLoading } from "../context/loadingContext";

const COLORS = {
    BG_BEGE: "#F5F1E8",
    OLIVA: "#3D5B3D",
    OLIVA_CLARO: "#5F7F5F",
    MARROM: "#6E4F3A",
    CARD: "#FFFFFF",
    BORDA: "#E8E1D6",
    TEXTO: "#2B2B2B",
    CINZA_CLARO: "#F9F9F9",
    VERMELHO_ERRO: "#b21f1f",
};

interface CheckoutItemDTO {
    id: number;
    produto: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
}

interface CheckoutDataDTO {
    reservaId: number;
    quarto?: {
        numero: string;
        tipo: string;
        capacidade: number;
    };
    hospede?: {
        nome: string;
        documento: string;
        telefone: string;
    };
    datas?: {
        dataEntrada: string;
        dataSaidaPrevista: string;
        dataSaidaReal: string | null;
    };
    valores?: {
        tarifaDiaria: number;
        noites: number;
        totalDiarias: number;
        totalPedidos: number;
        totalGeral: number;
    };
    itens?: CheckoutItemDTO[];
}

type CheckoutRouteProp = RouteProp<{ Checkout: { quartoId: number } }, 'Checkout'>;

function fmtBRL(n: number | undefined) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(n || 0));
}

function fmtData(iso: string | null | undefined) {
    if (!iso) return "-";
    try {
        const d = new Date(iso);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    } catch {
        return iso;
    }
}

function normalizarDados(data: any, infoQuarto?: any): CheckoutDataDTO {
    if (!data) return data;

    const numeroQuarto = infoQuarto?.numero || data.Quarto?.Numero || String(infoQuarto?.id || "");
    const capacidadeQuarto = infoQuarto?.capacidade || data.Quarto?.Capacidade || 0;

    let todosOsItens: any[] = [];
    const listaPedidos = data.detalhesDosPedidos || data.DetalhesDosPedidos;

    if (Array.isArray(listaPedidos)) {
        listaPedidos.forEach((pedido: any) => {
            const itensDoPedido = pedido.items || pedido.Items || [];
            if (Array.isArray(itensDoPedido)) {
                todosOsItens = [...todosOsItens, ...itensDoPedido];
            }
        });
    } else if (Array.isArray(data.itens) || Array.isArray(data.Itens)) {
        todosOsItens = data.itens || data.Itens;
    }

    return {
        reservaId: data.reservationId || data.ReservationId,
        quarto: {
            numero: numeroQuarto || "Verificar",
            tipo: "Padrão", 
            capacidade: capacidadeQuarto
        },
        hospede: {
            nome: data.customerName || data.CustomerName || data.Hospede?.Nome || "Hóspede",
            documento: data.Hospede?.Documento || "",
            telefone: data.Hospede?.Telefone || ""
        },
        datas: {
            dataEntrada: data.Datas?.DataEntrada || "", 
            dataSaidaPrevista: data.Datas?.DataSaidaPrevista || "",
            dataSaidaReal: data.Datas?.DataSaidaReal || null
        },
        valores: {
            tarifaDiaria: data.Valores?.TarifaDiaria || 0,
            noites: data.Valores?.Noites || 0,
            totalDiarias: data.totalHospedagem || data.TotalHospedagem || 0,
            totalPedidos: data.totalConsumoRestaurante || data.TotalConsumoRestaurante || 0,
            totalGeral: data.valorFinalDaConta || data.ValorFinalDaConta || 0
        },
        itens: todosOsItens.map((i: any) => ({
            id: i.produtoId || i.ProdutoId || i.Id || 0,
            produto: i.nomeProduto || i.NomeProduto || i.Produto || "Item sem nome",
            quantidade: i.quantidade || i.Quantidade || 0,
            precoUnitario: i.precoUnitario || i.PrecoUnitario || 0,
            subtotal: i.subtotal || i.Subtotal || 0
        }))
    };
}

export default function CheckoutScreen() {
    const route = useRoute<CheckoutRouteProp>();
    const navigation = useNavigation<any>();
    const { withLoading } = useLoading();
    const { quartoId } = route.params;

    const [dados, setDados] = useState<CheckoutDataDTO | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [pagamento, setPagamento] = useState("");
    const [observacao, setObservacao] = useState("");
    const [erro, setErro] = useState("");

    const opcoesPagamento = [
        { label: "Dinheiro", value: "dinheiro" },
        { label: "Crédito", value: "credito" },
        { label: "Débito", value: "debito" },
        { label: "PIX", value: "pix" },
        { label: "Boleto", value: "boleto" },
    ];

    useEffect(() => {
        let active = true;
        async function carregar() {
            try {
                setCarregando(true);
                setErro("");

                const reservaAtiva = await api.reservations.getActiveByRoomId(quartoId);
                
                if (!reservaAtiva || !reservaAtiva.id) {
                    throw new Error("Não há reserva ativa neste quarto.");
                }

                const [checkoutResponse, quartoResponse] = await Promise.all([
                    api.reservations.getCheckout(reservaAtiva.id),
                    api.rooms.getById(quartoId).catch(() => null)
                ]);

                if (active) {
                    if (!checkoutResponse) throw new Error("Dados de checkout vazios.");
                    
                    const dadosFinais = normalizarDados(checkoutResponse, quartoResponse);
                    setDados(dadosFinais);
                }
            } catch (err: any) {
                if (active) {
                    const msg = err?.response?.data?.message || err?.message || "Erro ao carregar conta.";
                    setErro(msg);
                    Toast.show({ type: "error", text1: "Erro", text2: msg });
                }
            } finally {
                if (active) setCarregando(false);
            }
        }
        carregar();
        return () => { active = false; };
    }, [quartoId]);

    async function executarEncerramento() {
        if (!dados?.reservaId) return;
        
        try {
            console.log("Iniciando checkout da reserva:", dados.reservaId);
            await withLoading(async () => {
                await api.reservations.checkout(dados.reservaId, {
                    formaPagamento: pagamento,
                    observacao: observacao.trim(),
                });
            });

            Toast.show({ type: "success", text1: "Sucesso", text2: "Conta encerrada com sucesso!" });
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }], 
            });
        } catch (err: any) {
            console.error("Erro ao encerrar:", err);
            
            const errorString = String(err);
            if (errorString.includes("JSON") || errorString.includes("SyntaxError")) {
                 Toast.show({ type: "success", text1: "Sucesso", text2: "Conta encerrada com sucesso!" });
                 navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }], 
                });
                return;
            }

            const msg = err?.response?.data?.message || "Falha ao encerrar a conta.";
            Toast.show({ type: "error", text1: "Erro", text2: msg });
        }
    }

    async function aoEncerrar() {
        if (!dados?.reservaId) return;
        if (!pagamento) {
            Toast.show({ type: "error", text1: "Pagamento", text2: "Selecione a forma de pagamento." });
            return;
        }

        const msgConfirmacao = `Deseja encerrar a conta no valor de ${fmtBRL(dados.valores?.totalGeral)}?`;

        if (Platform.OS === 'web') {
            if (window.confirm(msgConfirmacao)) {
                await executarEncerramento();
            }
        } else {
            Alert.alert(
                "Confirmar Encerramento",
                msgConfirmacao,
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Confirmar", onPress: executarEncerramento }
                ]
            );
        }
    }

    if (carregando) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={COLORS.OLIVA} />
                <Text style={{ marginTop: 10, color: COLORS.MARROM }}>Carregando conta...</Text>
            </View>
        );
    }

    if (!dados && !carregando) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>{erro || "Não foi possível carregar os dados."}</Text>
                <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnGhostText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Encerramento de Conta</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.link}>← Voltar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumo da Hospedagem</Text>
                    <View style={styles.rowInfo}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Quarto</Text>
                            <Text style={styles.value}>
                                {dados?.quarto?.numero ?? "-"} - {dados?.quarto?.tipo ?? "Padrão"}
                            </Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Hóspede</Text>
                            <Text style={styles.value}>{dados?.hospede?.nome ?? "—"}</Text>
                        </View>
                    </View>
                    
                    <View style={[styles.rowInfo, { marginTop: 10 }]}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Entrada</Text>
                            <Text style={styles.value}>
                                {dados?.datas?.dataEntrada ? fmtData(dados.datas.dataEntrada) : "-"}
                            </Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Saída Prevista</Text>
                            <Text style={styles.value}>
                                {dados?.datas?.dataSaidaPrevista ? fmtData(dados.datas.dataSaidaPrevista) : "-"}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Consumo e Pedidos</Text>
                    {dados?.itens && dados.itens.length > 0 ? (
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.th, { flex: 2 }]}>Item</Text>
                                <Text style={[styles.th, { flex: 0.5, textAlign: 'center' }]}>Qtd</Text>
                                <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Total</Text>
                            </View>
                            {dados.itens.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.td, { flex: 2 }]}>{item.produto}</Text>
                                    <Text style={[styles.td, { flex: 0.5, textAlign: 'center' }]}>{item.quantidade}</Text>
                                    <Text style={[styles.td, { flex: 1, textAlign: 'right' }]}>{fmtBRL(item.subtotal)}</Text>
                                </View>
                            ))}
                            <View style={styles.tableFooter}>
                                <Text style={styles.footerLabel}>Total Pedidos</Text>
                                <Text style={styles.footerValue}>{fmtBRL(dados?.valores?.totalPedidos)}</Text>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.emptyText}>Nenhum item consumido.</Text>
                    )}
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Totais</Text>
                    <View style={styles.resumeRow}>
                        <Text style={styles.resumeLabel}>Total Diárias ({dados?.valores?.noites ?? 0} noites)</Text>
                        <Text style={styles.resumeValue}>{fmtBRL(dados?.valores?.totalDiarias)}</Text>
                    </View>
                    <View style={styles.resumeRow}>
                        <Text style={styles.resumeLabel}>Total Consumo</Text>
                        <Text style={styles.resumeValue}>{fmtBRL(dados?.valores?.totalPedidos)}</Text>
                    </View>
                    <View style={[styles.resumeRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Geral</Text>
                        <Text style={styles.totalValue}>{fmtBRL(dados?.valores?.totalGeral)}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pagamento</Text>
                    <Text style={styles.label}>Forma de Pagamento *</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.paymentContainer}>
                        {opcoesPagamento.map((op) => (
                            <TouchableOpacity
                                key={op.value}
                                style={[styles.paymentChip, pagamento === op.value && styles.paymentChipSelected]}
                                onPress={() => setPagamento(op.value)}
                            >
                                <Text style={[styles.paymentText, pagamento === op.value && styles.paymentTextSelected]}>
                                    {op.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text style={[styles.label, { marginTop: 16 }]}>Observações</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        numberOfLines={3}
                        placeholder="Observações finais..."
                        value={observacao}
                        onChangeText={setObservacao}
                    />
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnGhostText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnPrimary} onPress={aoEncerrar}>
                        <Text style={styles.btnPrimaryText}>Encerrar Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_BEGE,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 50,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.MARROM,
    },
    link: {
        color: COLORS.OLIVA_CLARO,
        fontWeight: "600",
    },
    card: {
        backgroundColor: COLORS.CARD,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.OLIVA,
        marginBottom: 12,
    },
    rowInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    col: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: "#666",
        fontWeight: "600",
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        color: COLORS.TEXTO,
        fontWeight: "500",
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.BORDA,
        marginVertical: 16,
    },
    table: {
        backgroundColor: COLORS.CINZA_CLARO,
        borderRadius: 8,
        padding: 10,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
        paddingBottom: 6,
        marginBottom: 6,
    },
    th: {
        fontSize: 12,
        fontWeight: "700",
        color: "#555",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 4,
    },
    td: {
        fontSize: 13,
        color: "#333",
    },
    tableFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#DDD",
        paddingTop: 8,
    },
    footerLabel: {
        fontSize: 13,
        fontWeight: "700",
    },
    footerValue: {
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.TEXTO,
    },
    emptyText: {
        fontStyle: "italic",
        color: "#888",
        fontSize: 13,
    },
    resumeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    resumeLabel: {
        fontSize: 14,
        color: "#555",
    },
    resumeValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.BORDA,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.MARROM,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.OLIVA,
    },
    paymentContainer: {
        flexDirection: "row",
        paddingVertical: 8,
        gap: 8,
    },
    paymentChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.BORDA,
        backgroundColor: "#FFF",
    },
    paymentChipSelected: {
        backgroundColor: COLORS.OLIVA,
        borderColor: COLORS.OLIVA,
    },
    paymentText: {
        fontSize: 13,
        color: "#555",
        fontWeight: "600",
    },
    paymentTextSelected: {
        color: "#FFF",
    },
    textArea: {
        borderWidth: 1,
        borderColor: COLORS.BORDA,
        borderRadius: 8,
        padding: 10,
        height: 80,
        textAlignVertical: "top",
        backgroundColor: "#FFF",
        marginTop: 6,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
        gap: 12,
    },
    btnGhost: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.BORDA,
    },
    btnGhostText: {
        color: COLORS.TEXTO,
        fontWeight: "600",
    },
    btnPrimary: {
        backgroundColor: COLORS.OLIVA_CLARO,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    btnPrimaryText: {
        color: "#FFF",
        fontWeight: "700",
    },
    errorText: {
        color: COLORS.VERMELHO_ERRO,
        marginBottom: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});