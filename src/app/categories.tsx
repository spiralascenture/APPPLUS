import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Input from "@/components/input";
import Layout from "@/components/layout";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";
import { useCategoryStore } from "@/stores/useCategoryStore";

const renderIcon = (slug: string, color: string) => {
  switch (slug) {
    case "saude-fisica-e-mental":
      return <FontAwesome name="heartbeat" size={40} color={color} />;
    case "educacao":
      return <FontAwesome name="mortar-board" size={40} color={color} />;
    case "economia-domestica-e-cuidados":
      return <MaterialIcons name="settings-suggest" size={40} color={color} />;
    case "servicos-eletricos":
      return <FontAwesome6 name="bolt-lightning" size={40} color={color} />;
    case "restaurantes":
      return <MaterialIcons name="restaurant" size={40} color={color} />;
    case "desenvolvimento":
      return <FontAwesome5 name="laptop-code" size={40} color={color} />;
    default:
      return <FontAwesome name="question" size={40} color={color} />;
  }
};

export default function Categories() {
  const { categories, fetchCategories, loading } = useCategoryStore();

  const handleSelectCategory = (slug: string) => {
    router.push({
      pathname: "/listage",
      params: { category: slug },
    });
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <Input
          icon={<AntDesign name="search1" size={20} color="#333" />}
          placeholder="Produto/Serviço"
          backgroundColor="#f5f5f5"
          style={styles.search}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.historyList}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <View key={index} style={styles.historyItem}></View>
            ))}
        </ScrollView>

        
        <ScrollView
          contentContainerStyle={styles.categoriesContainer}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#1000e2" />
          ) : (
            categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, { borderColor: cat.color }]}
                onPress={() => handleSelectCategory(cat.slug)}
              >
                {renderIcon(cat.slug, cat.color)}
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  historyList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  historyItem: {
    width: 140,
    height: 120,
    backgroundColor: "#ddd",
    borderRadius: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryCard: {
    width: "30%",
    height: 110,
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  categoryText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
  },
  search: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
