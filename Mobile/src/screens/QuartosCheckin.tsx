import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
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
  ALERTA_ERRO_BG: "#fde2e1",
  ALERTA_ERRO_TEXTO: "#b21f1f",
};

const RADIUS = 16;
const RADIUS_SM = 10;

interface RoomResponseDTO {
  id: number;
  numero: string;
  capacidade: number;
  status: string;
}

interface CheckinRequestDTO {
  quartoId: number;
  nomeHospede: string;
  documento: string | null;
  adultos: number;
  criancas: number;
  dataEntrada: string | null;
  dataSaidaPrevista: string | null;
}

type QuartoState = RoomResponseDTO | null;

type QuartosCheckinRouteProp = RouteProp<
  { Checkin: { quartoId: string | number } },
  'Checkin'
>;

function nowForInput(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toIsoUtc(inputValue: string | undefined): string | null {
  if (!inputValue) return null;
  const d = new Date(inputValue);
  if (isNaN(+d)) return null;
  return d.toISOString();
}

export default function QuartosCheckin() {
  const route = useRoute<QuartosCheckinRouteProp>();
  const { quartoId } = route.params;

  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const { withLoading } = useLoading();

  const [quarto, setQuarto] = useState<QuartoState>(null);
  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [adultos, setAdultos] = useState("2");
  const [criancas, setCriancas] = useState("0");
  const [entrada, setEntrada] = useState(nowForInput());
  const [saidaPrevista, setSaidaPrevista] = useState("");
  const [tarifaDiaria, setTarifaDiaria] = useState("");
  const [obs, setObs] = useState("");

  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const isMobile = width < 600;

  const totalHospedes = useMemo(
    () => Number(adultos || 0) + Number(criancas || 0),
    [adultos, criancas]
  );

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setCarregando(true);
      setErro("");
      try {
        const id = Number(quartoId);
        if (!Number.isFinite(id) || id <= 0) {
          throw new Error("Identificador de quarto inválido.");
        }

        const q = await api.rooms.getById(id);
        if (!cancelado) setQuarto(q);
      } catch (e) {
        if (!cancelado) {
          setQuarto(null);
          setErro("Quarto não encontrado.");
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Não foi possível carregar os dados do quarto.",
          });
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }
    carregar();

    return () => { cancelado = true; };
  }, [quartoId]);

  function validar(): boolean {
    if (!quarto) {
      Toast.show({ type: "error", text1: "Quarto não encontrado." });
      return false;
    }
    if (quarto.status === "Manutencao") {
      Toast.show({ type: "error", text1: "Quarto em manutenção." });
      return false;
    }
    if (!nome.trim()) {
      Toast.show({ type: "error", text1: "Informe o nome do hóspede." });
      return false;
    }
    if (!entrada) {
      Toast.show({ type: "error", text1: "Informe a data/hora de entrada." });
      return false;
    }
    if (!saidaPrevista) {
      Toast.show({ type: "error", text1: "Informe a data/hora de saída prevista." });
      return false;
    }

    const dE = new Date(entrada);
    const dS = new Date(saidaPrevista);
    if (isNaN(+dE) || isNaN(+dS)) {
      Toast.show({ type: "error", text1: "Datas inválidas." });
      return false;
    }
    if (dS <= dE) {
      Toast.show({ type: "error", text1: "A saída prevista deve ser após a entrada." });
      return false;
    }

    if (totalHospedes < 1) {
      Toast.show({ type: "error", text1: "Inclua pelo menos 1 hóspede." });
      return false;
    }

    const capacidade = Number(quarto.capacidade ?? 0);
    if (capacidade > 0 && totalHospedes > capacidade) {
      Toast.show({ 
        type: "error", 
        text1: "Capacidade excedida", 
        text2: `Máximo ${capacidade} hóspede(s) para este quarto.` 
      });
      return false;
    }
    return true;
  }

  async function aoSalvar() {
    setErro("");

    if (!validar()) return;

    const checkinRequestData: CheckinRequestDTO = {
      quartoId: Number(quartoId),
      nomeHospede: nome.trim(),
      documento: documento.trim() || null,
      adultos: Number(adultos || 0),
      criancas: Number(criancas || 0),
      dataEntrada: toIsoUtc(entrada) || null,
      dataSaidaPrevista: toIsoUtc(saidaPrevista) || null,
    };

    try {
      setSalvando(true);
      
      await withLoading(async () => {
        await api.rooms.checkInGuest(checkinRequestData);
      });

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Check-in realizado com sucesso!",
      });

      navigation.navigate("Quartos", { toast: "Check-in realizado com sucesso!" });

    } catch (err) {
      const detail =
        (err as any)?.response?.data?.mensagem ||
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        "Não foi possível concluir o check-in.";
      
      setErro(detail);
      
      Toast.show({
        type: "error",
        text1: "Erro ao Salvar",
        text2: detail,
      });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={isMobile ? stylesMobile.container : styles.container}>
      <View style={isMobile ? stylesMobile.card : styles.card}>
        <View style={styles.header}>
          <Text style={isMobile ? stylesMobile.title : styles.title}>
            Check-in — Quarto {quarto?.numero ?? quartoId}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>← Voltar</Text>
          </TouchableOpacity>
        </View>

        {erro && <Text style={[styles.alert, styles.alertError]}>{erro}</Text>}

        {carregando ? (
          <ActivityIndicator size="large" color={COLORS.OLIVA_CLARO} style={styles.loading} />
        ) : !quarto ? (
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.buttonGhost]}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.roomInfo}>
              Capacidade: <Text style={{ fontWeight: "bold" }}>{quarto.capacidade ?? 2}</Text> • Status:{" "}
              <Text style={{ fontWeight: "bold" }}>{quarto.status === "Manutencao" ? "Manutenção" : quarto.status ?? "Livre"}</Text>
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>Nome do hóspede *</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Ex.: Maria Souza"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Documento</Text>
              <TextInput
                style={styles.input}
                value={documento}
                onChangeText={setDocumento}
                placeholder="RG/CPF/Passaporte"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={isMobile ? styles.row : styles.grid2}>
              <View style={styles.rowInner}>
                <Text style={styles.label}>Adultos</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={adultos}
                  onChangeText={setAdultos}
                  placeholderTextColor="#aaa"
                />
              </View>
              <View style={styles.rowInner}>
                <Text style={styles.label}>Crianças</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={criancas}
                  onChangeText={setCriancas}
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={isMobile ? styles.row : styles.grid2}>
              <View style={styles.rowInner}>
                <Text style={styles.label}>Entrada *</Text>
                <TextInput
                  style={styles.input}
                  value={entrada}
                  onChangeText={setEntrada}
                  placeholder="YYYY-MM-DDTHH:mm"
                  placeholderTextColor="#aaa"
                />
              </View>
              <View style={styles.rowInner}>
                <Text style={styles.label}>Saída prevista *</Text>
                <TextInput
                  style={styles.input}
                  value={saidaPrevista}
                  onChangeText={setSaidaPrevista}
                  placeholder="YYYY-MM-DDTHH:mm"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Tarifa diária (R$)</Text>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={tarifaDiaria}
                onChangeText={setTarifaDiaria}
                placeholder="Ex.: 350.00"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Observações</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                value={obs}
                onChangeText={setObs}
                placeholder="Preferências, restrições, etc."
                placeholderTextColor="#aaa"
                multiline={true}
                numberOfLines={4}
              />
            </View>

            <View style={isMobile ? stylesMobile.actions : styles.actions}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[isMobile ? stylesMobile.button : styles.button, styles.buttonGhost]}
                disabled={salvando}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={aoSalvar}
                style={[isMobile ? stylesMobile.button : styles.button, styles.buttonPrimary]}
                disabled={salvando || carregando || quarto?.status === "Manutencao"}
              >
                {salvando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={[styles.buttonText, styles.buttonPrimaryText]}>
                    Confirmar check-in
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_BEGE,
    padding: 16,
  },
  form: {
    gap: 14,
  },
  card: {
    backgroundColor: COLORS.CARD,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.BORDA,
    padding: 26,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 12,
    marginVertical: 12,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 880,
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
    flexShrink: 1,
  },
  link: {
    color: COLORS.OLIVA_CLARO,
    fontSize: 14,
    fontWeight: "600",
  },
  row: {
    gap: 6,
  },
  rowInner: {
    flex: 1,
    gap: 6,
  },
  grid2: {
    flexDirection: "row",
    gap: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDA,
    borderRadius: RADIUS_SM,
    padding: 10,
    fontSize: 15,
    backgroundColor: COLORS.CARD,
    color: COLORS.TEXTO,
  },
  textarea: {
    minHeight: 84,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  roomInfo: {
    fontSize: 14,
    marginBottom: 4,
    padding: 10,
    backgroundColor: COLORS.CARD,
    color: "#444",
    borderRadius: RADIUS_SM,
    borderWidth: 1,
    borderColor: COLORS.BORDA,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDA,
    paddingTop: 12,
    zIndex: 5,
    backgroundColor: COLORS.CARD,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS_SM,
    borderWidth: 1,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.TEXTO,
  },
  buttonPrimary: {
    backgroundColor: COLORS.OLIVA_CLARO,
    borderColor: COLORS.OLIVA_CLARO,
  },
  buttonPrimaryText: {
    color: "#fff",
  },
  buttonGhost: {
    backgroundColor: COLORS.CARD,
    borderColor: COLORS.BORDA,
  },
  alert: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: "700",
    textAlign: "center",
    borderWidth: 1,
  },
  alertError: {
    backgroundColor: COLORS.ALERTA_ERRO_BG,
    color: COLORS.ALERTA_ERRO_TEXTO,
    borderColor: "#f5c2c0",
  },
  loading: {
    marginVertical: 20,
  },
});

const stylesMobile = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_BEGE,
    padding: 0,
  },
  card: {
    backgroundColor: COLORS.CARD,
    borderRadius: 0,
    borderWidth: 0,
    padding: 16,
    shadowOpacity: 0,
    elevation: 0,
    marginVertical: 0,
    width: '100%',
    maxWidth: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.MARROM,
    flexShrink: 1,
  },
  actions: {
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDA,
    paddingTop: 12,
    backgroundColor: COLORS.CARD,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: RADIUS_SM,
    borderWidth: 1,
    minWidth: '100%',
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    flexDirection: 'row',
    gap: 8,
  }
});