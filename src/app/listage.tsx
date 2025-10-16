import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Input from "@/components/input";
import { AntDesign } from "@expo/vector-icons";
import Card from "@/components/card";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useOfferingStore } from "@/stores/useOfferingStore";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Listage() {
  const { category } = useLocalSearchParams();
  const { offerings, loading, fetchOfferingsByCategory } = useOfferingStore();

  console.log(offerings);

  useEffect(() => {
    if (category && typeof category === "string") {
      fetchOfferingsByCategory(category);
    }
  }, [category]);

  return (
    <LinearGradient
      colors={["#F1EFE4", "#F1EFE4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.containerView}
    >
      <Header />

      <View style={styles.container}>
        <View style={styles.flexRowContainer}>
          <TouchableOpacity
            onPress={() => router.navigate("/categories")}
            style={{ padding: 5 }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text>Você está buscando por: {category}</Text>
        </View>

        <Input
          icon={<AntDesign name="search1" size={22} color="#000" />}
          placeholder="Buscar"
          backgroundColor="transparent"
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#1000e2"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={offerings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.highlightItem}
                onPress={() => router.push(`/offering-profile?id=${item.id}`)}
              >
                <View style={styles.highlightImageItem}>
                  <Text>Imagem</Text>
                  {/* Substitua depois por <Image ... /> */}
                </View>
                <View style={styles.highlightTextItem}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontWeight: "400",
                      fontSize: 16,
                      marginTop: 8,
                    }}
                  >
                    {item.description || "Sem descrição"}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View style={{ marginTop: 40 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#333",
                    textAlign: "center",
                    margin: 20,
                  }}
                >
                  Não há produtos ou serviços por enquanto. Volte para as
                  categorias.
                </Text>
              </View>
            )}
            contentContainerStyle={{
              paddingBottom: 40,
              flexGrow: 1,
              paddingTop: 40,
            }}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Footer />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 14,
    paddingBottom: 22,
    alignItems: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  flexRowContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  footer: { marginTop: "auto" },

  highlightsList: {
    gap: 20,
  },
  highlightItem: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 150,
    overflow: "hidden", // impede que conteúdos escapem do card
    marginBottom: 20,
  },
  highlightTextItem: {
    width: "70%",
    padding: 16,
    justifyContent: "center",
  },
  highlightImageItem: {
    width: "30%",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});
