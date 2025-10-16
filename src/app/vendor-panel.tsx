import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Layout from "@/components/layout";
import { useAuthStore } from "@/stores/useAuthStore";
import { Offering } from "@/interfaces";

export default function VendorPanel() {
  const { user } = useAuthStore();
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    fetchOfferings();
  }, [user?.id]);

  const fetchOfferings = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", String(user?.id));

      const response = await fetch(
        "https://api-pridecare.com/api-appplus/get_offerings_by_user.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await response.json();
      if (response.ok) {
        setOfferings(json.data);
      } else {
        console.warn(json.message);
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Painel de vendedor</Text>
          <TouchableOpacity
            onPress={() => router.navigate("/create-offering-form")}
          >
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          {loading ? (
            <ActivityIndicator size="large" color="#5c00ba" />
          ) : (
            <View style={styles.highlightsList}>
              {offerings.map((item) => (
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
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },
  addButton: {
    fontSize: 32,
    fontWeight: "700",
    padding: 10,
    color: "#5c00ba",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
  },
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
