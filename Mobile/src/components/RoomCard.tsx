import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RoomResponseWithGuestDTO } from "../api/dto";

export default function RoomCard({ room }: { room: RoomResponseWithGuestDTO }) {
  const free = room.status === "Livre";
  const navigation = useNavigation<any>();

  const handleAcomodar = () => {
    navigation.navigate("CheckinRoom", {
      quartoId: room.id,
    });
  };

  const handleEncerrar = () => {
    navigation.navigate("Checkout", {
      quartoId: room.id,
    });
  };

  return (
    <View style={[styles.card, !free && styles.cardOccupied]}>
      <View style={styles.header}>
        <Text style={styles.roomName}>Quarto {room.numero}</Text>

        <View style={[styles.status, free ? styles.free : styles.occupied]}>
          <Text style={styles.statusText}>{room.status}</Text>
        </View>
      </View>

      <Text style={styles.capacity}>Padrão • {room.capacidade} hóspedes</Text>

      {room.hospede && !free && (   
        <View style={{ marginTop: 10 }}>
          <Text style={styles.guest}>👤 {room.hospede.nome} Checkout</Text>
          <Text style={styles.date}>📅 Entrada: {room.hospede.dataEntrada}</Text>
        </View>
      )}

<View style={styles.actions}>
    {free ? (
        <TouchableOpacity style={styles.button} onPress={handleAcomodar}>
            <Text style={styles.buttonText}>Acomodar</Text>
        </TouchableOpacity>
    ) : (
        <>
            <TouchableOpacity style={styles.disabledBtn} disabled>
                <Text style={styles.disabledText}>Indisponível</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.endButton} onPress={handleEncerrar}>
                <Text style={styles.endButtonText}>Encerrar</Text>
            </TouchableOpacity>
        </>
    )}
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardOccupied: {
    borderLeftColor: "#C74E4E",
    borderLeftWidth: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roomName: {
    fontSize: 20,
    fontWeight: "600",
  },
  capacity: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  free: {
    backgroundColor: "#CFF5D0",
  },
  occupied: {
    backgroundColor: "#F5C8C9",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  guest: {
    fontSize: 14,
    color: "#444",
  },
  date: {
    fontSize: 13,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#517A53",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  disabledBtn: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginRight: 10,
  },
  disabledText: {
    color: "#999",
  },
  endButton: {
    backgroundColor: "#E6D8C0",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  endButtonText: {
    color: "#333",
    fontWeight: "600",
  },
});