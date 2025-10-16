import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

type FavoriteItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome5.glyphMap;
  color: string;
};

const data: FavoriteItem[] = [
  { id: "1", icon: "settings", color: "#F5C242" },
  { id: "2", icon: "cut", color: "#E74C3C" },
  { id: "3", icon: "settings-sharp", color: "#00ACC1" },
  { id: "4", icon: "car-sport", color: "#7986CB" },
  { id: "5", icon: "bar-chart", color: "#6D4C41" },
  { id: "6", icon: "flame", color: "#E57373" },
  { id: "7", icon: "bulb", color: "#80CBC4" },
  { id: "8", icon: "chatbubble-ellipses", color: "#9E9E9E" },
  { id: "9", icon: "logo-wordpress", color: "#FDD835" },
  { id: "10", icon: "car-sport", color: "#EF5350" },
  { id: "11", icon: "school", color: "#0288D1" },
  { id: "12", icon: "flash", color: "#90A4AE" },
  { id: "13", icon: "car-sport", color: "#8D6E63" },
  { id: "14", icon: "bar-chart", color: "#EF5350" },
  { id: "15", icon: "construct", color: "#80CBC4" },
  { id: "16", icon: "bulb", color: "#9E9E9E" },
  { id: "17", icon: "chatbubble-ellipses", color: "#FBC02D" },
  { id: "18", icon: "logo-wordpress", color: "#E74C3C" },
  { id: "19", icon: "car-sport", color: "#00ACC1" },
  { id: "20", icon: "school", color: "#7986CB" },
  { id: "21", icon: "flash", color: "#6D4C41" },
  { id: "22", icon: "settings", color: "#FDD835" },
  { id: "23", icon: "cut", color: "#E74C3C" },
  { id: "24", icon: "settings-sharp", color: "#00ACC1" },
];

export default function FavoritesPage(): JSX.Element {
  const numColumns = 3;
  const cardSize = (Dimensions.get("window").width - 60) / numColumns; // responsivo

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={28} color="black" />
        <TextInput style={styles.search} placeholder="PESQUISA" />
        <Ionicons name="menu" size={28} color="black" />
      </View>

      <Text style={styles.sectionTitle}>FAVORITO</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color, width: cardSize, height: cardSize }]}>
            <MaterialIcons
              name="bookmark"
              size={18}
              color="white"
              style={styles.bookmark}
            />
            <Ionicons name={item.icon as any} size={32} color="black" />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80, alignItems: "center" }}
      />
      <View style={styles.footer}>
        <Ionicons name="home" size={28} color="black" />
        <Ionicons name="arrow-forward" size={28} color="black" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdf9",
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
    margin: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bookmark: {
    position: "absolute",
    top: 6,
    left: 6,
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
