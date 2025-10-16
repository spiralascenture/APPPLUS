import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ListRenderItem,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

type CardItem = {
  id: string;
  title: string;
  price: string;
  type: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap; // garante que o ícone seja válido
};

const data: CardItem[] = [
  {
    id: "1",
    title: "PROFISSÃO",
    price: "R$ 200,00",
    type: "POR SESSÃO",
    color: "#4A90E2",
    icon: "chatbubble-ellipses",
  },
  {
    id: "2",
    title: "PROFISSÃO",
    price: "R$ 150,00",
    type: "POR HORA",
    color: "#F5C242",
    icon: "bar-chart",
  },
  {
    id: "3",
    title: "PROFISSÃO",
    price: "R$ 400,00",
    type: "POR SITE",
    color: "#E74C3C",
    icon: "logo-wordpress",
  },
  {
    id: "4",
    title: "PROFISSÃO",
    price: "R$ 200,00",
    type: "POR SESSÃO",
    color: "#8D6E63",
    icon: "chatbubble-ellipses",
  },
  {
    id: "5",
    title: "PROFISSÃO",
    price: "R$ 150,00",
    type: "POR HORA",
    color: "#F5C242",
    icon: "bar-chart",
  },
  {
    id: "6",
    title: "PROFISSÃO",
    price: "R$ 400,00",
    type: "POR SITE",
    color: "#E74C3C",
    icon: "logo-wordpress",
  },
];

export default function Emphasis(): JSX.Element {
  const renderItem: ListRenderItem<CardItem> = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
      <View style={styles.cardContent}>
        <Ionicons name={item.icon} size={26} color="white" />
        <View style={styles.textContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>NOME COMPLETO</Text>
        </View>
      </View>
      <View style={styles.priceContent}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={28} color="black" />
        <TextInput style={styles.search} placeholder="PESQUISA" />
        <Ionicons name="menu" size={28} color="black" />
      </View>
      <Text style={styles.sectionTitle}>DESTAQUES</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.footer}>
        <AntDesign name="home" size={28} color="black" />
        <AntDesign name="arrowright" size={28} color="black" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  search: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 12,
    padding: 15,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContent: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#f0f0f0",
  },
  priceContent: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  type: {
    fontSize: 12,
    color: "#f0f0f0",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});
