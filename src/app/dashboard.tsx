import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/input";

export default function Dashboard() {
  // Histórico mockado
  const historyData = [
    { id: "1", title: "Profissão", subtitle: "Nome completo" },
    { id: "2", title: "Profissão", subtitle: "Nome completo" },
    { id: "3", title: "Profissão", subtitle: "Nome completo" },
    { id: "4", title: "Profissão", subtitle: "Nome completo" },
  ];

  // Destaques mockados
  const highlightsData = [
    {
      id: "1",
      title: "Profissão",
      price: "R$ 200,00",
      type: "por sessão",
      color: "#90CAF9",
    },
    {
      id: "2",
      title: "Profissão",
      price: "R$ 150,00",
      type: "por hora",
      color: "#FFD54F",
    },
    {
      id: "3",
      title: "Profissão",
      price: "R$ 400,00",
      type: "por site",
      color: "#EF9A9A",
    },
    {
      id: "4",
      title: "Profissão",
      price: "R$ 200,00",
      type: "por sessão",
      color: "#4DD0E1",
    },
  ];

  return (
    <LinearGradient
      colors={["#F1EFE4", "#F1EFE4"]}
      style={styles.containerView}
    >
      <Header />

      {/* Campo de busca */}
      <View style={{ marginTop: 20 }}>
        <Input
          icon={<AntDesign name="search1" size={22} color="#000" />}
          placeholder="Buscar"
          backgroundColor="transparent"
        />
      </View>

      {/* Mural */}
      <View style={styles.mural}></View>

      {/* Histórico */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Histórico</Text>
        <TouchableOpacity onPress={() => router.navigate("/categories")}>
          <Text style={styles.seeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {historyData.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <FontAwesome name="user" size={24} color="#333" />
            <Text style={styles.historyText}>{item.title}</Text>
            <Text style={styles.historySub}>{item.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Destaques */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Destaques</Text>
        <TouchableOpacity onPress={() => router.navigate("/categories")}>
          <Text style={styles.seeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={highlightsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.highlightItem, { backgroundColor: item.color }]}
            onPress={() => router.push(`/offering-profile?id=${item.id}`)}
          >
            <FontAwesome
              name="star"
              size={24}
              color="#000"
              style={{ marginRight: 12 }}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 13, marginTop: 2, color: "#000" }}>
                {item.type}
              </Text>
            </View>
            <Text style={{ marginLeft: "auto", fontWeight: "bold", fontSize: 14, color: "#000" }}>
              {item.price}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Footer */}
      <Footer />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    padding: 20,
  },
  mural: {
    width: "100%",
    height: 160,
    backgroundColor: "#8D6E63",
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  seeMore: {
    fontSize: 13,
    color: "#5c00ba",
    fontWeight: "bold",
  },
  historyItem: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  historyText: {
    marginTop: 6,
    fontWeight: "bold",
    fontSize: 13,
  },
  historySub: {
    fontSize: 11,
    color: "#555",
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
});
