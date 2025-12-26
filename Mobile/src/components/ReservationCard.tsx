import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ReservationResponseDTO } from "../api/dto";

export default function ReservationCard({ data }: { data: ReservationResponseDTO }) {
  return (
    <View style={styles.card}>
      <Text style={styles.room}>Quarto {data.quarto} — {data.hospedeNome}</Text>

      <Text style={styles.info}>
        Entrada {new Date(data.dataEntrada).toLocaleDateString()} · Saída {new Date(data.dataSaida).toLocaleDateString()} · {1} hóspede(s)
      </Text>

      <View style={styles.statusRow}>
        <TouchableOpacity style={[styles.statusBadge, 
          data.status === "Ativa" ? styles.active : styles.closed
        ]}>
          <Text style={styles.statusText}>{data.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  room: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  statusRow: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  active: {
    backgroundColor: "#5F7F5F",
  },
  closed: {
    backgroundColor: "#5F7F5F",
  },
  statusText: {
    color: "#ffffffff",
    fontWeight: "600",
  },
});