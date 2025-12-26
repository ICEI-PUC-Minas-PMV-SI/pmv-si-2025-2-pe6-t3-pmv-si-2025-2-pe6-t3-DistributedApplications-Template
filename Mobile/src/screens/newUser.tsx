import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import api from "../api";
import { UserCreateRequestDTO } from "../api/dto";
import { useLoading } from "../context/loadingContext";

export default function NewUserScreen() {
  const navigation = useNavigation();
  const {withLoading, isLoading} = useLoading();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [perfil, setPerfil] = useState("Gerente");

  async function handleSave() {
    await withLoading(async () => {
      try {
        if(!nome || !email || !senha || !confirmarSenha) {
          Toast.show({
            type: 'error',
            text1: 'Por favor, preencha todos os campos!'
          });
          return;
        }

        if (senha !== confirmarSenha) {
          Toast.show({
            type: 'error',
            text1: 'As senhas não coincidem!'
          });

          return;
        }

        if(senha.length < 6 || confirmarSenha.length < 6) {
          Toast.show({
            type: 'error',
            text1: 'A senha deve ter pelo menos 6 caracteres!'
          });

          return;
        }

        const newUser: UserCreateRequestDTO = {
          name: nome,
          email,
          password: senha,
          role: perfil
        };

        await api.auth.createUser(newUser);
  
        Toast.show({
          type: 'success',
          text1: 'Usuário criado com sucesso!'
        });
        navigation.goBack();
      }
      catch (error) {
        console.error("Erro ao criar usuário:", error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar usuário. Verifique os dados e tente novamente.'
        });
      }
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 40, alignItems: "center" }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        {/* Título */}
        <View style={styles.header}>
          <Text style={styles.title}>👤 Novo Usuário</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="email@exemplo.com"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite a senha"
          />

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Repita a senha"
          />

          <Text style={styles.label}>Perfil</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={perfil}
              onValueChange={(v: any) => setPerfil(v)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Administrador" value="Admin" />
              <Picker.Item label="Gerente" value="Gerente" />
              <Picker.Item label="Recepcionista" value="Recepcao" />
              <Picker.Item label="Garcom" value="Garcom" />
              <Picker.Item label="Hospede" value="Hospede" />
            </Picker>
          </View>

          {/* Botão salvar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5EF",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3A19",
  },
  backText: {
    color: "#2B6CB0",
    fontSize: 16,
  },
  form: {
    marginTop: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    // overflow: "hidden",
  },
  picker: {
    height: 60,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4A6A47",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});