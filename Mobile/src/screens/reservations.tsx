import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../api";
import { ReservationResponseDTO } from "../api/dto";
import ReservationCard from "../components/ReservationCard";
import { useLoading } from "../context/loadingContext";

export default function ReservationsScreen() {
  const navigation = useNavigation();
  const { withLoading, isLoading } = useLoading();
  const [search, setSearch] = useState("");
  const [reservationsData, setReservationsData] = useState<ReservationResponseDTO[]>([]);


  async function fetchReservations() {
    await withLoading(async () => {
      const data = await api.reservations.getAllReservations();
      setReservationsData(data);
    });
  }

  useEffect(() => {
    fetchReservations();
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>

      {/* Top bar */}
      <View style={styles.row}>
        <TextInput
          placeholder="Buscar por hóspede ou quarto"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <TouchableOpacity style={styles.updateBtn} onPress={fetchReservations}>
          <Text style={styles.updateText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.newBtn} onPress={() => navigation.navigate("NewReservation" as never)}>
          <Text style={styles.newText}>+ Nova reserva</Text>
        </TouchableOpacity> */}
      </View>

      {/* List */}
      <FlatList
        data={reservationsData}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => {
          if(search) {
            const guestName = item.hospedeNome?.toLowerCase() || "";
            const roomNumber = item.quarto?.toString() || "";
            const searchLower = search.toLowerCase();

            if (!guestName.includes(searchLower) && !roomNumber.includes(searchLower)) {
              return null;
            }
          }

          return <ReservationCard data={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F5EF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
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
  filterBox: {
    marginLeft: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
    color: "#fff",
    fontWeight: "bold",
  },
});