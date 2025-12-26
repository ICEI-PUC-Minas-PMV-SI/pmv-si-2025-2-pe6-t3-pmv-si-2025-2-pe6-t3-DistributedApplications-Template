import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { createMMKV } from 'react-native-mmkv';
import Toast from "react-native-toast-message";
import api from "../api/index";

// ===== TIPOS =====
type IconType = React.ComponentType<{ size?: number; color?: string }>;

interface CustomLinkProps {
  title: string;
  subtitle: string;
  Icon: IconType;
  onPress: () => void;
}

interface Usuario {
  nome: string;
}

// Paleta
const COLORS = {
  bgBege: "#F5F1E8",
  oliva: "#3D5B3D",
  olivaClaro: "#5F7F5F",
  marrom: "#6E4F3A",
  borda: "#E8E1D6",
  texto: "#2B2B2B",
  card: "#FFFFFF",
};

// CARD COMPONENT
function CustomLink({ title, subtitle, Icon, onPress }: CustomLinkProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconBox}>
        <Icon size={24} color={COLORS.marrom} />
      </View>

      <View style={styles.cardTextArea}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      <Entypo name="chevron-right" size={20} color="#999" />
    </Pressable>
  );
}

export default function Home() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storage = createMMKV();

    const isLogged = api.auth.isLoggedIn(storage);
    if(!isLogged) {
      console.log("Usuário não está logado.");
      navigation.navigate("Login" as never);
      return;
    }

    setUsuario(api.getUserInfo() ? { nome: api.getUserInfo()!.user.unique_name } : null);
  }, []);

  const handleLogout = () => {
    const storage = createMMKV();

    setUsuario(null);
    api.auth.logout(storage);
    navigation.navigate("Login" as never);
    
    Toast.show({
      type: "success",
      text1: "Logout realizado",
      text2: "Você saiu do sistema com sucesso.",
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* HEADER */}
        <View style={styles.hero}>
          <View style={styles.heroRow}>

            <View style={styles.logoBox}>
              <MaterialIcons name="hotel" size={40} color="white" />
            </View>

            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>Sistema de Gestão — Hotel Fazenda</Text>
              <Text style={styles.heroSubtitle}>
                Bem-vindo(a), {usuario?.nome}
              </Text>
            </View>

            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Sair</Text>
            </Pressable>
          </View>
        </View>

        {/* Intro */}
        <Text style={styles.intro}>Escolha uma opção para começar:</Text>

        {/* GRID */}
        <View style={styles.grid}>
          <CustomLink
            title="Quartos"
            subtitle="Acomodar hóspedes e visualizar status"
            Icon={(props) => <FontAwesome5 name="bed" {...props} />}
            onPress={() => navigation.navigate("Rooms" as never)}
          />

          <CustomLink
            title="Reservas"
            subtitle="Criar, consultar e confirmar hospedagens"
            Icon={(props) => <Entypo name="calendar" {...props} />}
            onPress={() => navigation.navigate("Reservations" as never)}
          />

          <CustomLink
            title="Cadastrar usuário"
            subtitle="Criar acesso para a equipe"
            Icon={(props) => <Entypo name="add-user" {...props} />}
            onPress={() => navigation.navigate("NewUser" as never)}
          />

          <CustomLink
            title="Produtos"
            subtitle="Gerenciar cardápio e itens do restaurante"
            Icon={(props) => <MaterialIcons name="inventory" {...props} />}
            onPress={() => navigation.navigate("Products" as never)}
          />

          <CustomLink
            title="Pedidos"
            subtitle="Registrar consumos e entregas"
            Icon={(props) => <MaterialIcons name="receipt" {...props} />}
            onPress={() => navigation.navigate("Pedidos" as never)}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Hotel Fazenda
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgBege,
  },

  content: {
    padding: 20,
  },

  /* HEADER */
  hero: {
    backgroundColor: COLORS.oliva,
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },

  heroRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoBox: {
    width: 70,
    height: 70,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginRight: 15,
  },

  heroText: {
    flex: 1,
  },

  heroTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    marginTop: 4,
  },

  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  logoutText: {
    color: "white",
    fontSize: 14,
  },

  /* INTRO */
  intro: {
    color: COLORS.texto,
    fontSize: 18,
    marginBottom: 15,
  },

  /* GRID */
  grid: {
    gap: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borda,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.bgBege,
    borderWidth: 1,
    borderColor: COLORS.borda,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTextArea: {
    marginLeft: 14,
    flex: 1,
  },

  cardTitle: {
    fontWeight: "bold",
    color: COLORS.marrom,
    fontSize: 16,
  },

  cardSubtitle: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },

  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: COLORS.borda,
    borderStyle: "dashed",
  },

  footerText: {
    color: "#777",
    fontSize: 12,
  },
});
